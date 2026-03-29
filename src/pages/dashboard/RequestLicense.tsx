import React, { useState } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { Button } from '../../components/ui/Button';
import { 
  FileText, 
  Search, 
  Edit3, 
  ChevronDown,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLicense } from '../../hooks/licenses/useLicense';
import { useRequests } from '../../hooks/requests/useRequests';

type RequestStatus = 'All' | 'Pending' | 'Approved' | 'Declined';

const RequestLicense: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<RequestStatus>('All');
  
  const { data: license, isLoading: isLicenseLoading, isError: isLicenseError } = useLicense(id);
  const { data: allRequests, isLoading: isRequestsLoading } = useRequests();

  const requests = allRequests?.filter(req => req.licenseId === id) || [];

  const filteredRequests = requests.filter(req => 
    activeTab === 'All' || req.status.toLowerCase() === activeTab.toLowerCase()
  );

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-white overflow-hidden selection:bg-primary/30">
      <Sidebar />

      <main className="flex-1 flex flex-col relative z-20">
        <DashboardNavbar />

        <div className="p-8 lg:p-12 overflow-y-auto max-h-[calc(100vh-88px)]">
          {isLicenseLoading || isRequestsLoading ? (
            <div className="flex flex-col items-center justify-center py-40 space-y-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-[#ffffff20] font-header tracking-widest text-xs uppercase italic">Retrieving license records...</p>
            </div>
          ) : isLicenseError || !license ? (
            <div className="flex flex-col items-center justify-center py-40 space-y-6">
              <p className="text-red-400 font-header tracking-widest text-xs uppercase italic">License Protocol Not Found</p>
              <Button variant="outline" onClick={() => navigate('/dashboard/licenses')} clipped={false}>Back to Licenses</Button>
            </div>
          ) : (
            <>
              {/* License Summary Header Card */}
              <div className="bg-[#161622]/40 border border-[#ffffff08] rounded-[40px] p-10 mb-12 relative overflow-hidden group shadow-2xl">
                 <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] -z-10 group-hover:bg-primary/10 transition-all duration-700"></div>

                 <div className="flex flex-col xl:flex-row justify-between gap-10">
                   <div className="flex-1 space-y-8">
                     <div className="flex items-center gap-4">
                       <span className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-xl text-[10px] font-header tracking-widest text-[#ffffff60] uppercase">
                         {license.type}
                       </span>
                     </div>

                     <div className="space-y-4">
                       <h1 className="text-4xl md:text-5xl font-bold font-header tracking-tight text-white leading-tight">
                         {license.type?.toUpperCase()} LICENSE
                       </h1>
                       <p className="text-[#ffffff40] font-body text-sm leading-relaxed max-w-2xl">
                         {license.description}
                       </p>
                     </div>

                     <div className="flex items-center gap-12 pt-4">
                        <div className="space-y-2">
                           <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff20] uppercase">Total Assets</span>
                           <div className="text-4xl font-black font-header text-white">{license.assetCount}</div>
                        </div>
                        <div className="space-y-2">
                           <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff20] uppercase">Requests</span>
                           <div className="text-4xl font-black font-header text-white">{license.requestCount}</div>
                        </div>
                     </div>
                   </div>

                   <div className="xl:w-80 flex flex-col justify-between items-end gap-10">
                      <div className="text-right space-y-2">
                        <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff30] uppercase">Pricing</span>
                        <div className="flex items-baseline justify-end gap-3">
                          <span className="text-5xl font-black font-header tracking-tighter text-white">
                            {license.price}
                          </span>
                          <span className="text-2xl font-bold font-header text-primary">
                            ETH
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4 w-full">
                        <Button 
                          variant="outline" 
                          fullWidth 
                          className="!rounded-2xl !py-4 !text-[10px] italic font-header tracking-widest !border-primary/20 hover:!bg-primary/10" 
                          clipped={true}
                          leftIcon={<Edit3 className="w-4 h-4 mr-2" />}
                          onClick={() => navigate(`/dashboard/edit-license/${license.id}`)}
                        >
                          Edit License
                        </Button>
                      </div>
                   </div>
                 </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                <div className="flex-1 max-w-xl relative group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ffffff20] group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search requests..."
                    className="w-full bg-[#ffffff05] border border-[#ffffff08] rounded-[24px] py-4 pl-16 pr-6 text-sm font-body focus:outline-none focus:border-primary/50 focus:bg-[#ffffff0a] transition-all"
                  />
                </div>

                <div className="flex items-center gap-6">
                   <div className="flex p-1.5 bg-[#ffffff05] border border-[#ffffff08] rounded-2xl">
                     {(['All', 'Pending', 'Approved', 'Declined'] as RequestStatus[]).map((tab) => (
                       <button
                         key={tab}
                         onClick={() => setActiveTab(tab)}
                         className={`px-6 py-2 rounded-xl text-[10px] font-header tracking-widest transition-all duration-300 ${
                           activeTab === tab 
                             ? 'bg-primary text-white shadow-[0_0_15px_rgba(111,38,255,0.3)]' 
                             : 'text-[#ffffff40] hover:text-white'
                         }`}
                       >
                         {tab.toUpperCase()}
                       </button>
                     ))}
                   </div>
                   <button className="flex items-center gap-3 px-6 py-3.5 bg-[#ffffff05] border border-[#ffffff08] rounded-2xl text-[10px] font-header tracking-widest text-[#ffffff60] hover:border-primary/30 transition-all uppercase whitespace-nowrap">
                     SORT: <span className="text-white">Newest first</span> <ChevronDown className="w-4 h-4" />
                   </button>
                </div>
              </div>

              {/* Request Cards Grid */}
              <div className="space-y-6">
                {filteredRequests.length === 0 ? (
                  <div className="text-center py-20 bg-[#161622]/20 rounded-[32px] border border-white/5">
                    <p className="text-[#ffffff20] font-header tracking-[0.2em] italic uppercase">No requests found for this license</p>
                  </div>
                ) : (
                  filteredRequests.map((req: any) => (
                    <div key={req.id} className="bg-[#161622]/40 border border-[#ffffff05] rounded-[32px] p-8 group hover:bg-[#161622]/60 transition-all duration-500">
                      <div className="flex flex-col gap-8">
                        {/* Top: Asset & Status */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <FileText className="w-6 h-6 text-primary" />
                            <h3 className="text-xl font-bold font-header text-white italic tracking-wide">
                              Asset ID: {req.assetId}
                            </h3>
                          </div>
                          <div className={`px-4 py-1 rounded-full text-[9px] font-header tracking-widest bg-primary/10 border border-primary/20 text-primary uppercase`}>
                            {req.status}
                          </div>
                        </div>

                        {/* Middle: User Info & Message */}
                        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                          <div className="xl:col-span-4 flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl border border-white/10 overflow-hidden shadow-lg">
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${req.requesterName}`} alt={req.requesterName} className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <h4 className="text-sm font-bold font-header text-white">{req.requesterName}</h4>
                                <p className="text-[10px] font-body text-[#ffffff30]">{req.requesterEmail}</p>
                              </div>
                            </div>
                          </div>

                          <div className="xl:col-span-8">
                            <div className="h-full p-6 bg-black/40 border border-[#ffffff05] rounded-2xl relative">
                              <p className="text-xs font-body text-[#ffffff60] leading-relaxed italic">
                                "{req.message}"
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Bottom: Date & Actions */}
                        <div className="pt-6 border-t border-[#ffffff05] flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[10px] font-header tracking-widest text-[#ffffff20]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ffffff10]"></span>
                            {new Date(req.createdAt).toLocaleDateString()}
                          </div>
                          
                          <div className="flex items-center gap-4">
                            {req.status === 'pending' ? (
                              <>
                                <Button 
                                  variant="outline" 
                                  className="!py-2.5 !px-8 !text-[10px] !rounded-xl !border-white/10 hover:!bg-white/5 !text-white"
                                  clipped={false}
                                >
                                  Decline
                                </Button>
                                <Button 
                                  variant="primary" 
                                  className="!py-2.5 !px-8 !text-[10px] !rounded-xl shadow-[0_0_20px_rgba(111,38,255,0.3)]" 
                                  clipped={false}
                                >
                                  Approve
                                </Button>
                              </>
                            ) : (
                              <button className="flex items-center gap-2 text-[10px] font-header text-primary hover:text-white transition-colors tracking-widest uppercase italic">
                                View Receipt <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default RequestLicense;
