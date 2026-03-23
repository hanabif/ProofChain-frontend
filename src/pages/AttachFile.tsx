import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { Button } from '../components/ui/Button';

const AttachFile: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0B14] text-white pt-40 pb-32 px-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] border-[0.5px] border-white/[0.03] border-dashed rounded-full pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] border-[0.5px] border-white/[0.03] border-dashed rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center w-full relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-header font-black tracking-wide mb-4">
            Attach Your File
          </h1>
          <p className="text-slate-400 font-body text-sm md:text-base max-w-lg mx-auto leading-relaxed font-light">
            Create a permanent proof of ownership on the blockchain
          </p>
        </div>

        {/* Main Form Card */}
        <div className="w-full bg-[#11111B] rounded-[32px] border border-white/5 p-8 md:p-12 shadow-2xl relative">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            
            {/* Left Column: Drag & Drop Zone */}
            <div 
              className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-[32px] transition-all duration-300 cursor-pointer group ${
                isDragging 
                  ? 'border-[#B066FE] bg-[#B066FE]/5' 
                  : 'border-white/10 hover:border-[#B066FE]/50 hover:bg-white/[0.02]'
              }`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
            >
              <div className="w-16 h-16 rounded-full bg-[#1A112B] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <UploadCloud className="w-8 h-8 text-[#B066FE]" />
              </div>
              <h3 className="text-base font-header font-bold text-white mb-2">Drag & drop your file here</h3>
              <p className="text-xs font-body text-slate-500 tracking-wide">PDF, JPEG, PNG, or MP4 (Max 100MB)</p>
            </div>

            {/* Right Column: Form Elements */}
            <div className="flex flex-col justify-between">
              
              <div className="flex flex-col gap-8">
                {/* Title */}
                <div className="flex flex-col">
                  <span className="text-[10px] font-header font-bold uppercase tracking-[0.2em] text-[#B066FE] mb-3">Title</span>
                  <input 
                    type="text" 
                    placeholder="Project Alpha_v1"
                    className="w-full bg-[#050505] border border-white/5 rounded-xl py-4 px-5 text-sm font-body text-white placeholder-slate-600 focus:outline-none focus:border-[#B066FE]/50 transition-colors shadow-inner"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col">
                  <span className="text-[10px] font-header font-bold uppercase tracking-[0.2em] text-[#B066FE] mb-3">Description</span>
                  <textarea 
                    placeholder="Brief details about the asset's origin..."
                    className="w-full bg-[#050505] border border-white/5 rounded-xl py-4 px-5 text-sm font-body text-white placeholder-slate-600 focus:outline-none focus:border-[#B066FE]/50 transition-colors shadow-inner min-h-[140px] resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-8">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full md:w-auto min-w-[200px] py-4 text-sm font-black tracking-widest shadow-[0_0_20px_rgba(111,38,255,0.4)] hover:shadow-[0_0_30px_rgba(111,38,255,0.6)]"
                >
                  Attach File
                </Button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AttachFile;
