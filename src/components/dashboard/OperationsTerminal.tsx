import React from 'react';
import { FileText, ShieldCheck } from 'lucide-react';

const OperationsTerminal: React.FC = () => {
  return (
    <div className="p-8 bg-[#ffffff0a] border border-[#ffffff10] rounded-[24px] space-y-8 relative overflow-hidden group shadow-2xl">
      <div className="relative z-10">
        <h4 className="text-xs font-header tracking-[0.2em] text-[#ffffff40] mb-6">OPERATIONS TERMINAL</h4>
        
        <div className="space-y-4">
          <button className="w-full relative group cursor-pointer overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#7B3FE4] to-[#B066FE] transition-transform duration-500 group-hover:scale-x-110"></div>
            <div className="relative px-6 py-4 flex items-center justify-center gap-3">
              <FileText className="w-5 h-5 text-white" />
              <span className="text-sm font-bold font-header text-white tracking-wider">Create license</span>
            </div>
            <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-[800ms] ease-out"></div>
          </button>

          <button className="w-full relative group cursor-pointer overflow-hidden rounded-2xl border border-[#ffffff15] hover:border-primary/50 transition-colors">
            <div className="absolute inset-0 bg-[#ffffff05] transition-colors group-hover:bg-primary/10"></div>
            <div className="relative px-6 py-4 flex items-center justify-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#ffffff60] group-hover:text-white" />
              <span className="text-sm font-bold font-header text-[#ffffff80] group-hover:text-white tracking-wider">Verify Document</span>
            </div>
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-500"></div>
          </button>
        </div>
      </div>

      {/* Decoration circle */}
      <div className="absolute top-1/2 -right-12 w-48 h-48 border border-white/5 rounded-full filter blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
    </div>
  );
};

export default OperationsTerminal;
