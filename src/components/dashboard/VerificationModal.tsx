import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

interface VerificationModalProps {
  status: 'success' | 'failure';
  fileName?: string;
  license?: string;
  owner?: string;
  onClose: () => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({
  status,
  fileName = 'Project_Genesis_v1.pdf',
  license = 'Exclusive',
  owner = 'Satoshi Nakamoto',
  onClose,
}) => {
  const navigate = useNavigate();

  if (status === 'success') {
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
          <h2 className="text-4xl font-bold font-header text-white tracking-tight">Verified</h2>
          <p className="text-[#ffffff60] font-body text-sm">
            This file matches a record on the blockchain.
          </p>
        </div>

        {/* Details Card */}
        <div className="w-full bg-[#ffffff05] border border-[#ffffff10] rounded-3xl p-8 text-left space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
          
          <div className="space-y-1">
            <p className="text-[10px] font-header tracking-[0.2em] text-[#ffffff30]">FILE NAME</p>
            <p className="text-xl font-bold font-header text-[#ffffffcf] truncate">{fileName}</p>
          </div>

          <div className="flex justify-between items-end">
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-header tracking-[0.2em] text-[#ffffff30]">LICENSE</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(111,38,255,0.5)]"></div>
                  <p className="text-sm font-body text-white">{license}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-header tracking-[0.2em] text-[#ffffff30]">OWNER</p>
                <p className="text-sm font-body text-white">{owner}</p>
              </div>
            </div>

            <Button 
              variant="primary" 
              onClick={() => {
                onClose();
                navigate('/file/1'); 
              }}
              className="!px-10"
            >
              Go to File
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
        <h2 className="text-4xl font-bold font-header text-white tracking-tight">Not Verified</h2>
        <p className="text-[#ffffff60] font-body text-sm max-w-xs">
          This file doesn't match any record on the blockchain.
        </p>
      </div>

      <div className="pt-4">
        <Button variant="outline" onClick={onClose} className="!px-12">
          Try Another File
        </Button>
      </div>
    </div>
  );
};

export default VerificationModal;
