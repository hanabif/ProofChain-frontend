import React from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Copy, 
  Lock, 
  Link as LinkIcon, 
  Database,
  ArrowLeft,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAsset } from '../hooks/assets/useAsset';
import { useLicense } from '../hooks/licenses/useLicenses';

const FileDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { asset?: any, license?: any, owner?: any, creator?: any } | null;

  const { data: fetchAsset, isLoading: assetLoading, isError: assetError } = useAsset(id);
  const fetchLicense = useLicense(fetchAsset?.licenseId);

  // Prioritize passed state to fix the "undefined" crash and ensure instant loading
  const asset = state?.asset || fetchAsset;
  const license = state?.license || fetchLicense;

  const isLoading = assetLoading && !asset;
  const isError = assetError && !asset;

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[#0a0a0f] text-white">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-[#ffffff20] font-header tracking-widest text-xs uppercase italic">Synchronizing Artifact Protocol...</p>
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen bg-[#0a0a0f] text-white">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-center p-8 space-y-6">
          <p className="text-red-400 font-header tracking-widest text-xs uppercase italic text-center">
            Verification Protocol Failed: Artifact with ID <span className="text-white">"{id}"</span> not found in global register.
          </p>
          <Button variant="outline" onClick={() => navigate('/dashboard/assets')} clipped={false}>
            Return to Assets
          </Button>
        </main>
      </div>
    );
  }

  const assetName = asset?.title || asset?.file?.split('/').pop() || 'Unnamed Artifact';
  const displayPrice = !license?.price || license?.price === '0' || license?.price === 0 ? 'FREE' : `${license?.price} ETH`;

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-white overflow-hidden selection:bg-primary/30">
      <Sidebar />

      <main className="flex-1 flex flex-col relative z-20">
        <DashboardNavbar />

        <div className="p-8 lg:p-12 overflow-y-auto max-h-[calc(100vh-88px)]">
          {/* Header with Back Button */}
          <div className="flex items-center gap-6 mb-12">
            <button 
              onClick={() => navigate('/dashboard/assets')}
              className="w-12 h-12 rounded-full border border-[#ffffff10] bg-[#ffffff05] flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 group"
            >
              <ArrowLeft className="w-6 h-6 text-[#ffffff60] group-hover:text-primary transition-colors" />
            </button>
            <h1 className="text-3xl md:text-5xl font-bold font-header tracking-tight text-white uppercase italic">
              Protocol Detail
            </h1>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-10">
            
            {/* Main Column */}
            <div className="xl:col-span-8 flex flex-col">
              
              {/* Preview Box */}
              <div className="w-full aspect-video bg-[#11111B]/80 backdrop-blur-md border border-white/5 rounded-[40px] relative flex flex-col items-center justify-center overflow-hidden shadow-2xl group">
                {/* Background decoration */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000">
                  <div className="w-[800px] h-[800px] border border-white rounded-full flex items-center justify-center">
                    <div className="w-[600px] h-[600px] border border-white rounded-full flex items-center justify-center bg-primary/5">
                      <div className="w-[400px] h-[400px] border border-white rounded-full bg-primary/5" />
                    </div>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                   <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-8 border border-primary/20">
                     <FileText className="w-16 h-16 text-primary opacity-50" />
                   </div>
                   <h3 className="text-[10px] font-header font-bold uppercase tracking-[0.4em] text-primary/40">
                     Blockchain Artifact Secured
                   </h3>
                </div>
              </div>

              {/* Title & Badge */}
              <div className="flex flex-col mt-12 mb-10">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-4">
                  <h1 className="text-3xl md:text-4xl font-header font-black text-white tracking-tighter uppercase italic truncate max-w-2xl">
                    {assetName}
                  </h1>
                  <div className="inline-flex items-center gap-2 bg-[#00ff95]/10 border border-[#00ff95]/20 px-5 py-2.5 rounded-full w-fit whitespace-nowrap">
                    <CheckCircle2 className="w-4 h-4 text-[#00ff95]" />
                    <span className="text-[10px] font-black text-[#00ff95] tracking-[0.2em] uppercase">Verified Protocl</span>
                  </div>
                </div>
                
              </div>

              {/* Properties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoBox label="Artifact ID" value={asset?.id || '—'} copyable />
                <InfoBox label="Registered Owner" value={state?.owner?.username || 'System Node'} />
                <InfoBox label="Artifact Type" value={asset?.type || asset?.file?.split('.').pop()?.toUpperCase() || 'UNSPECIFIED'} />
                <InfoBox label="Creation Date" value={asset?.createdAt || asset?.created_at ? new Date(asset.createdAt || asset.created_at).toLocaleString() : 'Recent Block'} />
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="xl:col-span-4 flex flex-col gap-8">
              
              {/* License Card */}
              <div className="bg-[#161622]/60 border border-white/5 rounded-[40px] p-10 shadow-3xl flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-all duration-700"></div>

                <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold font-header mb-8 italic">
                  {license?.title || license?.type?.replace('_', ' ') || 'STANDARD LICENSE'}
                </span>
                
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-5xl font-header font-black text-white tracking-tighter">
                    {displayPrice.split(' ')[0]} 
                    <span className="text-xl font-bold tracking-widest text-primary ml-2 italic">
                      {displayPrice.split(' ')[1] || ''}
                    </span>
                  </span>
                </div>

                {/* License Description - As requested */}
                <div className="mb-10 text-slate-400 text-sm font-body leading-relaxed italic border-l-2 border-primary/20 pl-4">
                  {license?.description || "This license provides legal proof of ownership and the right to use this artifact under the terms specified in the protocol."}
                </div>

                <Button 
                  variant="primary" 
                  size="lg" 
                  fullWidth 
                  className="!py-6 !text-[11px] font-black tracking-[0.2em] italic uppercase shadow-2xl"
                  onClick={() => navigate(`/dashboard/license/${asset?.licenseId}/assets`)}
                >
                  Request License
                </Button>
                
                <div className="flex flex-col items-center mt-8 gap-2">
                  <div className="flex items-center justify-center gap-3 text-slate-500 hover:text-white transition-colors cursor-pointer group">
                    <Lock className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-header font-bold uppercase tracking-widest">Enclave Secured Transaction</span>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Subcomponents ---

const InfoBox = ({ label, value, copyable }: { label: string, value: string, copyable?: boolean }) => (
  <div className="bg-[#161622]/40 border border-[#ffffff08] rounded-[32px] p-8 flex flex-col justify-center group hover:border-primary/20 hover:bg-primary/5 transition-all duration-300 min-h-[110px]">
    <span className="text-[10px] font-header font-bold uppercase tracking-[0.25em] text-[#ffffff20] mb-3">{label}</span>
    <div className="flex items-center justify-between">
      <span className="text-sm md:text-base font-body text-white font-light tracking-wide truncate pr-4">{value}</span>
      {copyable && <Copy className="w-4.5 h-4.5 text-slate-700 cursor-pointer hover:text-primary transition-all hover:scale-110 active:scale-95" />}
    </div>
  </div>
);

const LicenseFeature = ({ text }: { text: string }) => (
  <li className="flex items-start gap-4 text-[13px] font-body text-slate-400 font-light leading-relaxed">
    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 opacity-60" />
    {text}
  </li>
);

export default FileDetail;
