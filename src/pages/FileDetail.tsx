import React, { useState } from 'react';
import { FileText, CheckCircle2, Copy, Lock, Link, Database, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const FileDetail: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestDescription, setRequestDescription] = useState('');

  const handleSendRequest = () => {
    // In a real app, this would send the request to the backend
    console.log('Sending license request:', requestDescription);
    setIsModalOpen(false);
    setRequestDescription('');
    // Optionally show a success toast here
  };

  return (
    <div className="min-h-screen bg-[#0B0B14] text-white pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Column */}
        <div className="lg:col-span-2 flex flex-col">
          
          {/* Preview Box */}
          <div className="w-full h-[400px] md:h-[500px] bg-[#11111B]/80 backdrop-blur-md border border-white/5 rounded-[32px] relative flex flex-col items-center justify-center overflow-hidden shadow-2xl group">
            {/* Hexagonal/Circular background decoration */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000">
              <div className="w-[800px] h-[800px] border border-white rounded-full flex items-center justify-center">
                <div className="w-[600px] h-[600px] border border-white rounded-full flex items-center justify-center bg-primary/5">
                  <div className="w-[400px] h-[400px] border border-white rounded-full bg-primary/5" />
                </div>
              </div>
            </div>

            <FileText className="w-20 h-20 text-slate-600 mb-8 relative z-10" />
            <h3 className="text-[10px] md:text-xs font-header font-bold uppercase tracking-[0.4em] text-slate-500 relative z-10">
              High Fidelity Preview Encrypted
            </h3>
          </div>

          {/* Title & Description */}
          <div className="flex flex-col mt-10 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-4">
              <h1 className="text-3xl md:text-4xl lg:text-[42px] font-header font-black text-white tracking-tighter truncate">
                Quantum_Core_Protocol_v2.pdf
              </h1>
              <div className="inline-flex items-center gap-2 bg-[#1A2E22] border border-green-500/20 px-4 py-2 rounded-full w-fit whitespace-nowrap">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-[10px] font-black text-green-400 tracking-widest uppercase">Verified</span>
              </div>
            </div>
            <p className="text-sm font-body text-slate-400 leading-relaxed max-w-3xl font-light">
              A comprehensive architectural framework for next-generation consensus mechanisms, detailing the intersection of zero-knowledge proofs and hardware-accelerated validation.
            </p>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <InfoBox label="Creator Wallet" value="0x71C...492A" copyable />
            <InfoBox label="File Type" value="PDF / DOCUMENT" />
            <InfoBox label="Date Registered" value="OCT 24, 2024 - 14:02 UTC" />
            <InfoBox label="File Hash (SHA-256)" value="e3b0c44298fc1...d96333" copyable />
          </div>

        </div>

        {/* Sidebar Column */}
        <div className="flex flex-col gap-6">
          
          {/* License Card */}
          <div className="bg-[#11111B] border border-white/5 rounded-[32px] p-8 md:p-10 shadow-2xl flex flex-col">
            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-[#B066FE] font-bold font-header mb-6">Standard Commercial License</span>
            <div className="flex items-baseline gap-3 mb-10">
              <span className="text-5xl font-header font-black text-white tracking-tighter">0.45 <span className="text-xl font-bold tracking-widest text-[#B066FE]">ETH</span></span>
              <span className="text-[11px] font-body text-slate-500 tracking-wider">≈ $1,142.80</span>
            </div>

            <ul className="space-y-4 mb-12 flex-grow">
              <LicenseFeature text="Access to full high-fidelity document source" />
              <LicenseFeature text="Blockchain-recorded permanent license" />
              <LicenseFeature text="Verified proof of authenticity for legal use" />
            </ul>

            <Button 
              variant="primary" 
              size="lg" 
              fullWidth 
              className="py-5 text-sm font-black tracking-widest shadow-[0_0_20px_rgba(111,38,255,0.4)] hover:shadow-[0_0_30px_rgba(111,38,255,0.6)]"
              onClick={() => setIsModalOpen(true)}
            >
              Request License
            </Button>
            
            <div className="flex flex-col items-center mt-6 gap-2">
              <div className="flex items-center justify-center gap-2 text-slate-500 hover:text-white transition-colors cursor-pointer group">
                <Lock className="w-3 h-3 group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
                <span className="text-[8px] font-header font-bold uppercase tracking-widest">Secure Payment via Blockchain</span>
              </div>
            </div>
          </div>

          {/* Verification Link Button */}
          <button className="w-full flex items-center justify-center gap-3 bg-[#11111B]/40 border border-white/5 rounded-full py-5 text-[10px] font-header font-bold uppercase tracking-widest text-slate-300 hover:text-white hover:bg-white/10 transition-colors shadow-lg">
            <Link className="w-4 h-4 text-slate-400" />
            Copy Verification Link
          </button>

          {/* Storage Box */}
          <div className="bg-[#11111B]/60 backdrop-blur-md border border-white/5 rounded-[32px] p-8 flex flex-col shadow-xl">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center border border-white/10 shrink-0 shadow-[inset_0_0_15px_rgba(255,255,255,0.02)]">
                 <Database className="w-5 h-5 text-slate-400" />
               </div>
               <div className="flex flex-col gap-1">
                  <h4 className="text-[10px] font-header font-black text-white uppercase tracking-[0.2em] leading-none mt-1">Immutable Storage</h4>
                  <span className="text-[9px] font-body text-slate-500 leading-none tracking-wide">Stored via IPFS pinning protocol</span>
               </div>
            </div>
            
            <div className="border-t border-white/5 pt-5 w-full">
              <p className="text-[11px] font-body text-slate-500 leading-relaxed font-light italic">
                "ProofChain ensures that every document remains tamper-proof from the moment of registration, creating a permanent audit trail for intellectual property."
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* License Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0B0B14] border border-white/5 rounded-[32px] p-8 md:p-12 relative shadow-[0_0_50px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors p-2"
            >
              <X className="w-7 h-7" />
            </button>

            <h2 className="text-sm md:text-base font-header font-black text-[#B066FE] uppercase tracking-[0.2em] mb-8 pr-12">
              Describe how you plan to use this license
            </h2>

            <div className="relative group">
              <textarea
                value={requestDescription}
                onChange={(e) => setRequestDescription(e.target.value)}
                placeholder="I plan to user this license ...."
                className="w-full h-64 bg-[#050505] border border-white/10 rounded-3xl p-8 text-slate-300 font-body text-base placeholder-slate-700 focus:outline-none focus:border-[#B066FE]/50 transition-all shadow-inner resize-none"
              />
            </div>

            <div className="flex justify-center mt-10">
              <Button 
                variant="primary" 
                size="lg" 
                className="min-w-[280px] py-5 text-sm font-black tracking-widest shadow-[0_0_30px_rgba(111,38,255,0.3)] hover:shadow-[0_0_40px_rgba(111,38,255,0.5)]"
                onClick={handleSendRequest}
              >
                Send Request
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Subcomponents ---

const InfoBox = ({ label, value, copyable }: { label: string, value: string, copyable?: boolean }) => (
  <div className="bg-[#11111B] border border-white/5 rounded-[24px] p-7 flex flex-col justify-center group hover:border-white/10 hover:bg-[#161622] transition-colors shadow-lg min-h-[100px]">
    <span className="text-[9px] font-header font-bold uppercase tracking-[0.25em] text-slate-500 mb-3">{label}</span>
    <div className="flex items-center justify-between">
      <span className="text-[13px] md:text-sm font-body text-white font-light tracking-wide">{value}</span>
      {copyable && <Copy className="w-4 h-4 text-slate-600 cursor-pointer hover:text-primary transition-colors hover:scale-110 active:scale-90" />}
    </div>
  </div>
);

const LicenseFeature = ({ text }: { text: string }) => (
  <li className="flex items-start gap-4 text-[13px] font-body text-slate-300 font-light leading-relaxed">
    <CheckCircle2 className="w-4 h-4 text-[#B066FE] flex-shrink-0 mt-0.5" />
    {text}
  </li>
);

export default FileDetail;
