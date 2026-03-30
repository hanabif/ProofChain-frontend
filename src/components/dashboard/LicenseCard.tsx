import React from 'react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import type { License } from '../../types/license';

interface LicenseCardProps extends License {
  onViewRequests?: () => void;
  isPublic?: boolean;
}

import { useAuthStore } from '../../store/authStore';

const LicenseCard: React.FC<LicenseCardProps> = ({
  id,
  title,
  status,
  price,
  description,
  assets = [],
  requestCount = 0,
  isPublic = false,
}) => {
  const displayPrice = !price || price === '0' || price === 0 ? 'FREE' : `${price} ETH`;
  const assetCount = assets.length;

  const navigate = useNavigate();
  const { token } = useAuthStore();

  const handleRequestLicense = () => {
    if (!token) {
      navigate(`/login?redirect=/file/${id}`);
      return;
    }
    navigate(`/dashboard/license/${id}/requests`);
  };

  return (
    <div className="bg-[#161622]/40 border border-[#ffffff08] rounded-[40px] p-8 flex flex-col h-full relative overflow-hidden group hover:border-[#ffffff15] transition-all duration-500 shadow-2xl">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] -z-10 group-hover:bg-primary/10 transition-all duration-700"></div>

      {/* Header Badges */}
      <div className="flex items-center justify-between mb-10">
        <div className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-xl text-[10px] font-header tracking-widest text-primary font-bold">
          {displayPrice}
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[9px] font-header tracking-widest ${
          (status || 'active').toLowerCase() === 'active' 
            ? 'bg-[#00ff95]/10 border-[#00ff95]/20 text-[#00ff95]' 
            : 'bg-[#ff4b4b]/10 border-[#ff4b4b]/20 text-[#ff4b4b]'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${(status || 'active').toLowerCase() === 'active' ? 'bg-[#00ff95]' : 'bg-[#ff4b4b]'} shadow-[0_0_8px_rgba(34,197,94,0.5)]`}></div>
          {(status || 'ACTIVE').toUpperCase()}
        </div>
      </div>

      {/* Title Section */}
      <div className="mb-6">
        <h3 className="text-3xl font-bold font-header tracking-tight text-white mb-4 italic uppercase line-clamp-2">
          {title}
        </h3>
        <p className="text-[#ffffff40] font-body text-xs leading-relaxed line-clamp-3 min-h-[4rem]">
          {description}
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4 mb-10 mt-auto">
        <div className="p-4 bg-[#ffffff05] border border-[#ffffff08] rounded-2xl flex flex-col gap-1">
          <span className="text-[8px] font-header tracking-widest text-[#ffffff20] uppercase">Assets Attached</span>
          <span className="text-xl font-bold font-header text-white">{assetCount}</span>
        </div>
        <div className="p-4 bg-[#ffffff05] border border-[#ffffff08] rounded-2xl flex flex-col gap-1">
          <span className="text-[8px] font-header tracking-widest text-[#ffffff20] uppercase">Requests</span>
          <span className="text-xl font-bold font-header text-white">{requestCount}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mb-6">
        {isPublic ? (
          <>
            <Button 
              variant="primary" 
              fullWidth 
              className="!rounded-2xl !py-3.5 !text-[10px]" 
              clipped={false}
              onClick={handleRequestLicense}
            >
              Request License
            </Button>
            <Button 
              variant="secondary" 
              fullWidth 
              className="!rounded-2xl !py-3.5 !text-[10px] !bg-[#ffffff05] hover:!bg-[#ffffff0a] border-[#ffffff10]" 
              clipped={false}
              onClick={() => navigate(`/file/${id}`)}
            >
              View Details
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="secondary" 
              fullWidth 
              className="!rounded-2xl !py-3.5 !text-[10px] !bg-[#ffffff05] hover:!bg-[#ffffff0a] border-[#ffffff10]" 
              clipped={false}
              onClick={() => navigate(`/dashboard/license/${id}/assets`)}
            >
              View Assets
            </Button>
            <Button 
              variant="secondary" 
              fullWidth 
              className="!rounded-2xl !py-3.5 !text-[10px] !bg-[#ffffff05] hover:!bg-[#ffffff0a] border-[#ffffff10]" 
              clipped={false}
              onClick={() => navigate(`/dashboard/license/${id}/edit`)}
            >
              Edit License
            </Button>
          </>
        )}
      </div>

      {/* Bottom Link */}
      {!isPublic && (
        <div className="text-center pt-2">
          {requestCount !== 0 ? (
            <button 
              onClick={() => navigate(`/dashboard/license/${id}/requests`)}
              className="text-[10px] font-header tracking-[0.2em] text-[#ffffff40] hover:text-primary transition-colors uppercase italic"
            >
              View Requests
            </button>
          ) : (
            <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff15] uppercase italic cursor-default">
              No Requests
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default LicenseCard;
