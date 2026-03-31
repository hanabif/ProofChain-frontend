import React, { useState, useEffect } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import { UserCard } from "../../components/dashboard/UserCard";
import { Button } from "../../components/ui/Button";
import {
  Search,
  Loader2,
  X,
  Shield,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { getUsers, getUserById } from "../../services/userService";
import { getLicenses } from "../../services/licenseService";
import { webSocketService } from "../../services/websocketService";
import { useAuthStore } from "../../store/authStore";
import { useRequestStore } from "../../store/requestStore";
import { useActivityStore } from "../../store/activityStore";
import { toast } from "../../components/ui/Toast";
import type { User } from "../../types/auth.types";
import type { License } from "../../types/license";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [, setLoadingDetails] = useState(false);
  const [selectedLicenseId, setSelectedLicenseId] = useState<string>("");
  const [invitationMessage, setInvitationMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const { user: currentUser } = useAuthStore();
  const { addOutgoingRequest } = useRequestStore();
  const { addActivity } = useActivityStore();

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const licensesData = await getLicenses();
        setLicenses(licensesData);
      } catch (err) {
        console.error("Failed to fetch licenses", err);
      }
    };
    fetchLicenses();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      // If no search query, clear users and stop loading
      if (!searchQuery.trim()) {
        setUsers([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Fetch users using the search query with a limit of 50
        const usersData = await getUsers(searchQuery, 50);
        // Filter out current user from the list if available
        setUsers(
          currentUser
            ? usersData.filter((u) => u.id !== currentUser.id)
            : usersData,
        );
      } catch (err) {
        console.error("Failed to fetch users", err);
        toast.error("Failed to synchronize user registry.");
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [currentUser, searchQuery]);

  const handleCardClick = async (user: User) => {
    setViewingUser(user);
    setLoadingDetails(true);
    try {
      const response = await getUserById(user.id);
      if (response) {
        setViewingUser(response);
      }
    } catch (err) {
      console.error("Failed to fetch user details", err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleInviteClick = (user: User) => {
    setSelectedUser(user);
    setViewingUser(null);
    if (licenses.length > 0) {
      setSelectedLicenseId(licenses[0].id);
    }
    setInvitationMessage(
      `Owner ${currentUser?.username || "User"} is inviting you to license their asset.`,
    );
  };

  const handleSendInvitation = async () => {
    if (!selectedUser || !selectedLicenseId || !currentUser) return;

    setSubmitting(true);
    try {
      const license = licenses.find((l) => l.id === selectedLicenseId);

      console.log("[DEBUG Users] 📡 Transmitting invitation via WebSocket...");

      // Use WebSocket just like LicenseRequestModal.tsx
      const sent = webSocketService.send("create_request", {
        license_id: selectedLicenseId,
        target_user_id: selectedUser.id,
        type: "EXCLUSIVE", // Invitation uses 'EXCLUSIVE' since Invitations and purchase requests are handled similarly
        message: invitationMessage.trim(),
      });

      if (!sent) {
        console.warn(
          "[DEBUG Users] ⚠️ WebSocket send failed. aborting UI update.",
        );
        setSubmitting(false);
        return;
      }

      console.log("[DEBUG Users] 💾 Updating local stores...");
      // Optimistically add to outgoing store (similar to LicenseRequestModal)
      addOutgoingRequest({
        id: "temp-" + Date.now(),
        senderId: currentUser.id,
        receiverId: selectedUser.id,
        assetId: license?.assets[0]?.id || "unknown",
        licenseId: selectedLicenseId,
        requesterName:
          `${currentUser.first_name} ${currentUser.last_name}`.trim() ||
          currentUser.username,
        requesterEmail: currentUser.email || "",
        receiverName:
          selectedUser.full_name ||
          `${selectedUser.first_name} ${selectedUser.last_name}`.trim() ||
          selectedUser.username,
        receiverEmail: selectedUser.email || "",
        message: invitationMessage.trim(),
        type: "EXCLUSIVE",
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      addActivity({
        type: "request_sent",
        title: `License invitation sent: ${license?.title || "Unknown License"}`,
        subtitle: `TARGET: ${selectedUser.username}`,
      });

      toast.success(`Invitation transmitted to ${selectedUser.username}.`);
      setSelectedUser(null);
      setInvitationMessage(""); // Reset message after success
    } catch (err) {
      console.error("Failed to send invitation", err);
      toast.error("Invitation transmission failed.");
    } finally {
      setSubmitting(false);
    }
  };

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
                Identify and invite potential purchasers to your verified
                licenses.
              </p>
            </div>

            {!searchQuery.trim() ? (
              <div className="hidden md:block w-96" /> // Spacer to keep layout consistent
            ) : (
              <div className="relative w-full md:w-96 animate-in fade-in slide-in-from-right-4 duration-500">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ffffff20]" />
                <input
                  type="text"
                  placeholder="Search purchasers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#ffffff05] border border-[#ffffff10] rounded-2xl py-3.5 pl-12 pr-6 text-xs font-body text-white placeholder-[#ffffff20] focus:outline-none focus:border-primary/50 transition-all shadow-inner"
                />
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-[#ffffff20] font-header tracking-[0.3em] text-[10px] uppercase italic">
                Indexing Global Registry...
              </p>
            </div>
          ) : !searchQuery.trim() ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-8 text-center border border-white/5 bg-[#ffffff02] rounded-[40px] border-dashed px-4">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 mb-2 shadow-[0_0_50px_rgba(111,38,255,0.1)]">
                <Search className="w-10 h-10 text-primary" />
              </div>
              <div className="max-w-xl w-full">
                <h3 className="text-2xl font-header font-bold text-white italic uppercase mb-3">
                  Identify a Purchaser
                </h3>
                <p className="text-[#ffffff40] font-body text-sm px-8 mb-10">
                  Enter the username, name, or email of the user you wish to
                  invite to purchase your verified license.
                </p>

                <div className="relative group max-w-md mx-auto">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-blue-500/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                    <input
                      type="text"
                      placeholder="Type name or @username..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full bg-[#0a0a0f] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm font-body text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-all shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {users.length > 0 ? (
                users.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onInvite={handleCardClick}
                  />
                ))
              ) : (
                <div className="col-span-full py-32 flex flex-col items-center justify-center space-y-6 text-center border border-white/5 bg-[#ffffff02] rounded-[40px] border-dashed">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-2">
                    <X className="w-6 h-6 text-[#ffffff20]" />
                  </div>
                  <div className="max-w-xs">
                    <p className="text-[#ffffff40] font-header tracking-[0.2em] italic uppercase text-xs mb-2">
                      No users found
                    </p>
                    <p className="text-[#ffffff20] font-body text-[10px]">
                      Adjust your search query to find the specific purchaser
                      you're looking for.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* User Detail Modal */}
      {viewingUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/60 animate-in fade-in duration-300">
          <div className="bg-[#11111B] border border-white/10 w-full max-w-xl rounded-[40px] p-10 relative shadow-3xl overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

            <button
              onClick={() => setViewingUser(null)}
              className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors z-10"
            >
              <X className="w-5 h-5 text-white/40" />
            </button>

            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shadow-2xl overflow-hidden p-1">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${viewingUser.username}`}
                    alt={viewingUser.username}
                    className="w-full h-full object-cover rounded-[28px]"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#00ff95]/10 border border-[#00ff95]/20 px-3 py-1 rounded-full mb-3">
                    <CheckCircle2 className="w-3 h-3 text-[#00ff95]" />
                    <span className="text-[8px] font-black text-[#00ff95] tracking-widest uppercase">
                      Verified Identity
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold font-header text-white italic uppercase">
                    {viewingUser.first_name} {viewingUser.last_name}
                  </h2>
                  <p className="text-primary font-mono text-xs">
                    @{viewingUser.username}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                  <p className="text-[10px] font-header text-white/20 uppercase tracking-widest mb-2">
                    Wallet Address
                  </p>
                  <p className="text-xs font-mono text-white truncate">
                    {viewingUser.wallet_address}
                  </p>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                  <p className="text-[10px] font-header text-white/20 uppercase tracking-widest mb-2">
                    Joined Date
                  </p>
                  <p className="text-xs font-body text-white">
                    {viewingUser.created_at
                      ? new Date(viewingUser.created_at).toLocaleDateString(
                          undefined,
                          { year: "numeric", month: "long", day: "numeric" },
                        )
                      : "Alpha Cohort"}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  fullWidth
                  className="!py-5 !text-[11px] font-black tracking-widest uppercase italic !rounded-2xl"
                  onClick={() => setViewingUser(null)}
                >
                  Close Profile
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  className="!py-5 !text-[11px] font-black tracking-widest uppercase italic !rounded-2xl"
                  onClick={() => handleInviteClick(viewingUser)}
                  rightIcon={<ArrowRight className="w-4 h-4 ml-2" />}
                >
                  Invite to License
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <span className="text-[10px] font-black text-primary tracking-widest uppercase italic">
                  Secure Invitation
                </span>
              </div>
              <h2 className="text-3xl font-bold font-header text-white mb-2 italic uppercase">
                Invite {selectedUser.username}
              </h2>
              <p className="text-[#ffffff40] font-body text-sm leading-relaxed">
                Select one of your verified licenses to invite this user. They
                will receive a notification to view and accept your terms.
              </p>
            </div>

            <div className="space-y-6 mb-10">
              <div className="space-y-3">
                <label className="text-[10px] font-header font-bold uppercase tracking-widest text-[#ffffff20] ml-1">
                  Select License
                </label>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {licenses.map((license) => (
                    <div
                      key={license.id}
                      onClick={() => setSelectedLicenseId(license.id)}
                      className={`
                        p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between group
                        ${
                          selectedLicenseId === license.id
                            ? "bg-primary/20 border-primary/50 shadow-[0_0_20px_rgba(111,38,255,0.1)]"
                            : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
                        }
                      `}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-header font-bold text-white italic">
                          {license.title}
                        </span>
                        <span className="text-[10px] font-body text-primary uppercase font-bold tracking-widest">
                          {license.type.replace("_", " ")}
                        </span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedLicenseId === license.id
                            ? "border-primary bg-primary shadow-[0_0_10px_#6f26ff]"
                            : "border-white/10"
                        }`}
                      >
                        {selectedLicenseId === license.id && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <label className="text-[10px] font-header font-bold uppercase tracking-widest text-[#ffffff20] ml-1">
                  Personal Message
                </label>
                <textarea
                  value={invitationMessage}
                  onChange={(e) => setInvitationMessage(e.target.value)}
                  placeholder="Include a message with your invitation..."
                  className="w-full bg-[#ffffff05] border border-[#ffffff10] rounded-2xl p-4 text-xs font-body text-white placeholder-white/10 min-h-[100px] focus:outline-none focus:border-primary/50 focus:bg-[#ffffff0a] transition-all resize-none shadow-inner"
                />
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
                rightIcon={
                  submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin ml-2" />
                  ) : (
                    <ArrowRight className="w-4 h-4 ml-2" />
                  )
                }
              >
                {submitting ? "Transmitting..." : "Send Invitation"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
