import React from 'react';

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  iconBgColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, iconBgColor = 'primary' }) => {
  return (
    <div className="relative overflow-hidden p-8 bg-[#ffffff0a] border border-[#ffffff10] rounded-[24px] group hover:bg-[#ffffff0f] transition-all duration-500 shadow-2xl">
      {/* Background Accent Graphics */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rotate-45 transform translate-x-12 -translate-y-12 opacity-20 filter blur-2xl group-hover:opacity-40 transition-opacity"></div>
      
      <div className="flex flex-col gap-6 relative z-10">
        <div className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-${iconBgColor}/20 border border-${iconBgColor}/30 shadow-[0_0_15px_rgba(111,38,255,0.2)]`}>
          <img src={icon} alt={label} className="w-6 h-6" />
        </div>
        
        <div className="space-y-2">
          <p className="text-xs font-header tracking-[0.2em] text-[#ffffff40] group-hover:text-[#ffffff60] transition-colors">
            {label}
          </p>
          <h3 className="text-4xl font-bold font-header text-white group-hover:scale-105 transition-transform origin-left">
            {value}
          </h3>
        </div>
      </div>

      {/* Modern Diamond Decoration */}
      <div className="absolute -bottom-8 -right-8 w-24 h-24 border border-primary/20 rotate-45 group-hover:border-primary/40 transition-colors"></div>
    </div>
  );
};

export default StatCard;
