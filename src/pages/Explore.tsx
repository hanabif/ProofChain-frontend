import React, { useState } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import LicenseCard from '../components/dashboard/LicenseCard';
import { useLicenseSearch } from '../hooks/licenses/useLicenseSearch';
import { Button } from '../components/ui/Button';

interface ExploreProps {
  isDashboard?: boolean;
}

const Explore: React.FC<ExploreProps> = ({ isDashboard = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [page, setPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const [filters, setFilters] = useState({
    type: '',
    min_price: undefined as number | undefined,
    max_price: undefined as number | undefined,
    sort: 'newest'
  });

  const { data, isLoading, isError, refetch } = useLicenseSearch({
    q: submittedQuery,
    page,
    page_size: 12,
    ...filters
  });

  let licenses = data?.results || [];

  // Enforce functional local sorting and filtering just in case the backend query ignores params
  if (filters.sort) {
    licenses = [...licenses].sort((a, b) => {
      if (filters.sort === 'price_asc') return Number(a.price || 0) - Number(b.price || 0);
      if (filters.sort === 'price_desc') return Number(b.price || 0) - Number(a.price || 0);
      if (filters.sort === 'newest') return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      if (filters.sort === 'oldest') return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
      return 0;
    });
  }

  if (filters.type) {
    licenses = licenses.filter(l => l.type === filters.type);
  }
  if (filters.min_price !== undefined) {
    licenses = licenses.filter(l => Number(l.price || 0) >= filters.min_price!);
  }
  if (filters.max_price !== undefined) {
    licenses = licenses.filter(l => Number(l.price || 0) <= filters.max_price!);
  }

  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / 12);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSubmittedQuery(searchQuery);
  };

  return (
    <div className={`min-h-screen text-white relative overflow-hidden ${
      isDashboard ? 'p-8 lg:p-12' : 'bg-[#0B0B14] pt-40 pb-32 px-6 md:px-12 lg:px-24'
    }`}>
      
      {/* GLOBAL BACKGROUND HEX GRID overlay - Only show on public page */}
      {!isDashboard && (
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] -z-0">
          <div className="absolute inset-0 bg-[url('/assets/images/Group.svg')] bg-cover" />
        </div>
      )}

      {/* Header Section */}
      <div className={`flex flex-col md:flex-row md:items-start justify-between gap-8 relative z-10 ${
        isDashboard ? 'mb-12' : 'mb-16'
      }`}>
        <div>
          <h1 className={`${
            isDashboard ? 'text-4xl md:text-5xl' : 'text-5xl md:text-6xl'
          } font-header font-black text-white mb-6 tracking-tighter uppercase italic`}>
            Explore
          </h1>
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
      <div className={`flex flex-col lg:flex-row items-center gap-6 w-full relative z-10 ${
        isDashboard ? 'mb-12' : 'mb-16'
      }`}>
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
        <div className="flex items-center gap-4 w-full lg:w-auto overflow-visible rounded-full relative z-50">
          
          {/* SORT BY */}
          <div className="relative">
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')}
              className="flex items-center justify-between gap-4 bg-[#11111B] border border-white/5 rounded-full py-4 px-6 text-sm font-body text-slate-300 hover:bg-white/10 transition-colors whitespace-nowrap shadow-lg uppercase italic font-bold tracking-widest text-[10px]"
            >
              Sort By {filters.sort && `: ${filters.sort.replace('_', ' ')}`}
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>
            {activeDropdown === 'sort' && (
              <div className="absolute top-full mt-2 left-0 w-48 bg-[#11111B] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 flex flex-col gap-1">
                {[
                  { label: 'Newest First', value: 'newest' },
                  { label: 'Oldest First', value: 'oldest' },
                  { label: 'Price: Low to High', value: 'price_asc' },
                  { label: 'Price: High to Low', value: 'price_desc' }
                ].map(opt => (
                  <button 
                    key={opt.value} 
                    onClick={() => { setFilters(f => ({ ...f, sort: opt.value })); setActiveDropdown(null); setPage(1); }}
                    className={`text-left px-4 py-3 rounded-xl text-xs uppercase italic tracking-widest font-header hover:bg-white/5 ${filters.sort === opt.value ? 'text-primary bg-primary/10' : 'text-slate-400'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* TYPE */}
          <div className="relative">
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
              className="flex items-center justify-between gap-4 bg-[#11111B] border border-white/5 rounded-full py-4 px-6 text-sm font-body text-slate-300 hover:bg-white/10 transition-colors whitespace-nowrap shadow-lg uppercase italic font-bold tracking-widest text-[10px]"
            >
              Type {filters.type && `: ${filters.type.replace('_', ' ')}`}
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>
            {activeDropdown === 'type' && (
              <div className="absolute top-full mt-2 left-0 w-48 bg-[#11111B] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 flex flex-col gap-1">
                {[
                  { label: 'All Types', value: '' },
                  { label: 'Exclusive', value: 'EXCLUSIVE' },
                  { label: 'Non-Exclusive', value: 'NON_EXCLUSIVE' },
                  { label: 'Personal', value: 'PERSONAL' }
                ].map(opt => (
                  <button 
                    key={opt.label} 
                    onClick={() => { setFilters(f => ({ ...f, type: opt.value })); setActiveDropdown(null); setPage(1); }}
                    className={`text-left px-4 py-3 rounded-xl text-xs uppercase italic tracking-widest font-header hover:bg-white/5 ${filters.type === opt.value ? 'text-primary bg-primary/10' : 'text-slate-400'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PRICE RANGE */}
          <div className="relative">
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'price' ? null : 'price')}
              className="flex items-center justify-between gap-4 bg-[#11111B] border border-white/5 rounded-full py-4 px-6 text-sm font-body text-slate-300 hover:bg-white/10 transition-colors whitespace-nowrap shadow-lg uppercase italic font-bold tracking-widest text-[10px]"
            >
              Price range
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>
            {activeDropdown === 'price' && (
              <div className="absolute top-full mt-2 right-0 w-64 bg-[#11111B] border border-white/10 rounded-2xl shadow-2xl p-4 z-50 flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="space-y-2 flex-1">
                    <label className="text-[9px] uppercase tracking-widest text-slate-500 font-header">Min (ETH)</label>
                    <input 
                      type="number" 
                      placeholder="0.0" 
                      value={filters.min_price || ''}
                      onChange={(e) => {
                        const val = e.target.value ? Number(e.target.value) : undefined;
                        setFilters(f => ({ ...f, min_price: val }));
                        setPage(1);
                      }}
                      className="w-full bg-[#1A112B] border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary/50"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <label className="text-[9px] uppercase tracking-widest text-slate-500 font-header">Max (ETH)</label>
                    <input 
                      type="number" 
                      placeholder="100.0" 
                      value={filters.max_price || ''}
                      onChange={(e) => {
                        const val = e.target.value ? Number(e.target.value) : undefined;
                        setFilters(f => ({ ...f, max_price: val }));
                        setPage(1);
                      }}
                      className="w-full bg-[#1A112B] border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary/50"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2 border-t border-white/5 pt-4">
                  <button 
                    onClick={() => { setFilters(f => ({ ...f, min_price: undefined, max_price: undefined })); setPage(1); }}
                    className="text-[10px] uppercase font-header tracking-widest text-slate-500 hover:text-white"
                  >
                    Clear Filter
                  </button>
                  <Button variant="primary" size="sm" onClick={() => setActiveDropdown(null)}>Apply</Button>
                </div>
              </div>
            )}
          </div>

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
              <LicenseCard key={license.id} {...license} isPublic={true} isDashboard={isDashboard} />
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

      {/* Decorative dashed circle from bottom right - Only on public page */}
      {!isDashboard && (
        <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] pointer-events-none opacity-20 -z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full h-full border border-dashed border-slate-500 rounded-full" />
        </div>
      )}
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
