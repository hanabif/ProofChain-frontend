import React, { useState } from 'react';
import { UploadCloud, Trash2, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface AttachedFile {
  id: string;
  name: string;
  size: string;
  title: string;
  description: string;
}

const AttachFile: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(true);
  
  // Current file form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      if (!title) setTitle(file.name.split('.')[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!title) setTitle(file.name.split('.')[0]);
    }
  };

  const handleAttachFile = () => {
    if (!selectedFile) return;

    const newFile: AttachedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: selectedFile.name,
      size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      title,
      description
    };

    setAttachedFiles([...attachedFiles, newFile]);
    setIsAddingNew(false);
    
    // Reset form
    setSelectedFile(null);
    setTitle('');
    setDescription('');
  };

  const removeFile = (id: string) => {
    const updatedFiles = attachedFiles.filter(f => f.id !== id);
    setAttachedFiles(updatedFiles);
    if (updatedFiles.length === 0) {
      setIsAddingNew(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B14] text-white pt-40 pb-32 px-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] border-[0.5px] border-white/[0.03] border-dashed rounded-full pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] border-[0.5px] border-white/[0.03] border-dashed rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center w-full relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-header font-black tracking-wide mb-4">
            Attach Your Files
          </h1>
          <p className="text-slate-400 font-body text-sm md:text-base max-w-lg mx-auto leading-relaxed font-light">
            Create a permanent proof of ownership on the blockchain.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="w-full bg-[#11111B] rounded-[32px] border border-white/5 p-8 md:p-12 shadow-2xl relative">
          
          {/* Selected Artifacts Section */}
          {attachedFiles.length > 0 && (
            <div className="mb-10">
              <span className="text-[10px] font-header font-bold uppercase tracking-[0.2em] text-slate-500 mb-6 block">
                Selected Artifact
              </span>
              <div className="flex flex-col gap-4">
                {attachedFiles.map((file) => (
                  <div 
                    key={file.id} 
                    className="flex items-center justify-between p-5 bg-[#1A112B]/30 border border-[#B066FE]/10 rounded-2xl group hover:border-[#B066FE]/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-xl bg-[#1A112B] flex items-center justify-center border border-white/5">
                        <FileText className="w-7 h-7 text-[#B066FE]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-header font-bold text-base">{file.name}</span>
                        <span className="text-slate-500 font-body text-xs mt-1">{file.size}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFile(file.id)}
                      className="p-3 hover:bg-red-500/10 rounded-xl transition-colors group/btn"
                    >
                      <Trash2 className="w-5 h-5 text-slate-500 group-hover/btn:text-red-500 transition-colors" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add Form or Add Button */}
          {isAddingNew ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 animate-in fade-in duration-500">
              
              {/* Left Column: Drag & Drop Zone */}
              <div>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <label 
                  htmlFor="file-upload"
                  className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-[32px] transition-all duration-300 cursor-pointer group ${
                    isDragging 
                      ? 'border-[#B066FE] bg-[#B066FE]/5' 
                      : 'border-white/10 hover:border-[#B066FE]/50 hover:bg-white/[0.02]'
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                >
                  <div className="w-16 h-16 rounded-full bg-[#1A112B] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <UploadCloud className="w-8 h-8 text-[#B066FE]" />
                  </div>
                  <h3 className="text-base font-header font-bold text-white mb-2 text-center">
                    {selectedFile ? selectedFile.name : 'Drag & drop your file here'}
                  </h3>
                  <p className="text-xs font-body text-slate-500 tracking-wide">PDF, JPEG, PNG, or MP4 (Max 100MB)</p>
                </label>
              </div>

              {/* Right Column: Form Elements */}
              <div className="flex flex-col justify-between">
                
                <div className="flex flex-col gap-8">
                  {/* Title */}
                  <div className="flex flex-col">
                    <span className="text-[10px] font-header font-bold uppercase tracking-[0.2em] text-[#B066FE] mb-3">Title</span>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Project Alpha_v1"
                      className="w-full bg-[#050505] border border-white/5 rounded-xl py-4 px-5 text-sm font-body text-white placeholder-slate-600 focus:outline-none focus:border-[#B066FE]/50 transition-colors shadow-inner"
                    />
                  </div>

                  {/* Description */}
                  <div className="flex flex-col">
                    <span className="text-[10px] font-header font-bold uppercase tracking-[0.2em] text-[#B066FE] mb-3">Description / Provenance</span>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the cryptographic significance or origin of this document..."
                      className="w-full bg-[#050505] border border-white/5 rounded-xl py-4 px-5 text-sm font-body text-white placeholder-slate-600 focus:outline-none focus:border-[#B066FE]/50 transition-colors shadow-inner min-h-[140px] resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end mt-8 gap-4">
                  {attachedFiles.length > 0 && (
                    <button 
                      onClick={() => setIsAddingNew(false)}
                      className="px-6 py-4 text-xs font-header font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  <Button 
                    variant="primary" 
                    size="lg" 
                    disabled={!selectedFile}
                    onClick={handleAttachFile}
                    className={`w-full md:w-auto min-w-[200px] py-4 text-sm font-black tracking-widest shadow-[0_0_20px_rgba(111,38,255,0.4)] hover:shadow-[0_0_30px_rgba(111,38,255,0.6)] ${!selectedFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Attach File
                  </Button>
                </div>

              </div>

            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button
                onClick={() => setIsAddingNew(true)}
                className="w-full py-6 border border-[#B066FE]/30 rounded-[20px] bg-transparent text-[#B066FE] font-header font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-[#B066FE]/5 hover:border-[#B066FE]/60 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Slanted edges design look */}
                <span className="relative z-10">Add another file</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B066FE]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default AttachFile;
