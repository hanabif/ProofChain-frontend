import React from 'react';
import { Search, Bell } from 'lucide-react';

const DashboardNavbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-6 bg-transparent border-b border-[#ffffff05] backdrop-blur-sm sticky top-0 z-40">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#ffffff40] group-focus-within:text-primary transition-colors duration-300" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-3 bg-[#ffffff0a] border border-[#ffffff10] rounded-2xl text-white placeholder-[#ffffff40] focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:bg-[#ffffff0f] transition-all duration-300 font-header text-sm tracking-wider"
            placeholder="Search hash..."
          />
        </div>
      </div>

      <div className="flex items-center gap-6 ml-6">
        <button className="relative p-2.5 rounded-xl bg-[#ffffff0a] border border-[#ffffff10] hover:bg-[#ffffff15] hover:border-[#ffffff20] transition-all duration-300 group">
          <Bell className="h-6 w-6 text-[#ffffff60] group-hover:text-white transition-colors duration-300" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full border-2 border-[#11111b] animate-sparkle"></span>
        </button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
