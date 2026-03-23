import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

type LicenseType = 'PERSONAL' | 'EXCLUSIVE' | 'NON-EXCLUSIVE';

const CreatLicense: React.FC = () => {
  const [licenseType, setLicenseType] = useState<LicenseType>('PERSONAL');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0B14] text-white pt-40 pb-32 px-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] border-[0.5px] border-white/[0.03] border-dashed rounded-full pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] border-[0.5px] border-white/[0.03] border-dashed rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto flex flex-col items-center w-full relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-header font-black tracking-tighter mb-4">
            CREATE <span className="text-[#B066FE]">LICENSE</span>
          </h1>
          <p className="text-slate-400 font-body text-sm md:text-base max-w-lg mx-auto leading-relaxed font-light">
            Define how your files can be used and monetized on the ProofChain protocol.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="w-full bg-[#11111B] rounded-[32px] border border-white/5 p-8 md:p-12 shadow-2xl relative">
          
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-10">
            
            {/* 1. License Type */}
            <div className="flex flex-col">
              <span className="text-[10px] font-header font-bold uppercase tracking-[0.2em] text-[#B066FE] mb-6">License Type</span>
              
              {/* Dropdown Mimic -> Actual Dropdown */}
              <div className="relative mb-6">
                <div 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-[#050505] border border-white/5 rounded-full py-4 px-6 flex items-center justify-between cursor-pointer hover:border-white/10 transition-colors shadow-inner"
                >
                  <span className="text-sm font-body text-slate-200">
                    {licenseType === 'PERSONAL' && 'Personal'}
                    {licenseType === 'EXCLUSIVE' && 'Exclusive'}
                    {licenseType === 'NON-EXCLUSIVE' && 'Non-Exclusive'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#B066FE] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A112B] border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl flex flex-col">
                    {(['PERSONAL', 'EXCLUSIVE', 'NON-EXCLUSIVE'] as LicenseType[]).map((type) => (
                      <div 
                        key={type}
                        onClick={() => {
                          setLicenseType(type);
                          setIsDropdownOpen(false);
                        }}
                        className={`px-6 py-4 cursor-pointer hover:bg-white/5 transition-colors font-body text-sm ${licenseType === type ? 'text-[#B066FE] bg-[#B066FE]/5' : 'text-slate-200'}`}
                      >
                        {type === 'PERSONAL' && 'Personal'}
                        {type === 'EXCLUSIVE' && 'Exclusive'}
                        {type === 'NON-EXCLUSIVE' && 'Non-Exclusive'}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Selection Pills */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TypePill 
                  type="PERSONAL" 
                  title="PERSONAL" 
                  desc="Private use only" 
                  active={licenseType === 'PERSONAL'} 
                  onClick={() => setLicenseType('PERSONAL')} 
                />
                <TypePill 
                  type="EXCLUSIVE" 
                  title="EXCLUSIVE" 
                  desc="Single buyer ownership" 
                  active={licenseType === 'EXCLUSIVE'} 
                  onClick={() => setLicenseType('EXCLUSIVE')} 
                />
                <TypePill 
                  type="NON-EXCLUSIVE" 
                  title="NON-EXCLUSIVE" 
                  desc="Multi-user access" 
                  active={licenseType === 'NON-EXCLUSIVE'} 
                  onClick={() => setLicenseType('NON-EXCLUSIVE')} 
                />
              </div>
            </div>

            {/* 2. License Price */}
            <div className="flex flex-col">
              <span className="text-[10px] font-header font-bold uppercase tracking-[0.2em] text-[#B066FE] mb-6">License Price (ETH)</span>
              
              <div className={`w-full bg-[#0A0A0F] border border-white/5 rounded-full py-4 px-6 flex items-center justify-between shadow-inner transition-colors ${licenseType === 'PERSONAL' ? 'opacity-70' : ''}`}>
                <div className="flex items-center gap-2 w-full">
                  {licenseType === 'PERSONAL' ? (
                    <span className="text-base font-mono tracking-widest text-slate-600">
                      0.00
                    </span>
                  ) : (
                    <input 
                      type="number" 
                      placeholder="0.00"
                      className="bg-transparent border-none outline-none w-full text-white font-mono text-base tracking-widest placeholder-slate-600"
                    />
                  )}
                </div>
                {licenseType === 'PERSONAL' && (
                  <span className="text-[9px] font-header font-bold text-white whitespace-nowrap tracking-widest uppercase">
                    Disabled for Personal
                  </span>
                )}
              </div>
            </div>

            {/* 3. License Description */}
            <div className="flex flex-col">
              <span className="text-[10px] font-header font-bold uppercase tracking-[0.2em] text-[#B066FE] mb-6">License Description</span>
              
              <textarea 
                rows={4}
                className="w-full bg-[#050505] border border-white/5 rounded-3xl py-5 px-6 text-sm font-body text-white placeholder-slate-600 focus:outline-none focus:border-[#B066FE]/50 transition-colors shadow-inner resize-none font-light leading-relaxed"
                placeholder="Detail the usage rights, limitations, and specific terms of this protocol license..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <Button 
                variant="primary" 
                size="lg" 
                className="min-w-[240px] py-4 text-sm font-black tracking-widest shadow-[0_0_20px_rgba(111,38,255,0.4)] hover:shadow-[0_0_30px_rgba(111,38,255,0.6)]"
                onClick={() => setShowSuccessModal(true)}
              >
                Create License
              </Button>
            </div>

          </div>
        </div>

      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#11111B] border border-white/5 rounded-3xl p-10 md:p-14 flex flex-col items-center text-center max-w-lg w-full shadow-2xl relative overflow-hidden">
            
            {/* Modal glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#2DD4BF]/20 blur-[60px] pointer-events-none" />

            <div className="w-20 h-20 rounded-full bg-[#1A1A2E] flex items-center justify-center mb-8 relative z-10 border border-white/5 shadow-xl">
              <div className="w-10 h-10 rounded-full bg-[#2DD4BF] flex items-center justify-center shadow-[0_0_20px_#2DD4BF]">
                <Check className="w-6 h-6 text-[#1A1A2E] stroke-[3]" />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-header font-black text-white uppercase tracking-widest mb-2">License Created</h2>
            <h2 className="text-2xl md:text-3xl font-header font-black text-white uppercase tracking-widest mb-8">Successfully</h2>

            <p className="text-slate-300 font-body text-sm mb-12 font-light tracking-wide">
              Do you want to attach files to this license?
            </p>

            <div className="flex items-center gap-6 w-full justify-center">
              <Button 
                variant="outline" 
                className="w-[160px] py-4 text-xs font-bold tracking-widest"
                onClick={() => setShowSuccessModal(false)}
              >
                Maybe later
              </Button>
              <Button 
                variant="primary" 
                className="w-[160px] py-4 text-xs font-bold tracking-widest shadow-[0_0_15px_rgba(176,102,254,0.4)]"
                onClick={() => navigate('/attach-file')}
              >
                Add Files
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// --- Subcomponents ---

const TypePill = ({ title, desc, active, onClick }: { type: string, title: string, desc: string, active: boolean, onClick: () => void }) => {
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
        active 
          ? 'bg-[#B066FE]/10 border-[#B066FE]/30 shadow-[inset_0_0_20px_rgba(176,102,254,0.1)]' 
          : 'bg-[#1A112B]/30 border-white/5 hover:bg-[#1A112B]/50'
      }`}
    >
      <span className={`text-[10px] font-header font-bold uppercase tracking-[0.15em] mb-1 ${active ? 'text-[#B066FE]' : 'text-slate-400'}`}>
        {title}
      </span>
      <span className={`text-[9px] font-body tracking-wide ${active ? 'text-slate-300' : 'text-slate-500'}`}>
        {desc}
      </span>
    </div>
  );
};

export default CreatLicense;
