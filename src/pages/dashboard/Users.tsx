import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { UserCard } from '../../components/dashboard/UserCard';
import { Button } from '../../components/ui/Button';
import { Search, Loader2, X, Shield, ArrowRight } from 'lucide-react';
import { getUsers } from '../../services/userService';
import { getLicenses } from '../../services/licenseService';
import { createRequest } from '../../services/requestService';
import { useAuthStore } from '../../store/authStore';
import { toast } from '../../components/ui/Toast';
import type { User } from '../../types/auth.types';
import type { License } from '../../types/license';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedLicenseId, setSelectedLicenseId] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const { user: currentUser } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersData, licensesData] = await Promise.all([
          getUsers(),
          getLicenses()
        ]);
        // Filter out current user from the list
        setUsers(usersData.filter(u => u.id !== currentUser?.id));
        setLicenses(licensesData);
      } catch (err) {
        console.error('Failed to fetch users or licenses', err);
        toast.error('Initialization protocol failed.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const handleInviteClick = (user: User) => {
    setSelectedUser(user);
    if (licenses.length > 0) {
      setSelectedLicenseId(licenses[0].id);
    }
  };

  const handleSendInvitation = async () => {
    if (!selectedUser || !selectedLicenseId || !currentUser) return;

    setSubmitting(true);
    try {
      const license = licenses.find(l => l.id === selectedLicenseId);
      await createRequest({
        senderId: currentUser.id,
        receiverId: selectedUser.id,
        licenseId: selectedLicenseId,
        assetId: license?.assets[0]?.id || 'unknown',
        requesterName: `${currentUser.first_name} ${currentUser.last_name}`.trim() || currentUser.username,
        requesterEmail: currentUser.email,
        receiverName: `${selectedUser.first_name} ${selectedUser.last_name}`.trim() || selectedUser.username,
        receiverEmail: selectedUser.email,
        message: `Owner ${currentUser.username} is inviting you to license their asset.`,
        type: 'INVITATION',
      });
      toast.success(`Invitation transmitted to ${selectedUser.username}.`);
      setSelectedUser(null);
    } catch (err) {
      console.error('Failed to send invitation', err);
      toast.error('Invitation transmission failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `${u.first_name} ${u.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-white">
      <Sidebar />
      
      <main className="flex-1 flex flex-col relative z-20">
        <DashboardNavbar />
        
        <div className="p-8 lg:p-12 overflow-y-auto max-h-[calc(100vh-88px)]">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <h1 className="text-4xl font-bold font-header tracking-tight text-white mb-2 italic uppercase">
                Browse Users
              </h1>
              <p className="text-[#ffffff40] font-body text-sm">
                Identify and invite potential purchasers to your verified licenses.
              </p>
            </div>

            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ffffff20]" />
              <input 
                type="text" 
                placeholder="Search purchasers by name, email, or handle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#ffffff05] border border-[#ffffff10] rounded-2xl py-3.5 pl-12 pr-6 text-xs font-body text-white placeholder-[#ffffff20] focus:outline-none focus:border-primary/50 transition-all shadow-inner"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-[#ffffff20] font-header tracking-[0.3em] text-[10px] uppercase italic">Indexing Global Registry...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <UserCard key={user.id} user={user} onInvite={handleInviteClick} />
                ))
              ) : (
                <div className="col-span-full py-32 text-center">
                  <p className="text-[#ffffff20] font-header tracking-[0.2em] italic uppercase">No users matching your criteria</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Invitation Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/60 animate-in fade-in duration-300">
          <div className="bg-[#11111B] border border-white/10 w-full max-w-xl rounded-[40px] p-10 relative shadow-3xl">
            <button 
              onClick={() => setSelectedUser(null)}
              className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white/40" />
            </button>

            <div className="mb-8">
              <div className="inline-flex items-center gap-3 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black text-primary tracking-widest uppercase italic">Secure Invitation</span>
              </div>
              <h2 className="text-3xl font-bold font-header text-white mb-2 italic uppercase">
                Invite {selectedUser.username}
              </h2>
              <p className="text-[#ffffff40] font-body text-sm leading-relaxed">
                Select one of your verified licenses to invite this user. They will receive a notification to view and accept your terms.
              </p>
            </div>

            <div className="space-y-6 mb-10">
              <div className="space-y-3">
                <label className="text-[10px] font-header font-bold uppercase tracking-widest text-[#ffffff20] ml-1">Select License</label>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {licenses.map((license) => (
                    <div 
                      key={license.id}
                      onClick={() => setSelectedLicenseId(license.id)}
                      className={`
                        p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between group
                        ${selectedLicenseId === license.id 
                          ? 'bg-primary/20 border-primary/50 shadow-[0_0_20px_rgba(111,38,255,0.1)]' 
                          : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'}
                      `}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-header font-bold text-white italic">{license.title}</span>
                        <span className="text-[10px] font-body text-primary uppercase font-bold tracking-widest">{license.type.replace('_', ' ')}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedLicenseId === license.id ? 'border-primary bg-primary shadow-[0_0_10px_#6f26ff]' : 'border-white/10'
                      }`}>
                        {selectedLicenseId === license.id && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                variant="outline" 
                fullWidth 
                className="!py-5 !text-[11px] font-black tracking-widest uppercase italic !rounded-2xl"
                onClick={() => setSelectedUser(null)}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                fullWidth 
                className="!py-5 !text-[11px] font-black tracking-widest uppercase italic !rounded-2xl"
                disabled={!selectedLicenseId || submitting}
                onClick={handleSendInvitation}
                rightIcon={submitting ? <Loader2 className="w-4 h-4 animate-spin ml-2" /> : <ArrowRight className="w-4 h-4 ml-2" />}
              >
                {submitting ? 'Transmitting...' : 'Send Invitation'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
