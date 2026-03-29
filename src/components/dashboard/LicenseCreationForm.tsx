import React, { useState, useEffect } from 'react';
import { ChevronDown, Check, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { useLicenseDraftStore } from '../../store/licenseDraftStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const licenseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  type: z.enum(['personal', 'exclusive', 'non-exclusive']),
  price: z.number().min(0, 'Price must be positive'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
}).refine(data => {
  if (data.type === 'personal') return data.price === 0;
  return true;
}, {
  message: "Personal licenses must have a price of 0",
  path: ["price"]
});

type LicenseFormValues = z.infer<typeof licenseSchema>;

interface LicenseCreationFormProps {
  isDashboard?: boolean;
}

const LicenseCreationForm: React.FC<LicenseCreationFormProps> = ({ isDashboard = false }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const { setDraft } = useLicenseDraftStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LicenseFormValues>({
    resolver: zodResolver(licenseSchema),
    defaultValues: {
      title: '',
      type: 'personal',
      price: 0,
      description: '',
    }
  });

  const licenseType = watch('type');

  useEffect(() => {
    if (licenseType === 'personal') {
      setValue('price', 0);
    }
  }, [licenseType, setValue]);

  const onFormSubmit = async (data: LicenseFormValues) => {
    setDraft({
      title: data.title,
      type: data.type,
      price: data.price,
      description: data.description,
    });
    setShowSuccessModal(true);
  };

  return (
    <div className={`w-full ${isDashboard ? '' : 'max-w-3xl mx-auto'}`}>
      {!isDashboard && (
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-header font-black tracking-tighter mb-4 uppercase">
            Create <span className="text-[#B066FE]">License</span>
          </h1>
          <p className="text-slate-400 font-body text-sm md:text-base max-w-lg mx-auto leading-relaxed font-light">
            Define how your files can be used and monetized on the ProofChain protocol.
          </p>
        </div>
      )}

      <div className={`w-full bg-[#11111B] rounded-[32px] border border-white/5 p-8 md:p-12 shadow-2xl relative ${isDashboard ? 'bg-[#161622]/40' : ''}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

        <form className="relative z-10 flex flex-col gap-10" onSubmit={handleSubmit(onFormSubmit)}>
          
          {/* License Title */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-header font-bold uppercase tracking-[0.2em] text-[#B066FE] mb-4">License Title</span>
            <input 
              type="text" 
              {...register('title')}
              placeholder="e.g. My Awesome License"
              className={`w-full bg-[#050505] border border-white/5 rounded-3xl py-5 px-6 text-sm font-body text-white placeholder-slate-600 focus:outline-none focus:border-[#B066FE]/50 transition-colors shadow-inner font-light leading-relaxed ${errors.title ? 'border-red-500/30' : ''}`}
            />
            {errors.title && (
              <p className="text-[9px] font-header text-red-400 uppercase tracking-widest pl-4 italic flex items-center gap-1">
                <AlertCircle size={10} /> {errors.title.message}
              </p>
            )}
          </div>

          {/* 1. License Type */}
          <div className="flex flex-col">
            <span className="text-[10px] font-header font-bold uppercase tracking-[0.2em] text-[#B066FE] mb-6">License Type</span>
            
            <div className="relative mb-6">
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-[#050505] border border-white/5 rounded-full py-4 px-6 flex items-center justify-between cursor-pointer hover:border-white/10 transition-colors shadow-inner"
              >
                <span className="text-sm font-body text-slate-200 capitalize">
                  {licenseType}
                </span>
                <ChevronDown className={`w-4 h-4 text-[#B066FE] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A112B] border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl flex flex-col">
                  {(['personal', 'exclusive', 'non-exclusive'] as const).map((type) => (
                    <div 
                      key={type}
                      onClick={() => {
                        setValue('type', type);
                        setIsDropdownOpen(false);
                      }}
                      className={`px-6 py-4 cursor-pointer hover:bg-white/5 transition-colors font-body text-sm capitalize ${licenseType === type ? 'text-[#B066FE] bg-[#B066FE]/5' : 'text-slate-200'}`}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TypePill 
                title="PERSONAL" 
                desc="Private use only" 
                active={licenseType === 'personal'} 
                onClick={() => setValue('type', 'personal')} 
              />
              <TypePill 
                title="EXCLUSIVE" 
                desc="Single buyer ownership" 
                active={licenseType === 'exclusive'} 
                onClick={() => setValue('type', 'exclusive')} 
              />
              <TypePill 
                title="NON-EXCLUSIVE" 
                desc="Multi-user access" 
                active={licenseType === 'non-exclusive'} 
                onClick={() => setValue('type', 'non-exclusive')} 
              />
            </div>
          </div>

          {/* 2. License Price */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-header font-bold uppercase tracking-[0.2em] text-[#B066FE] mb-4">License Price (ETH)</span>
            
            <div className={`w-full bg-[#0A0A0F] border border-white/5 rounded-full py-4 px-6 flex items-center justify-between shadow-inner transition-colors ${licenseType === 'personal' ? 'opacity-70' : ''}`}>
              <div className="flex items-center gap-2 w-full">
                {licenseType === 'personal' ? (
                  <span className="text-base font-mono tracking-widest text-slate-600">
                    0.00
                  </span>
                ) : (
                  <input 
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    {...register('price', { valueAsNumber: true })}
                    className="bg-transparent border-none outline-none w-full text-white font-mono text-base tracking-widest placeholder-slate-600"
                  />
                )}
              </div>
              {licenseType === 'personal' && (
                <span className="text-[9px] font-header font-bold text-white whitespace-nowrap tracking-widest uppercase italic">
                  Default for Personal
                </span>
              )}
            </div>
            {errors.price && (
              <p className="text-[9px] font-header text-red-400 uppercase tracking-widest pl-4 italic flex items-center gap-1">
                <AlertCircle size={10} /> {errors.price.message}
              </p>
            )}
          </div>

          {/* 3. License Description */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-header font-bold uppercase tracking-[0.2em] text-[#B066FE] mb-4">License Description</span>
            
            <textarea 
              rows={4}
              {...register('description')}
              className={`w-full bg-[#050505] border border-white/5 rounded-3xl py-5 px-6 text-sm font-body text-white placeholder-slate-600 focus:outline-none focus:border-[#B066FE]/50 transition-colors shadow-inner resize-none font-light leading-relaxed ${errors.description ? 'border-red-500/30' : ''}`}
              placeholder="Detail the usage rights, limitations, and specific terms of this protocol license..."
            />
            {errors.description && (
              <p className="text-[9px] font-header text-red-400 uppercase tracking-widest pl-4 italic flex items-center gap-1">
                <AlertCircle size={10} /> {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-center mt-6">
            <Button 
              variant="primary" 
              size="lg" 
              type="submit"
              className="min-w-[240px] py-4 text-sm font-black tracking-widest shadow-[0_0_20px_rgba(111,38,255,0.4)] hover:shadow-[0_0_30px_rgba(111,38,255,0.6)]"
              disabled={false}
            >
              Continue to File Upload
            </Button>
          </div>
        </form>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#11111B] border border-white/5 rounded-3xl p-10 md:p-14 flex flex-col items-center text-center max-w-lg w-full shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#2DD4BF]/20 blur-[60px] pointer-events-none" />
            <div className="w-20 h-20 rounded-full bg-[#1A1A2E] flex items-center justify-center mb-8 relative z-10 border border-white/5 shadow-xl">
              <div className="w-10 h-10 rounded-full bg-[#2DD4BF] flex items-center justify-center shadow-[0_0_20px_#2DD4BF]">
                <Check className="w-6 h-6 text-[#1A1A2E] stroke-[3]" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-header font-black text-white uppercase tracking-widest mb-2 italic">License Details</h2>
            <h2 className="text-2xl md:text-3xl font-header font-black text-white uppercase tracking-widest mb-8 italic">Drafted</h2>
            <p className="text-slate-300 font-body text-sm mb-12 font-light tracking-wide px-4">
              You must upload at least one file to activate this license. Otherwise, your license will not be valid.
            </p>
            <div className="flex items-center gap-6 w-full justify-center">
              <Button 
                variant="primary" 
                className="w-full max-w-[240px] py-4 text-xs font-bold tracking-widest shadow-[0_0_15px_rgba(176,102,254,0.4)] !rounded-2xl"
                onClick={() => navigate('/attach-file')}
              >
                Continue to Upload
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface TypePillProps {
  title: string;
  desc: string;
  active: boolean;
  onClick: () => void;
}

const TypePill: React.FC<TypePillProps> = ({ title, desc, active, onClick }) => {
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

export default LicenseCreationForm;


