import React from 'react';
import { FileText, Film, Image as ImageIcon, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

interface AssetCardProps {
  id: number | string;
  type: 'document' | 'video' | 'image';
  name: string;
  date: string;
  status: 'verified' | 'pending';
  license: string;
  price: string;
}

const AssetCard: React.FC<AssetCardProps> = ({ id, type, name, date, status, license, price }) => {
  const navigate = useNavigate();

  const getIcon = () => {
    switch (type) {
      case 'video': return <Film className="w-5 h-5 text-primary" />;
      case 'image': return <ImageIcon className="w-5 h-5 text-primary" />;
      default: return <FileText className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="bg-[#ffffff05] border border-[#ffffff10] rounded-[32px] p-6 space-y-6 relative group hover:bg-[#ffffff08] hover:border-primary/30 transition-all duration-500 shadow-xl">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-white/5">
          {getIcon()}
        </div>
        <div className={`px-3 py-1 rounded-full border text-[10px] font-header tracking-widest flex items-center gap-2 ${
          status === 'verified' ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-primary/10 border-primary/30 text-primary'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${status === 'verified' ? 'bg-green-500' : 'bg-primary'} shadow-[0_0_8px_rgba(34,197,94,0.5)]`}></div>
          {status.toUpperCase()}
        </div>
      </div>

      {/* Info Section */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold font-header text-white truncate group-hover:text-primary transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-2 text-[#ffffff30] text-[10px] font-header tracking-wider">
          <Calendar className="w-3 h-3" />
          {date.toUpperCase()}
        </div>
      </div>

      {/* License Section */}
      <div className="px-4 py-2 bg-primary/5 border border-primary/10 rounded-xl inline-flex items-center gap-2">
        <span className="text-[10px] font-header tracking-widest text-[#ffffff60] uppercase">{license}</span>
        <span className="text-[#ffffff20]">•</span>
        <span className="text-[10px] font-header tracking-widest text-primary font-bold">{price}</span>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-3">
        <Button 
          variant="secondary" 
          fullWidth 
          className="!rounded-2xl !py-3 !text-xs font-header tracking-widest transition-all duration-300 hover:shadow-[0_0_20px_rgba(111,38,255,0.2)]" 
          clipped={false}
          onClick={() => navigate(`/dashboard/asset/${id}`)}
        >
          VIEW DETAILS
        </Button>
      </div>
    </div>
  );
};


export default AssetCard;
