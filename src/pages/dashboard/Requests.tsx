import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { Button } from '../../components/ui/Button';
import { 
  ShieldCheck, 
  ArrowRight,
  Loader2,
  XCircle,
  FileText
} from 'lucide-react';
import { useRequestStore } from '../../store/requestStore';
import { useAuthStore } from '../../store/authStore';
import { getRequests, approveRequest, declineRequest, cancelRequest } from '../../services/requestService';
import { toast } from '../../components/ui/Toast';

type TabType = 'RECEIVED' | 'SENT';

const Requests: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('RECEIVED');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user: currentUser } = useAuthStore();
  
  const { 
    incomingRequests: storeIncoming, 
    outgoingRequests: storeOutgoing, 
    setIncomingRequests,
    setOutgoingRequests,
    updateRequestStatus
  } = useRequestStore();

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await getRequests();
        if (currentUser) {
          // In a real app, the API would filter, but for mock purposes we do it here
          const incoming = data.filter(r => r.receiverId === currentUser.id || r.receiverId === 'curr-user-id');
          const outgoing = data.filter(r => r.senderId === currentUser.id || r.senderId === 'curr-user-id');
          setIncomingRequests(incoming);
          setOutgoingRequests(outgoing);
        }
      } catch (err) {
        console.error('Failed to fetch requests', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [setIncomingRequests, setOutgoingRequests, currentUser]);

  const handleApprove = async (requestId: string) => {
    try {
      await approveRequest(requestId);
      updateRequestStatus(requestId, 'approved');
      toast.success('Request approved successfully.');
      // Optional: webSocketService.send('accept_request', { request_id: requestId });
    } catch (err) {
      toast.error('Failed to approve request.');
    }
  };

  const handleDecline = async (requestId: string) => {
    try {
      await declineRequest(requestId);
      updateRequestStatus(requestId, 'declined');
      toast.success('Request declined.');
    } catch (err) {
      toast.error('Failed to decline request.');
    }
  };

  const handleCancel = async (requestId: string) => {
    try {
      await cancelRequest(requestId);
      updateRequestStatus(requestId, 'cancelled');
      toast.success('Request cancelled.');
    } catch (err) {
      toast.error('Failed to cancel request.');
    }
  };

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    switch (s) {
      case 'approved': return 'text-[#00ff95] bg-[#00ff95]/10 border-[#00ff95]/20';
      case 'pending': return 'text-[#ffb800] bg-[#ffb800]/10 border-[#ffb800]/20';
      case 'declined': return 'text-[#ff4b4b] bg-[#ff4b4b]/10 border-[#ff4b4b]/20';
      case 'cancelled': return 'text-white/40 bg-white/5 border-white/10';
      default: return 'text-white/40 bg-white/5 border-white/10';
    }
  };

  const getTypeLabel = (type: string, isIncoming: boolean) => {
    if (type === 'INVITATION') {
      return isIncoming ? 'Invitation Received' : 'Invitation Sent';
    }
    return isIncoming ? 'Inquiry Received' : 'Inquiry Sent';
  };

  const currentList = activeTab === 'RECEIVED' ? storeIncoming : storeOutgoing;

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-white">
      <Sidebar />
      
      <main className="flex-1 flex flex-col relative z-20">
        <DashboardNavbar />
        
        <div className="p-8 lg:p-12 overflow-y-auto max-h-[calc(100vh-88px)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <h1 className="text-4xl font-bold font-header tracking-tight text-white mb-2 italic uppercase">
                Licensing Requests
              </h1>
              <p className="text-[#ffffff40] font-body text-sm">
                Manage incoming project requests and track your outgoing inquiries and invitations.
              </p>
            </div>

            <div className="flex p-1.5 bg-[#ffffff05] border border-[#ffffff08] rounded-2xl">
              <button
                onClick={() => setActiveTab('RECEIVED')}
                className={`px-8 py-2.5 rounded-xl text-[10px] font-header tracking-widest transition-all duration-300 ${
                  activeTab === 'RECEIVED' 
                    ? 'bg-primary text-white shadow-[0_0_20px_rgba(111,38,255,0.3)]' 
                    : 'text-[#ffffff40] hover:text-white'
                }`}
              >
                INCOMING
              </button>
              <button
                onClick={() => setActiveTab('SENT')}
                className={`px-8 py-2.5 rounded-xl text-[10px] font-header tracking-widest transition-all duration-300 ${
                  activeTab === 'SENT' 
                    ? 'bg-primary text-white shadow-[0_0_20px_rgba(111,38,255,0.3)]' 
                    : 'text-[#ffffff40] hover:text-white'
                }`}
              >
                OUTGOING
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-[#ffffff40] font-header tracking-widest text-xs uppercase italic">Syncing requests...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-6">
                <p className="text-red-400 font-header tracking-widest text-xs uppercase italic text-center">Failed to load protocol data.</p>
                <Button variant="outline" onClick={() => window.location.reload()} clipped={false}>Retry</Button>
              </div>
            ) : currentList.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-white/5 rounded-[32px] bg-white/[0.02]">
                <p className="text-[#ffffff20] font-header tracking-[0.2em] italic uppercase">No {activeTab.toLowerCase()} requests found</p>
              </div>
            ) : (
              currentList.map((req) => (
                <div key={req.id} className="bg-[#161622]/40 border border-[#ffffff05] rounded-[32px] p-8 group hover:bg-[#161622]/60 hover:border-primary/20 transition-all duration-500">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${req.type === 'INVITATION' ? 'bg-primary/20' : 'bg-[#00ff95]/10'}`}>
                            {req.type === 'INVITATION' ? <ShieldCheck className="w-4 h-4 text-primary" /> : <FileText className="w-4 h-4 text-[#00ff95]" />}
                          </div>
                          <div>
                            <span className="text-[10px] font-header font-bold text-primary tracking-widest uppercase italic block mb-0.5">
                              {getTypeLabel(req.type, activeTab === 'RECEIVED')}
                            </span>
                            <h3 className="text-lg font-bold font-header text-white italic">Asset ID: {req.assetId}</h3>
                          </div>
                        </div>
                        <div className={`px-4 py-1.5 rounded-full text-[8px] font-header tracking-widest border ${getStatusColor(req.status)} uppercase`}>
                          {req.status}
                        </div>
                      </div>

                      <div className="flex items-start gap-5 p-6 bg-black/40 border border-[#ffffff05] rounded-2xl relative overflow-hidden group/box">
                        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-primary/5 to-transparent opacity-0 group-hover/box:opacity-100 transition-opacity duration-700"></div>
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeTab === 'RECEIVED' ? req.requesterName : req.receiverName}`} 
                          alt="avatar" 
                          className="w-12 h-12 rounded-xl border border-white/10 relative z-10" 
                        />
                        <div className="flex-1 space-y-3 relative z-10">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[8px] font-header text-[#ffffff20] uppercase tracking-widest">
                              {activeTab === 'RECEIVED' ? 'From' : 'To'}
                            </span>
                            <h4 className="text-sm font-bold font-header text-white tracking-wide">
                              {activeTab === 'RECEIVED' ? req.requesterName : (req.receiverName || 'Unknown Recipient')}
                            </h4>
                            <span className="text-[9px] font-body text-[#ffffff20]">{new Date(req.createdAt || '').toLocaleString()}</span>
                          </div>
                          <p className="text-xs font-body text-[#ffffff60] leading-relaxed italic border-l border-white/5 pl-4">
                            "{req.message}"
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-56 flex flex-row lg:flex-col gap-3 justify-center items-center h-full self-center">
                      {activeTab === 'RECEIVED' && req.status === 'pending' && (
                        <>
                          <Button 
                            variant="secondary" 
                            fullWidth 
                            className="!rounded-2xl !py-4 !text-[10px] !bg-white/5 !border-[#ffffff10] hover:!bg-white/10" 
                            clipped={false}
                            onClick={() => handleDecline(req.id)}
                          >
                            DECLINE
                          </Button>
                          <Button 
                            variant="primary" 
                            fullWidth 
                            className="!rounded-2xl !py-4 !text-[10px]" 
                            clipped={false}
                            onClick={() => handleApprove(req.id)}
                          >
                            APPROVE
                          </Button>
                        </>
                      )}
                      
                      {activeTab === 'SENT' && req.status === 'pending' && (
                        <Button 
                          variant="outline" 
                          fullWidth 
                          className="!rounded-2xl !py-4 !text-[10px] border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50" 
                          clipped={false}
                          leftIcon={<XCircle className="w-4 h-4 mr-2" />}
                          onClick={() => handleCancel(req.id)}
                        >
                          CANCEL REQUEST
                        </Button>
                      )}

                      {req.status === 'approved' && (
                        <Button 
                          variant="primary" 
                          fullWidth 
                          className="!rounded-2xl !py-4 !text-[10px]" 
                          clipped={false}
                          rightIcon={<ArrowRight className="w-4 h-4 ml-2" />}
                        >
                          VIEW CONTRACT
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Requests;
