import React, { useState, useRef } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { Upload, FileText, Loader2, Search } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import VerificationModal from '../../components/dashboard/VerificationModal';
import { verifyAsset } from '../../api/endpoints/assets.api';
import { useActivityStore } from '../../store/activityStore';

const VerifyDocument: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<'success' | 'failure'>('success');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationData, setVerificationData] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addActivity } = useActivityStore();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleVerify = async () => {
    if (!selectedFile) return;

    try {
      setIsVerifying(true);
      const result = await verifyAsset(selectedFile);
      
      setVerificationData(result);
      setStatus(result.status === 'verified' ? 'success' : 'failure');
      
      if (result.status === 'verified') {
        addActivity({
          type: 'verification',
          title: `Verification successful: ${selectedFile.name}`,
          subtitle: `GLOBAL CONSENSUS: 99.8%`,
        });
      }
      
      setIsModalOpen(true);
    } catch (error) {
      console.error('Verification failed:', error);
      setStatus('failure');
      setVerificationData({ message: 'An error occurred during verification. Please try again later.' });
      setIsModalOpen(true);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-white overflow-hidden selection:bg-primary/30">
      <Sidebar />

      <main className="flex-1 flex flex-col relative z-20">
        <DashboardNavbar />
        
        <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12 text-center">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileSelect}
            accept="image/*,video/*,.pdf,.doc,.docx"
          />

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
          <div 
            onClick={triggerFileInput}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-full max-w-3xl aspect-[16/9] bg-[#ffffff05] border-2 border-dashed rounded-[40px] p-12 flex flex-col items-center justify-center gap-8 relative group transition-all duration-500 shadow-2xl cursor-pointer ${
              isDragging ? 'border-primary bg-primary/10' : (selectedFile ? 'border-primary/50 bg-primary/5' : 'border-[#ffffff10] hover:bg-[#ffffff08] hover:border-primary/30')
            }`}
          >
            {/* Background Accent */}
            <div className={`absolute inset-0 bg-primary/5 transition-opacity rounded-[40px] ${isDragging || selectedFile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
            
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center border transition-all duration-500 ${
                selectedFile ? 'bg-primary/20 border-primary/40 scale-110' : 'bg-primary/10 border-primary/20 group-hover:scale-110'
              }`}>
                {selectedFile ? <FileText className="w-8 h-8 text-primary" /> : <Upload className="w-8 h-8 text-primary" />}
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-bold font-header text-white">
                  {selectedFile ? selectedFile.name : (
                    <>Drag & drop your file here or <br />
                    <span className="text-primary hover:underline">click to upload</span></>
                  )}
                </h3>
                <p className="text-sm text-[#ffffff40] max-w-xs mx-auto">
                  {selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB selected` : "We'll compare its digital fingerprint with blockchain records."}
                </p>
              </div>

              {/* Decorative dots */}
              <div className="flex gap-2 mt-4">
                <div className={`w-2 h-2 rounded-full transition-colors ${selectedFile ? 'bg-primary' : 'bg-primary/20'}`}></div>
                <div className={`w-2 h-2 rounded-full transition-colors ${selectedFile ? 'bg-primary/60' : 'bg-primary/40'}`}></div>
                <div className={`w-2 h-2 rounded-full transition-colors ${selectedFile ? 'bg-primary/30' : 'bg-primary/20'}`}></div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-12 w-full max-w-xs">
            <Button 
              variant="primary" 
              fullWidth 
              size="lg" 
              onClick={handleVerify} 
              disabled={!selectedFile || isVerifying}
              leftIcon={isVerifying ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            >
              {isVerifying ? 'Verifying...' : 'Verify Document'}
            </Button>
          </div>
        </div>

        {/* Verification Result Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="max-w-3xl">
          <VerificationModal 
            status={status} 
            data={verificationData}
            onClose={() => setIsModalOpen(false)} 
          />
        </Modal>
      </main>
    </div>
  );
};

export default VerifyDocument;
