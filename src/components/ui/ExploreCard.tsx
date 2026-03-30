import React from 'react';
import { CheckCircle2, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ExploreCardProps {
  asset: {
    id?: string | number;
    title: string;
    desc: string;
    owner: string;
    price: string | number;
  };
}

export const ExploreCard: React.FC<ExploreCardProps> = ({ asset }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/file/${asset.id || 1}`, { state: { asset, owner: { username: asset.owner } } })}
      className="flex flex-col bg-[#11111B]/80 backdrop-blur-md border border-white/5 rounded-[32px] p-7 transition-all duration-300 hover:bg-[#11111B] hover:border-white/10 hover:-translate-y-2 shadow-xl group relative overflow-hidden z-20 cursor-pointer"
    >
      
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-[#1A2E22] border border-green-500/20 px-3 py-1.5 rounded-full w-fit mb-6">
        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
        <span className="text-[9px] font-black text-green-400 tracking-widest uppercase">Verified Asset</span>
      </div>

      {/* Title & Desc */}
      <h3 className="text-xl font-header font-bold text-white mb-3 tracking-wide truncate group-hover:text-primary transition-colors">{asset.title}</h3>
      <p className="text-[13px] font-body text-slate-400 leading-relaxed mb-6 line-clamp-2 h-[42px] font-light">{asset.desc}</p>

      {/* Owner */}
      <div className="flex items-center gap-2 mb-6 bg-white/[0.02] p-2 rounded-full w-fit pr-4 border border-white/5">
        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
          <User className="w-3 h-3 text-slate-400" />
        </div>
        <span className="text-[10px] font-mono text-slate-400">{asset.owner}</span>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/5 my-2" />

      {/* Footer */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex flex-col gap-1">
          <span className="text-[8px] uppercase tracking-[0.2em] text-slate-500 font-body font-semibold">License Price</span>
          <div className="text-xl font-header font-black text-white tracking-widest flex items-baseline gap-1.5">
            {asset.price} <span className="text-[11px] font-bold text-slate-400 tracking-widest">ETH</span>
          </div>
        </div>
        <button className="px-5 py-2.5 rounded-full border border-white/10 text-[10px] font-header font-bold uppercase tracking-widest text-slate-300 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all bg-white/[0.02]">
          View Details
        </button>
      </div>
    </div>
  );
};
