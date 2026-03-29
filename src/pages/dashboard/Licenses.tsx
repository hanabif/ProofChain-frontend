import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import LicenseCard from '../../components/dashboard/LicenseCard';
import { Button } from '../../components/ui/Button';
import { Search, Plus, Loader2 } from 'lucide-react';
import { useLicenses } from '../../hooks/licenses/useLicenses';

const Licenses: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: licenses, isLoading, isError, refetch } = useLicenses();

  const filterOptions = ['All', 'Personal', 'Exclusive', 'Non-exclusive'];
  const filterMapping: Record<string, string> = {
    'Personal': 'PERSONAL',
    'Exclusive': 'EXCLUSIVE',
    'Non-exclusive': 'NON_EXCLUSIVE'
  };

  const filteredLicenses = licenses?.filter(license => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      license.title.toLowerCase().includes(searchLower) || 
      license.description.toLowerCase().includes(searchLower);
    
    const matchesFilter = activeFilter === 'All' || 
      license.type === filterMapping[activeFilter] ||
      license.type === activeFilter.toUpperCase(); // Fallback
      
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-white overflow-hidden selection:bg-primary/30">
      <Sidebar />

      <main className="flex-1 flex flex-col relative z-20">
        <DashboardNavbar />

        <div className="p-8 lg:p-12 overflow-y-auto max-h-[calc(100vh-88px)]">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold font-header tracking-tighter text-white">
                Licenses
              </h1>
              <p className="text-[#ffffff40] font-body text-sm tracking-wide max-w-xl">
                Define and manage how your files are used and monetized within the ProofChain ecosystem.
              </p>
            </div>

            <div className="relative group overflow-hidden rounded-[20px]">
              <Button 
                variant="primary" 
                className="!py-4 !px-10 !text-sm italic font-header tracking-[0.1em] relative z-10" 
                clipped={true}
                leftIcon={<Plus className="w-5 h-5 mr-2" />}
                onClick={() => navigate('/dashboard/create-license')}
              >
                Create license
              </Button>
              <div className="absolute top-0 right-0 w-16 h-full bg-white/10 skew-x-[-20deg] translate-x-8"></div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
            <div className="flex-1 max-w-xl relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ffffff20] group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search licenses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#ffffff05] border border-[#ffffff08] rounded-[24px] py-4 pl-16 pr-6 text-sm font-body focus:outline-none focus:border-primary/50 focus:bg-[#ffffff0a] transition-all"
              />
            </div>

            <div className="flex p-1.5 bg-[#ffffff05] border border-[#ffffff08] rounded-2xl">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setActiveFilter(option)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-header tracking-widest transition-all duration-300 ${
                    activeFilter === option 
                      ? 'bg-primary text-white shadow-[0_0_15px_rgba(111,38,255,0.3)]' 
                      : 'text-[#ffffff40] hover:text-white'
                  }`}
                >
                  {option.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
            {isLoading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-[#ffffff40] font-header tracking-widest text-xs uppercase italic">Loading licenses...</p>
              </div>
            ) : isError ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 space-y-6">
                <p className="text-red-400 font-header tracking-widest text-xs uppercase italic text-center">Failed to load licenses. Please try again.</p>
                <Button variant="outline" onClick={() => refetch()} clipped={false}>Retry</Button>
              </div>
            ) : filteredLicenses?.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 space-y-4">
                <p className="text-[#ffffff40] font-header tracking-widest text-xs uppercase italic text-center">No licenses found matching your criteria.</p>
              </div>
            ) : (
              filteredLicenses?.map((license) => (
                <LicenseCard 
                  key={license.id} 
                  {...license} 
                />
              ))
            )}
            
            {/* Add New Placeholder matching MyAssets style but for licenses */}
            <div className="bg-transparent border-2 border-dashed border-[#ffffff08] rounded-[40px] flex flex-col items-center justify-center p-12 group cursor-pointer hover:border-primary/30 hover:bg-primary/5 transition-all duration-500">
               <div className="mb-6">
                 <Button variant="outline" className="!rounded-full !p-6 group-hover:bg-primary/20 group-hover:border-primary/50" clipped={false}>
                   <Plus className="w-10 h-10 text-primary" />
                 </Button>
               </div>
               <span className="text-[12px] font-header tracking-[0.3em] text-[#ffffff15] group-hover:text-primary transition-colors uppercase italic">New License Tier</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Licenses;
