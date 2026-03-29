import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

interface VerificationModalProps {
  status: 'success' | 'failure';
  data?: any;
  onClose: () => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({
  status,
  data,
  onClose,
}) => {
  const navigate = useNavigate();

  if (status === 'success' && data?.asset) {
    const asset = data.asset;
    const license = data.license;
    const creator = data.creator;
    const owner = data.current_owner;

    return (
      <div className="flex flex-col items-center text-center space-y-6 py-4">
        {/* Status Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="relative w-24 h-24 bg-[#1a1a2e] rounded-full flex items-center justify-center border-2 border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-4xl font-bold font-header text-white tracking-tight uppercase italic underline decoration-green-500/30">Verified</h2>
          <p className="text-[#ffffff60] font-body text-sm lowercase tracking-widest italic">
            This artifact matches a record on the blockchain.
          </p>
        </div>

        {/* Details Card */}
        <div className="w-full bg-[#ffffff05] border border-[#ffffff10] rounded-3xl p-8 text-left space-y-6 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-[10px] font-header tracking-[0.2em] text-[#ffffff30] uppercase">Asset Name</p>
                <p className="text-xl font-bold font-header text-white truncate">{asset.title || asset.file.split('/').pop()}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-header tracking-[0.2em] text-[#ffffff30] uppercase">License Type</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(111,38,255,0.5)]"></div>
                  <p className="text-sm font-body text-white uppercase italic">{license?.type || 'STANDARD'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-[10px] font-header tracking-[0.2em] text-[#ffffff30] uppercase">Owner</p>
                <p className="text-sm font-body text-white italic">{owner?.username || creator?.username || 'Unknown'}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-header tracking-[0.2em] text-[#ffffff30] uppercase">Asset ID</p>
                <p className="text-[9px] font-mono text-[#ffffff20] break-all">{asset.id}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button 
              variant="primary" 
              onClick={() => {
                onClose();
                navigate(`/dashboard/asset/${asset.id}`, { state: { asset, license, owner, creator } }); 
              }}
              className="!px-10 italic uppercase font-header tracking-widest !text-[10px]"
            >
              Examine Artifact
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center space-y-6 py-8">
      {/* Status Icon */}
      <div className="relative">
        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="relative w-24 h-24 bg-[#1a1a2e] rounded-full flex items-center justify-center border-2 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
          <XCircle className="w-12 h-12 text-red-500" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-4xl font-bold font-header text-white tracking-tight uppercase italic underline decoration-red-500/30">Not Verified</h2>
        <p className="text-[#ffffff60] font-body text-sm max-w-xs lowercase tracking-widest italic">
          {data?.message || "This file doesn't match any registered record on the blockchain."}
        </p>
      </div>

      <div className="pt-4">
        <Button variant="outline" onClick={onClose} className="!px-12 italic uppercase font-header tracking-widest !text-[10px]">
          Scan Another
        </Button>
      </div>
    </div>
  );
};

export default VerificationModal;
