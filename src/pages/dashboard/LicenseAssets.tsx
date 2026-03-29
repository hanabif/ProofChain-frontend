import React, { useState } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { Button } from '../../components/ui/Button';
import AssetCard from '../../components/dashboard/AssetCard';
import { 
  Search, 
  Plus, 
  Edit3, 
  ChevronDown,
  Loader2
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLicenses } from '../../hooks/licenses/useLicenses';

const LicenseAssets: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: licenses, isLoading, isError, refetch } = useLicenses();
  const [searchQuery, setSearchQuery] = useState('');

  // Find the specific license from the list
  const license = licenses?.find(l => l.id === id);
  const assets = license?.assets || [];

  const filteredAssets = assets.filter(asset => 
    asset.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.file.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUploadClick = () => {
    navigate(`/attach-file?licenseId=${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[#0a0a0f] text-white">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-[#ffffff20] font-header tracking-widest text-xs uppercase italic">Syncing license artifacts...</p>
        </main>
      </div>
    );
  }

  if (isError || !license) {
    return (
      <div className="flex min-h-screen bg-[#0a0a0f] text-white">
        <Sidebar />
         <main className="flex-1 flex flex-col items-center justify-center space-y-6 p-8 text-center">
          <p className="text-red-400 font-header tracking-widest text-xs uppercase italic">
            {!license ? 'License record not found or vault access denied.' : 'Failed to synchronize with the blockchain.'}
          </p>
          <Button variant="outline" onClick={() => !license ? navigate('/dashboard/licenses') : refetch()} clipped={false}>
            {!license ? 'Back to Licenses' : 'Retry Synchronization'}
          </Button>
        </main>
      </div>
    );
  }

  const displayPrice = !license.price || license.price === '0' || license.price === 0 ? 'FREE' : `${license.price} ETH`;

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-white overflow-hidden selection:bg-primary/30">
      <Sidebar />

      <main className="flex-1 flex flex-col relative z-20">
        <DashboardNavbar />

        <div className="p-8 lg:p-12 overflow-y-auto max-h-[calc(100vh-88px)]">
          {/* License Summary Header Card */}
          <div className="bg-[#161622]/40 border border-[#ffffff08] rounded-[40px] p-8 md:p-12 mb-12 relative overflow-hidden group shadow-2xl">
             {/* Background decoration */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] -z-10 group-hover:bg-primary/10 transition-all duration-700"></div>

             <div className="flex flex-col xl:flex-row justify-between gap-10">
               <div className="flex-1 space-y-8">
                 <div className="flex items-center gap-4">
                   <span className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-xl text-[10px] font-header tracking-widest text-[#ffffff60] uppercase">
                     {(license?.type || 'STANDARD').replace('_', ' ')}
                   </span>
                 </div>

                 <div className="space-y-4">
                   <h1 className="text-4xl md:text-5xl font-bold font-header tracking-tight text-white leading-tight uppercase italic">
                     {license?.title || 'Unknown License'}
                   </h1>
                   <p className="text-[#ffffff40] font-body text-sm leading-relaxed max-w-2xl">
                     {license.description}
                   </p>
                 </div>

                 <div className="flex items-center gap-12 pt-4">
                    <div className="space-y-2">
                       <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff20] uppercase">Total Assets</span>
                       <div className="text-4xl font-black font-header text-white">{assets.length}</div>
                    </div>
                    <div className="space-y-2">
                       <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff20] uppercase">Requests</span>
                       <div className="text-4xl font-black font-header text-white">{license.requestCount || 0}</div>
                    </div>
                 </div>
               </div>

               <div className="xl:w-80 flex flex-col justify-between items-end gap-10">
                  <div className="text-right space-y-2">
                    <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff30] uppercase">LICENSE FEE</span>
                    <div className="flex items-baseline justify-end gap-3">
                      <span className="text-5xl font-black font-header tracking-tighter text-white">
                        {displayPrice}
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
                      onClick={() => navigate(`/dashboard/license/${id}/edit`)}
                    >
                      Edit License
                    </Button>
                    <div className="relative group overflow-hidden rounded-[20px]">
                      <Button 
                        variant="primary" 
                        fullWidth 
                        className="!py-4 !text-[10px] italic font-header tracking-widest relative z-10" 
                        clipped={true}
                        leftIcon={<Plus className="w-5 h-5 mr-2" />}
                        onClick={handleUploadClick}
                      >
                        Upload File
                      </Button>
                      <div className="absolute top-0 right-0 w-16 h-full bg-white/10 skew-x-[-20deg] translate-x-8"></div>
                    </div>
                  </div>
               </div>
             </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-[#ffffff05] border border-[#ffffff10] rounded-[32px] p-6 mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1 max-w-md relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ffffff20] group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search assets in this license..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-[#ffffff10] rounded-2xl py-3.5 pl-14 pr-4 text-sm font-body focus:outline-none focus:border-primary/50 transition-all font-light"
              />
            </div>

            <div className="flex items-center gap-4">
               <button className="flex items-center gap-3 px-6 py-3.5 bg-[#ffffff05] border border-[#ffffff08] rounded-2xl text-[10px] font-header tracking-widest text-[#ffffff60] hover:border-primary/30 transition-all uppercase">
                 ALL STATUS <ChevronDown className="w-4 h-4" />
               </button>
               <button className="flex items-center gap-3 px-6 py-3.5 bg-[#ffffff05] border border-[#ffffff08] rounded-2xl text-[10px] font-header tracking-widest text-[#ffffff60] hover:border-primary/30 transition-all uppercase">
                 SORT BY DATE <ChevronDown className="w-4 h-4" />
               </button>
            </div>
          </div>

          {/* Asset Grid - Using AssetCard for consistency */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAssets.length === 0 ? (
               <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[40px]">
                <p className="text-[#ffffff20] font-header tracking-[0.2em] italic uppercase">No artifacts matching criteria</p>
               </div>
            ) : (
              filteredAssets.map((asset) => (
                <AssetCard 
                  key={asset.id} 
                  id={asset.id}
                  type={asset.file.toLowerCase().match(/\.(mp4|mov|avi)$/) ? 'video' : (asset.file.toLowerCase().match(/\.(jpg|jpeg|png|webp|gif)$/) ? 'image' : 'document')}
                  name={asset.title || asset.file.split('/').pop() || 'Untitled Asset'}
                  date={new Date(asset.createdAt).toLocaleDateString()}
                  status={asset.status as any}
                  license={license.title}
                  price={displayPrice}
                />
              ))
            )}

            {/* Add New Placeholder */}
            <div 
              onClick={handleUploadClick}
              className="border-2 border-dashed border-[#ffffff10] rounded-[32px] flex flex-col items-center justify-center p-12 group cursor-pointer hover:border-primary/30 hover:bg-primary/10 transition-all duration-500 min-h-[300px]"
            >
               <div className="mb-6">
                 <Button variant="outline" className="!rounded-full !p-6 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all" clipped={false}>
                   <Plus className="w-8 h-8 text-primary" />
                 </Button>
               </div>
               <span className="text-[10px] font-header tracking-[0.3em] text-[#ffffff20] group-hover:text-primary transition-colors uppercase italic text-center">
                 Add artifact
               </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LicenseAssets;
