import React from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { Button } from '../../components/ui/Button';
import { 
  FileText, 
  Film, 
  Image as ImageIcon, 
  Search, 
  Plus, 
  Edit3, 
  ChevronDown
} from 'lucide-react';
import { useParams } from 'react-router-dom';

const LicenseAssets: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock license data
  const license = {
    id: id || '1',
    title: 'Digital Media Distribution License',
    type: 'NON-EXCLUSIVE',
    status: 'EXCLUSIVE', // Badges in screenshot are confusing, I'll match the visual
    price: '250.00',
    currency: 'Br',
    description: 'Permits the licensee to distribute and display assets within designated digital channels. This license does not grant ownership but provides broad usage rights for commercial projects.',
    totalAssets: 12,
    requests: 156
  };

  // Mock assets data
  const assets = [
    {
      id: '1',
      title: 'Core_Identity_v2.pdf',
      type: 'document',
      status: 'verified',
      date: 'Oct 24, 2023',
      metadata: 'Document / 4.2 MB'
    },
    {
      id: '2',
      title: 'Marketing_Teaser.mp4',
      type: 'video',
      status: 'pending',
      date: 'Nov 02, 2023',
      metadata: 'Video / 128 MB'
    },
    {
      id: '3',
      title: 'Hero_Banner_01.raw',
      type: 'image',
      status: 'verified',
      date: 'Nov 05, 2023',
      metadata: 'Image / 45 MB'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <Film className="w-8 h-8 text-primary" />;
      case 'image': return <ImageIcon className="w-8 h-8 text-primary" />;
      default: return <FileText className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-white overflow-hidden selection:bg-primary/30">
      <Sidebar />

      <main className="flex-1 flex flex-col relative z-20">
        <DashboardNavbar />

        <div className="p-8 lg:p-12 overflow-y-auto max-h-[calc(100vh-88px)]">
          {/* License Summary Header Card */}
          <div className="bg-[#161622]/40 border border-[#ffffff08] rounded-[40px] p-10 mb-12 relative overflow-hidden group shadow-2xl">
             {/* Background decoration */}
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
                     {license.title}
                   </h1>
                   <p className="text-[#ffffff40] font-body text-sm leading-relaxed max-w-2xl">
                     {license.description}
                   </p>
                 </div>

                 <div className="flex items-center gap-12 pt-4">
                    <div className="space-y-2">
                       <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff20] uppercase">Total Assets</span>
                       <div className="text-4xl font-black font-header text-white">{license.totalAssets}</div>
                    </div>
                    <div className="space-y-2">
                       <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff20] uppercase">Requests</span>
                       <div className="text-4xl font-black font-header text-white">{license.requests}</div>
                    </div>
                 </div>
               </div>

               <div className="xl:w-80 flex flex-col justify-between items-end gap-10">
                  <div className="text-right space-y-2">
                    <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff30] uppercase">Exclusive</span>
                    <div className="flex items-baseline justify-end gap-3">
                      <span className="text-5xl font-black font-header tracking-tighter text-white">
                        {license.price}
                      </span>
                      <span className="text-2xl font-bold font-header text-primary">
                        {license.currency}
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
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
            <div className="flex-1 max-w-xl relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ffffff20] group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search assets in this license..."
                className="w-full bg-[#ffffff05] border border-[#ffffff08] rounded-[24px] py-4 pl-16 pr-6 text-sm font-body focus:outline-none focus:border-primary/50 focus:bg-[#ffffff0a] transition-all"
              />
            </div>

            <div className="flex items-center gap-4">
               <button className="flex items-center gap-3 px-6 py-3.5 bg-[#ffffff05] border border-[#ffffff08] rounded-2xl text-[10px] font-header tracking-widest text-[#ffffff60] hover:border-primary/30 transition-all">
                 ALL STATUS <ChevronDown className="w-4 h-4" />
               </button>
               <button className="flex items-center gap-3 px-6 py-3.5 bg-[#ffffff05] border border-[#ffffff08] rounded-2xl text-[10px] font-header tracking-widest text-[#ffffff60] hover:border-primary/30 transition-all">
                 SORT BY DATE <ChevronDown className="w-4 h-4" />
               </button>
            </div>
          </div>

          {/* Asset Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {assets.map((asset) => (
              <div key={asset.id} className="bg-[#161622]/40 border border-[#ffffff08] rounded-[40px] p-8 flex flex-col group hover:border-[#ffffff15] transition-all duration-500 shadow-xl">
                 <div className="flex items-center justify-between mb-8">
                   <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                     {getIcon(asset.type)}
                   </div>
                   <div className={`px-4 py-1.5 rounded-full border text-[9px] font-header tracking-widest uppercase ${
                     asset.status === 'verified' ? 'bg-[#00ff95]/10 border-[#00ff95]/20 text-[#00ff95]' : 'bg-[#ffb800]/10 border-[#ffb800]/20 text-[#ffb800]'
                   }`}>
                     {asset.status}
                   </div>
                 </div>

                 <div className="space-y-2 mb-10">
                    <h3 className="text-xl font-bold font-header text-white truncate group-hover:text-primary transition-colors">
                      {asset.title}
                    </h3>
                    <div className="flex flex-col gap-1 text-[10px] font-body text-[#ffffff30]">
                       <span>{asset.date}</span>
                       <span>{asset.metadata}</span>
                    </div>
                 </div>

                 <Button 
                   variant="secondary" 
                   fullWidth 
                   className="mt-auto !rounded-2xl !py-3 !text-[10px] !bg-[#ffffff05] hover:!bg-primary/20 border-[#ffffff10]" 
                   clipped={false}
                 >
                   View Details
                 </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LicenseAssets;
