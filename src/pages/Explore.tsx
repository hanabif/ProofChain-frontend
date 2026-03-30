import React, { useState } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import LicenseCard from '../components/dashboard/LicenseCard';
import { useLicenseSearch } from '../hooks/licenses/useLicenseSearch';
import { Button } from '../components/ui/Button';

const Explore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [filters] = useState({
    type: '',
    min_price: undefined as number | undefined,
    max_price: undefined as number | undefined,
    sort: 'newest'
  });

  const { data, isLoading, isError, refetch } = useLicenseSearch({
    q: searchQuery,
    page,
    page_size: 12,
    ...filters
  });

  const licenses = data?.results || [];
  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / 12);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    refetch();
  };

  return (
    <div className="min-h-screen bg-[#0B0B14] text-white pt-40 pb-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      
      {/* GLOBAL BACKGROUND HEX GRID overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] -z-0">
        <div className="absolute inset-0 bg-[url('/assets/images/Group.svg')] bg-cover" />
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-16 relative z-10">
        <div>
          <h1 className="text-5xl md:text-6xl font-header font-black text-white mb-6 tracking-tighter uppercase italic">Explore</h1>
          <p className="text-slate-400 font-body text-sm max-w-lg leading-relaxed font-light italic">
            Discover verified digital licenses for high-value assets. Secure your intellectual property on the immutable ledger.
          </p>
        </div>
        
        {/* Verified Assets Badge */}
        <div className="flex items-center gap-3 bg-[#11111B]/80 backdrop-blur-md border border-white/5 py-3 px-6 md:py-4 md:px-8 rounded-2xl h-fit shadow-xl mt-2">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_12px_#6f26ff]" />
          <span className="font-header font-black text-lg md:text-xl text-white tracking-widest whitespace-nowrap italic">
            {totalCount.toLocaleString()} <span className="text-[9px] md:text-[10px] text-slate-500 tracking-widest ml-1 md:ml-2 font-body font-normal not-italic">VERIFIED LICENSES</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-center gap-6 mb-16 w-full relative z-10">
        {/* Search Input */}
        <form onSubmit={handleSearch} className="relative flex-grow w-full lg:w-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search by title, keyword, or hash..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#11111B] border border-white/5 rounded-full py-4 pl-14 pr-6 text-sm font-body text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-colors shadow-lg"
          />
        </form>
        
        {/* Dropdowns */}
        <div className="flex items-center gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 hide-scrollbar rounded-full">
          {['Type', 'Price Range', 'Sort By'].map((filter) => (
            <button key={filter} className="flex items-center justify-between gap-8 bg-[#11111B] border border-white/5 rounded-full py-4 px-8 text-sm font-body text-slate-300 hover:bg-white/10 transition-colors whitespace-nowrap shadow-lg uppercase italic font-bold tracking-widest text-[10px]">
              {filter}
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Asset Grid */}
      <div className="relative z-10 min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-[#ffffff20] font-header tracking-widest text-xs uppercase italic">Syncing global register...</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <p className="text-red-400 font-header tracking-widest text-xs uppercase italic text-center">Protocol failure detected.</p>
            <Button variant="outline" onClick={() => refetch()} clipped={false}>Retry sync</Button>
          </div>
        ) : licenses.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-white/10 rounded-[40px]">
            <p className="text-[#ffffff20] font-header tracking-[0.2em] italic uppercase">No licenses matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24">
            {licenses.map((license) => (
              <LicenseCard key={license.id} {...license} isPublic={true} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 relative z-10 w-full mt-12">
          <PageButton 
            icon={<ChevronLeft className="w-4 h-4" />} 
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          />
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
            <PageButton 
              key={i + 1}
              active={page === i + 1} 
              text={(i + 1).toString()} 
              onClick={() => setPage(i + 1)}
            />
          ))}
          {totalPages > 5 && <span className="text-slate-600 mx-1 md:mx-2 tracking-widest">...</span>}
          <PageButton 
            icon={<ChevronRight className="w-4 h-4" />} 
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          />
        </div>
      )}

      {/* Decorative dashed circle from bottom right */}
      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] pointer-events-none opacity-20 -z-0">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full h-full border border-dashed border-slate-500 rounded-full" />
      </div>
    </div>
  );
};

// --- Subcomponents ---

const PageButton = ({ text, active, icon, onClick, disabled }: { text?: string, active?: boolean, icon?: React.ReactNode, onClick?: () => void, disabled?: boolean }) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xs font-body transition-colors duration-300 disabled:opacity-20 disabled:cursor-not-allowed ${
        active 
          ? 'bg-primary text-white shadow-[0_0_20px_rgba(111,38,255,0.4)] border border-primary/50' 
          : 'bg-[#11111B] border border-white/5 text-slate-400 hover:text-white hover:border-white/20 shadow-lg'
      }`}
    >
      {text || icon}
    </button>
  );
};

export default Explore;
