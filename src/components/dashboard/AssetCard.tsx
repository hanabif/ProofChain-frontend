import { FileText, Film, Image as ImageIcon, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface AssetCardProps {
  id: number | string;
  type: 'document' | 'video' | 'image';
  name: string;
  date: string;
  status?: string;
  license: string;
  price: string;
  asset?: any;
  owner?: any;
}

const AssetCard: React.FC<AssetCardProps> = ({ id, type, name, date, status, license, price, asset, owner }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/dashboard/asset/${id}`, { state: { asset, owner } });
  };

  const getIcon = () => {
    switch (type) {
      case 'video': return <Film className="w-5 h-5 text-primary" />;
      case 'image': return <ImageIcon className="w-5 h-5 text-primary" />;
      default: return <FileText className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div 
      onClick={handleNavigate}
      className="bg-[#ffffff05] border border-[#ffffff10] rounded-[32px] p-6 space-y-6 relative group hover:bg-[#ffffff08] hover:border-primary/30 transition-all duration-500 shadow-xl cursor-pointer"
    >
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-white/5">
          {getIcon()}
        </div>
        <div className={`px-3 py-1 rounded-full border text-[10px] font-header tracking-widest flex items-center gap-2 ${
          (status || 'verified').toLowerCase() === 'verified' ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-primary/10 border-primary/30 text-primary'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${(status || 'verified').toLowerCase() === 'verified' ? 'bg-green-500' : 'bg-primary'} shadow-[0_0_8px_rgba(34,197,94,0.5)]`}></div>
          {(status || 'VERIFIED').toUpperCase()}
        </div>
      </div>

      {/* Info Section */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold font-header text-white truncate group-hover:text-primary transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-2 text-[#ffffff30] text-[10px] font-header tracking-wider uppercase">
          <Calendar className="w-3 h-3" />
          {date || 'RECENT'}
        </div>
      </div>

      {/* License Section */}
      <div className="px-4 py-2 bg-primary/5 border border-primary/10 rounded-xl inline-flex items-center gap-2">
        <span className="text-[10px] font-header tracking-widest text-[#ffffff60] uppercase">{license}</span>
        <span className="text-[#ffffff20]">•</span>
        <span className="text-[10px] font-header tracking-widest text-primary font-bold">{price}</span>
      </div>
    </div>
  );
};


export default AssetCard;
