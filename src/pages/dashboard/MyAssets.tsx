import React from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import AssetCard from '../../components/dashboard/AssetCard';
import { Button } from '../../components/ui/Button';
import { Search, Plus, Filter, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAssets } from '../../hooks/assets/useAssets';

const MyAssets: React.FC = () => {
  const navigate = useNavigate();
  const { data: assets, isLoading, isError, refetch } = useAssets();

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-white overflow-hidden selection:bg-primary/30">
      <Sidebar />

      <main className="flex-1 flex flex-col relative z-20">
        <DashboardNavbar />
        
        <div className="p-8 lg:p-12 overflow-y-auto max-h-[calc(100vh-88px)]">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold font-header tracking-tight text-white">
                My Assets
              </h1>
              <p className="text-[#ffffff40] font-body text-sm tracking-wide">
                Manage your uploaded files and their associated licenses.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="primary" 
                className="!rounded-2xl !py-3" 
                leftIcon={<Plus className="w-5 h-5" />}
                onClick={() => navigate('/create-license')}
              >
                Create License
              </Button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-[#ffffff05] border border-[#ffffff10] rounded-[32px] p-6 mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1 max-w-md relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ffffff20] group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search by file name or hash..."
                className="w-full bg-black/40 border border-[#ffffff10] rounded-2xl py-3 pl-12 pr-4 text-sm font-body focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-black/40 border border-[#ffffff10] rounded-xl text-[10px] font-header tracking-widest text-[#ffffff60] cursor-pointer hover:border-primary/30 transition-all">
                  LICENSE TYPE: ALL <Filter className="w-3 h-3" />
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-black/40 border border-[#ffffff10] rounded-xl text-[10px] font-header tracking-widest text-[#ffffff60] cursor-pointer hover:border-primary/30 transition-all">
                  STATUS: VERIFIED <Filter className="w-3 h-3" />
                </div>
              </div>

              <div className="h-8 w-[1px] bg-[#ffffff10] hidden lg:block"></div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-header tracking-widest text-[#ffffff40]">GROUP BY LICENSE</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-[#ffffff10] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Assets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {isLoading ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-[#ffffff20] font-header tracking-widest text-xs uppercase italic">Scanning file records...</p>
              </div>
            ) : isError ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center space-y-6">
                <p className="text-red-400 font-header tracking-widest text-xs uppercase italic">Trace Error</p>
                <Button variant="outline" onClick={() => refetch()} clipped={false}>Retry Scan</Button>
              </div>
            ) : !assets || assets.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <p className="text-[#ffffff20] font-header tracking-[0.2em] italic uppercase">Vault is empty</p>
              </div>
            ) : (
              assets.map((asset) => (
                <AssetCard 
                  key={asset.id} 
                  id={Number(asset.id)}
                  type={asset.type === 'image' ? 'image' : 'document'}
                  name={asset.title}
                  date={new Date(asset.createdAt).toLocaleDateString()}
                  status={asset.status as any}
                  license={asset.licenseId || 'Unassigned'}
                  price="--"
                />
              ))
            )}
            
            {/* Add New Placeholder */}
            <div className="border-2 border-dashed border-[#ffffff10] rounded-[32px] flex flex-col items-center justify-center p-12 group cursor-pointer hover:border-primary/30 hover:bg-primary/5 transition-all duration-500">
               <div className="mb-4">
                 <Button variant="outline" className="!rounded-full !p-5 group-hover:bg-primary/20 group-hover:border-primary/50" clipped={false}>
                   <Plus className="w-8 h-8 text-primary" />
                 </Button>
               </div>
               <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff20] group-hover:text-primary transition-colors">ADD NEW ASSET</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAssets;
