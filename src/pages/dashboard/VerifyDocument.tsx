import React, { useState } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { Upload } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import VerificationModal from '../../components/dashboard/VerificationModal';

const VerifyDocument: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<'success' | 'failure'>('success');

  const handleVerify = () => {
    // Simulating a brief delay for verification
    setTimeout(() => {
      setStatus('success'); // Reusing success for now as requested
      setIsModalOpen(true);
    }, 500);
  };
  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-white overflow-hidden selection:bg-primary/30">
      {/* Background Glow Decorations */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/15 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-600/5 rounded-full filter blur-[150px]"></div>
      </div>

      <Sidebar />

      <main className="flex-1 flex flex-col relative z-20">
        <DashboardNavbar />
        
        <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12 text-center">
          {/* Header Section */}
          <div className="mb-12 space-y-4 max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold font-header tracking-tight text-white drop-shadow-2xl">
              Verify Document
            </h1>
            <p className="text-lg text-[#ffffff60] font-body tracking-wide">
              Check if a file is authentic and recorded on the blockchain.
            </p>
          </div>

          {/* Upload Dropzone */}
          <div className="w-full max-w-3xl aspect-[16/9] bg-[#ffffff05] border border-[#ffffff10] rounded-[40px] p-12 flex flex-col items-center justify-center gap-8 relative group hover:bg-[#ffffff08] hover:border-primary/30 transition-all duration-500 shadow-2xl">
            {/* Background Accent */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[40px]"></div>
            
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-bold font-header text-white">
                  Drag & drop your file here or <br />
                  <span className="text-primary cursor-pointer hover:underline">click to upload</span>
                </h3>
                <p className="text-sm text-[#ffffff40] max-w-xs mx-auto">
                  We'll compare its digital fingerprint with blockchain records.
                </p>
              </div>

              {/* Decorative dots */}
              <div className="flex gap-2 mt-4">
                <div className="w-2 h-2 rounded-full bg-primary/20"></div>
                <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                <div className="w-2 h-2 rounded-full bg-primary/20"></div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-12 w-full max-w-xs">
            <Button variant="primary" fullWidth size="lg" onClick={handleVerify}>
              Verify Document
            </Button>
          </div>
        </div>

        {/* Verification Result Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="max-w-3xl">
          <VerificationModal 
            status={status} 
            onClose={() => setIsModalOpen(false)} 
          />
        </Modal>
      </main>
    </div>
  );
};

export default VerifyDocument;
