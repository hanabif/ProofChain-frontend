import React, { useState } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { Button } from '../../components/ui/Button';
import { 
  ShieldCheck, 
  Lock, 
  File,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { useRequests } from '../../hooks/requests/useRequests';
import { useApproveRequest, useDeclineRequest } from '../../hooks/requests/useApproveRequest';

type RequestStatus = 'RECEIVED' | 'SENT';

const Requests: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RequestStatus>('RECEIVED');
  const { data: requests, isLoading, isError, refetch } = useRequests();
  const approveMutation = useApproveRequest();
  const declineMutation = useDeclineRequest();

  // Filter requests for received (all for now based on mock)
  const receivedRequests = requests?.filter(r => r.status === 'pending' || r.status === 'approved' || r.status === 'declined') || [];

  // Mock data for Sent Requests (keep as is for UI demonstration)
  const sentRequests = [
    {
      id: "s1",
      owner: "Protocol Labs",
      resource: "Network_Architecture.dwg",
      date: "Nov 02, 2024",
      status: "approved",
      type: "FILE"
    },
    {
      id: "s2",
      owner: "MetaLabs",
      resource: "Security_Protocol_v4.pdf",
      date: "Nov 05, 2024",
      status: "pending",
      type: "SHIELD"
    },
    {
        id: "s3",
        owner: "CyberDyne",
        resource: "Neural_Net_Design.zip",
        date: "Oct 28, 2024",
        status: "declined",
        type: "LOCK"
    }
  ];

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    switch (s) {
      case 'approved': return 'text-[#00ff95] bg-[#00ff95]/10 border-[#00ff95]/20';
      case 'pending': return 'text-[#ffb800] bg-[#ffb800]/10 border-[#ffb800]/20';
      case 'declined': return 'text-[#ff4b4b] bg-[#ff4b4b]/10 border-[#ff4b4b]/20';
      default: return 'text-white/40 bg-white/5 border-white/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'FILE': return <File className="w-5 h-5 text-primary" />;
      case 'SHIELD': return <ShieldCheck className="w-5 h-5 text-primary" />;
      case 'LOCK': return <Lock className="w-5 h-5 text-primary" />;
      default: return <File className="w-5 h-5 text-primary" />;
    }
  };

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
                Manage incoming project requests and track your outgoing inquiries.
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
                RECEIVED
              </button>
              <button
                onClick={() => setActiveTab('SENT')}
                className={`px-8 py-2.5 rounded-xl text-[10px] font-header tracking-widest transition-all duration-300 ${
                  activeTab === 'SENT' 
                    ? 'bg-primary text-white shadow-[0_0_20px_rgba(111,38,255,0.3)]' 
                    : 'text-[#ffffff40] hover:text-white'
                }`}
              >
                SENT
              </button>
            </div>
          </div>

          {activeTab === 'RECEIVED' ? (
            <div className="space-y-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <Loader2 className="w-12 h-12 text-primary animate-spin" />
                  <p className="text-[#ffffff40] font-header tracking-widest text-xs uppercase italic">Loading requests...</p>
                </div>
              ) : isError ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-6">
                  <p className="text-red-400 font-header tracking-widest text-xs uppercase italic text-center">Failed to load requests.</p>
                  <Button variant="outline" onClick={() => refetch()} clipped={false}>Retry</Button>
                </div>
              ) : receivedRequests.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-[#ffffff20] font-header tracking-[0.2em] italic uppercase">No incoming requests</p>
                </div>
              ) : (
                receivedRequests.map((req) => (
                  <div key={req.id} className="bg-[#161622]/40 border border-[#ffffff05] rounded-[32px] p-8 group hover:bg-[#161622]/60 transition-all duration-500">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="flex-1 space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <File className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-bold font-header text-white italic">Asset ID: {req.assetId}</h3>
                          </div>
                          <div className={`px-4 py-1 rounded-full text-[8px] font-header tracking-widest border ${getStatusColor(req.status)} uppercase`}>
                            {req.status}
                          </div>
                        </div>

                        <div className="flex items-start gap-5 p-6 bg-black/40 border border-[#ffffff05] rounded-2xl">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${req.requesterName}`} alt={req.requesterName} className="w-12 h-12 rounded-xl border border-white/10" />
                          <div className="flex-1 space-y-3">
                            <div className="flex flex-col gap-0.5">
                              <h4 className="text-sm font-bold font-header text-white tracking-wide">{req.requesterName}</h4>
                              <span className="text-[10px] font-body text-[#ffffff20]">{new Date(req.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-xs font-body text-[#ffffff60] leading-relaxed italic">
                              "{req.message}"
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="lg:w-48 flex flex-row lg:flex-col gap-3 justify-center">
                        {req.status === 'pending' && (
                          <>
                            <Button 
                              variant="secondary" 
                              fullWidth 
                              className="!rounded-2xl !py-4 !text-[10px] !bg-white/5 !border-[#ffffff10] hover:!bg-white/10" 
                              clipped={false}
                              onClick={() => declineMutation.mutate(req.id)}
                              disabled={declineMutation.isPending || approveMutation.isPending}
                            >
                              {declineMutation.isPending ? 'DECLINING...' : 'DECLINE'}
                            </Button>
                            <Button 
                              variant="primary" 
                              fullWidth 
                              className="!rounded-2xl !py-4 !text-[10px]" 
                              clipped={false}
                              onClick={() => approveMutation.mutate(req.id)}
                              disabled={approveMutation.isPending || declineMutation.isPending}
                            >
                              {approveMutation.isPending ? 'APPROVING...' : 'APPROVE'}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sentRequests.map((req) => (
                <div key={req.id} className="bg-[#161622]/40 border border-[#ffffff05] rounded-[40px] p-8 flex flex-col group hover:border-primary/20 transition-all duration-500">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                      {getTypeIcon(req.type)}
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-[8px] font-header tracking-widest border ${getStatusColor(req.status)} uppercase`}>
                      {req.status}
                    </div>
                  </div>

                  <div className="space-y-4 mb-10">
                    <div className="space-y-1">
                      <span className="text-[8px] font-header tracking-[0.2em] text-[#ffffff20] uppercase">Resource Requested</span>
                      <h3 className="text-lg font-bold font-header text-white group-hover:text-primary transition-colors italic truncate">
                        {req.resource}
                      </h3>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[8px] font-header tracking-[0.2em] text-[#ffffff20] uppercase">Property Owner</span>
                      <h4 className="text-sm font-body text-[#ffffff60]">{req.owner}</h4>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-[#ffffff05]">
                    {req.status === 'approved' ? (
                      <Button 
                        variant="primary" 
                        fullWidth 
                        className="!rounded-2xl !py-3.5 !text-[10px]" 
                        clipped={false}
                        rightIcon={<ArrowRight className="w-4 h-4 ml-2" />}
                      >
                        PROCEED TO PAYMENT
                      </Button>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-body text-[#ffffff20]">{req.date}</span>
                        <button className="text-[10px] font-header text-primary tracking-widest uppercase italic hover:text-white transition-colors">
                          VIEW DETAILS
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Requests;
