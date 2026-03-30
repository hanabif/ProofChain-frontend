import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { Button } from '../../components/ui/Button';
import { 
  ArrowLeft, 
  FileText, 
  CheckCircle2, 
  Upload,
  Loader2
} from 'lucide-react';
import { useAsset } from '../../hooks/assets/useAsset';


const AssetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: asset, isLoading, isError } = useAsset(id);

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-white overflow-hidden selection:bg-primary/30">
      <Sidebar />

      <main className="flex-1 flex flex-col relative z-20">
        <DashboardNavbar />

        <div className="p-8 lg:p-12 overflow-y-auto max-h-[calc(100vh-88px)]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-40 space-y-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-[#ffffff20] font-header tracking-widest text-xs uppercase italic">Syncing asset data...</p>
            </div>
          ) : isError || !asset ? (
            <div className="flex flex-col items-center justify-center py-40 space-y-6">
              <p className="text-red-400 font-header tracking-widest text-xs uppercase italic">Asset Not Found</p>
              <Button variant="outline" onClick={() => navigate('/dashboard/assets')} clipped={false}>Back to Assets</Button>
            </div>
          ) : (
            <>
              {/* Header with Back Button */}
              <div className="flex items-center gap-6 mb-12">
                <button 
                  onClick={() => navigate('/dashboard/assets')}
                  className="w-12 h-12 rounded-full border border-[#ffffff10] bg-[#ffffff05] flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 group"
                >
                  <ArrowLeft className="w-6 h-6 text-[#ffffff60] group-hover:text-primary transition-colors" />
                </button>
                <h1 className="text-3xl md:text-4xl font-bold font-header tracking-tight text-white uppercase italic">
                  {asset.title}
                </h1>
              </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            {/* Left Card: Asset Info */}
            <div className="xl:col-span-7 bg-[#161622]/40 border border-[#ffffff08] rounded-[40px] p-10 relative overflow-hidden group">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10 group-hover:bg-primary/10 transition-all duration-700"></div>
              
              <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
                {/* File Preview Icon */}
                <div className="w-full md:w-56 h-72 bg-black rounded-[32px] flex items-center justify-center relative overflow-hidden border border-[#ffffff05]">
                   <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50"></div>
                   <div className="relative z-10 p-8">
                     <FileText className="w-16 h-16 text-primary mb-2 opacity-80" />
                     {/* Decorative lines to mimic file content */}
                     <div className="w-12 h-1.5 bg-primary/20 rounded-full mb-2"></div>
                     <div className="w-8 h-1.5 bg-primary/10 rounded-full"></div>
                   </div>
                </div>

                {/* Metadata */}
                <div className="flex-1 space-y-8 w-full">
                  <h2 className="text-2xl font-bold font-header tracking-wide text-white">
                    {asset.title}
                  </h2>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff40] uppercase">File Type</span>
                      <span className="text-sm font-body text-white">{asset.type}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff40] uppercase">Date Created</span>
                      <span className="text-sm font-body text-white">{new Date(asset.createdAt || '').toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff40] uppercase">Status</span>
                      <span className="text-sm font-body text-white capitalize">{asset.status}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#00ff95]/10 border border-[#00ff95]/20 rounded-full">
                      <div className="w-5 h-5 rounded-full bg-[#00ff95]/20 flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-[#00ff95]" />
                      </div>
                      <span className="text-[10px] font-header tracking-[0.1em] text-[#00ff95] font-bold uppercase">
                        Verified on Blockchain
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: License Details */}
            <div className="xl:col-span-5 flex flex-col gap-6">
              <div className="bg-[#161622]/60 border border-[#ffffff10] rounded-[40px] p-10 relative overflow-hidden group shadow-2xl">
                 <div className="flex items-center justify-between mb-10">
                   <h3 className="text-sm font-header tracking-[0.3em] text-primary italic font-black">
                     LICENSE DETAILS
                   </h3>
                   <span className="px-4 py-1.5 bg-primary/20 border border-primary/30 rounded-xl text-[10px] font-header tracking-widest text-[#ffffff80]">
                     {asset.licenseId}
                   </span>
                 </div>

                 <div className="mb-10">
                   <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff30] block mb-2">Reference ID</span>
                   <div className="flex items-baseline gap-3">
                     <span className="text-4xl font-black font-header tracking-tighter text-white">
                       {asset.id}
                     </span>
                   </div>
                 </div>

                 <p className="text-[#ffffff60] font-body text-sm leading-relaxed mb-8">
                   Securely anchored to the ProofChain protocol. This asset is protected by automated smart contract enforcement.
                 </p>
              </div>

              {/* Action Button */}
              <div className="relative group overflow-hidden rounded-[32px]">
                {/* Custom Button with unique shape matching screenshot */}
                <Button 
                  variant="primary" 
                  fullWidth 
                  className="!rounded-2xl !py-6 !text-sm italic font-header tracking-[0.15em] relative z-10 overflow-hidden" 
                  clipped={true}
                  leftIcon={<Upload className="w-5 h-5 mr-2" />}
                >
                  <span className="flex items-center gap-2">
                    Upload another file
                  </span>
                </Button>
                {/* Decorative accent for the button container to match the "slanted" look in screenshot */}
                <div className="absolute top-0 right-0 w-24 h-full bg-white/10 skew-x-[-20deg] translate-x-12 -z-0"></div>
              </div>
            </div>
          </div>
          </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AssetDetail;
