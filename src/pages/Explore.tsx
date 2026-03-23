import React from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ExploreCard } from '../components/ui/ExploreCard';

// Mock Data
const MOCK_ASSETS = [
  { id: 1, title: "NeuralMesh_v4...", desc: "High-fidelity topological data structure for autonomous...", owner: "0x71C...4e8B", price: "1.45" },
  { id: 2, title: "Quantum_Encr...", desc: "Post-quantum secure cryptographic primitive for...", owner: "0x2A9...fF31", price: "3.20" },
  { id: 3, title: "Spectra_Audio...", desc: "Spatial audio synthesis library optimized for immersive metaverse...", owner: "0xde0...8821", price: "0.85" },
  { id: 4, title: "BlockSchema_l...", desc: "Standardized financial ledger schema for multi-chain settlement...", owner: "0x883...cc91", price: "5.12" },
  { id: 5, title: "Aether_Logic_...", desc: "Optimized logic gate configurations for high-frequency algorithmic...", owner: "0x341...112c", price: "2.10" },
  { id: 6, title: "HyperStream_...", desc: "Kernel-level optimization assets for distributed operating systems.", owner: "0x992...dD10", price: "1.88" },
  { id: 7, title: "SecureEnclave...", desc: "Hardware abstraction layer for trusted execution environment...", owner: "0xbb1...4a32", price: "6.40" },
  { id: 8, title: "GeoScale_Data...", desc: "Anonymized global mobility data for sustainable urban planning AI...", owner: "0xff3...99ee", price: "0.95" }
];

const Explore: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0B14] text-white pt-40 pb-32 px-6 md:px-12 lg:px-24">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-16">
        <div>
          <h1 className="text-5xl md:text-6xl font-header font-black text-white mb-6 tracking-tighter">Explore</h1>
          <p className="text-slate-400 font-body text-sm max-w-lg leading-relaxed font-light">
            Discover verified digital assets available for licensing. Secure your intellectual property on-chain.
          </p>
        </div>
        
        {/* Verified Assets Badge */}
        <div className="flex items-center gap-3 bg-[#11111B]/80 backdrop-blur-md border border-white/5 py-3 px-6 md:py-4 md:px-8 rounded-2xl h-fit shadow-xl mt-2">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_12px_#6f26ff]" />
          <span className="font-header font-black text-lg md:text-xl text-white tracking-widest whitespace-nowrap">
            1,240 <span className="text-[9px] md:text-[10px] text-slate-500 tracking-widest ml-1 md:ml-2 font-body font-normal">VERIFIED ASSETS</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-center gap-6 mb-16 w-full">
        {/* Search Input */}
        <div className="relative flex-grow w-full lg:w-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search by title, keyword, or hash..." 
            className="w-full bg-[#11111B] border border-white/5 rounded-full py-4 pl-14 pr-6 text-sm font-body text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-colors shadow-lg"
          />
        </div>
        
        {/* Dropdowns */}
        <div className="flex items-center gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 hide-scrollbar rounded-full">
          {['File Type', 'Price Range', 'Sort By'].map((filter) => (
            <button key={filter} className="flex items-center justify-between gap-8 bg-[#11111B] border border-white/5 rounded-full py-4 px-8 text-sm font-body text-slate-300 hover:bg-white/10 transition-colors whitespace-nowrap shadow-lg">
              {filter}
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 relative">
        {MOCK_ASSETS.map((asset) => (
          <ExploreCard key={asset.id} asset={asset} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3 relative z-10 w-full">
         <PageButton icon={<ChevronLeft className="w-4 h-4" />} />
         <PageButton active text="1" />
         <PageButton text="2" />
         <PageButton text="3" />
         <span className="text-slate-600 mx-1 md:mx-2 tracking-widest">...</span>
         <PageButton text="14" />
         <PageButton icon={<ChevronRight className="w-4 h-4" />} />
      </div>

      {/* Decorative dashed circle from bottom right */}
      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] pointer-events-none opacity-20 -z-0">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full h-full border border-dashed border-slate-500 rounded-full" />
      </div>
    </div>
  );
};

// --- Subcomponents ---

const PageButton = ({ text, active, icon }: { text?: string, active?: boolean, icon?: React.ReactNode }) => {
  return (
    <button className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xs font-body transition-colors duration-300 ${
      active 
        ? 'bg-primary/20 text-primary border border-primary/50 shadow-[0_0_15px_rgba(111,38,255,0.2)]' 
        : 'bg-[#11111B] border border-white/5 text-slate-400 hover:text-white hover:border-white/20 shadow-lg'
    }`}>
      {text || icon}
    </button>
  );
};



export default Explore;
