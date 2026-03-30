import React, { useState } from 'react';
import { UploadCloud, Trash2, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLicenseDraftStore } from '../store/licenseDraftStore';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useActivityStore } from '../store/activityStore';
import { Loader2 } from 'lucide-react';
import { uploadAssetAndLicense, uploadAssetsToLicense } from '../api/endpoints/assets.api';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '../components/ui/Toast';
const attachFileSchema = z.object({});

type AttachFileValues = z.infer<typeof attachFileSchema>;

interface AttachedFile {
  id: string;
  name: string;
  size: string;
  title: string;
  description: string;
  rawFile: File;
}

const AttachFile: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [searchParams] = useSearchParams();
  const licenseId = searchParams.get('licenseId');
  const { draft, clearDraft } = useLicenseDraftStore();
  const queryClient = useQueryClient();
  const { addActivity } = useActivityStore();
  const navigate = useNavigate();

  const {
    handleSubmit,
  } = useForm<AttachFileValues>({
    resolver: zodResolver(attachFileSchema),
  });

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setFileError(null);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileError(null);
    }
  };

  const onFormSubmit = async () => {
    if (!selectedFile) {
      setFileError('Please select a file to attach');
      return;
    }

    const newFile: AttachedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: selectedFile.name,
      size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      title: selectedFile.name.split('.')[0],
      description: draft?.description || '',
      rawFile: selectedFile,
    };

    setAttachedFiles([...attachedFiles, newFile]);
    setIsAddingNew(false);
    setSelectedFile(null);
  };

  const handleFinalUpload = async () => {
    if (attachedFiles.length === 0) return;
    
    // Check if we are adding to an existing license or creating a new one
    if (!licenseId && !draft) {
      setFileError('License draft data missing. Please start over.');
      return;
    }

    setIsUploading(true);
    setFileError(null);

    try {
      const fd = new FormData();
      
      attachedFiles.forEach(f => {
        fd.append('files', f.rawFile);
      });

      if (licenseId) {
        // Adding to an existing license
        await uploadAssetsToLicense(licenseId, fd);
        navigate(`/dashboard/license/${licenseId}/assets`);
      } else if (draft) {
        // Create new license with these files
        if (draft.title) {
          fd.append('title', draft.title);
        } else {
          fd.append('title', attachedFiles[0].title);
        }
        
        if (draft.description) {
          fd.append('description', draft.description);
        }

        const typeMapping: Record<string, string> = {
          'personal': 'PERSONAL',
          'exclusive': 'EXCLUSIVE',
          'non-exclusive': 'NON_EXCLUSIVE',
        };
        fd.append('license_type', typeMapping[draft.type] || 'EXCLUSIVE');
        
        if (draft.price !== undefined) {
          fd.append('price', draft.price.toString());
        }

          await uploadAssetAndLicense(fd);
          clearDraft();
          queryClient.invalidateQueries({ queryKey: ['licenses'] });
          
          addActivity({
            type: 'registration',
            title: `Asset "${attachedFiles[0]?.name || 'Unknown'}" registered`,
            subtitle: `TYPE: ${draft.type.toUpperCase()}`,
          });

          toast.success('License created successfully!');
          navigate(`/dashboard/licenses`);
        } else {
          queryClient.invalidateQueries({ queryKey: ['licenses'] });
          navigate('/dashboard/assets');
        }
      
    } catch (err: any) {
      console.error('Upload Error:', err?.response?.data || err);
      let errorMsg = 'Failed to upload and create license. Please try again.';
      
      const backendDetail = err?.response?.data?.error?.detail || err?.response?.data?.detail;
      if (typeof backendDetail === 'object' && backendDetail !== null) {
        errorMsg = JSON.stringify(backendDetail);
      } else if (typeof backendDetail === 'string') {
        errorMsg = backendDetail;
      }
      
      setFileError(errorMsg);
    } finally {
      setIsUploading(false);
    }
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
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] border-[0.5px] border-white/[0.03] border-dashed rounded-full pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] border-[0.5px] border-white/[0.03] border-dashed rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center w-full relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-header font-black tracking-wide mb-4 uppercase">
            {licenseId ? 'Secure Your Artifacts' : 'Attach Your Files'}
          </h1>
          <p className="text-slate-400 font-body text-sm md:text-base max-w-lg mx-auto leading-relaxed font-light">
            Create a permanent proof of ownership on the blockchain.
          </p>
        </div>

        <div className="w-full bg-[#11111B] rounded-[32px] border border-white/5 p-8 md:p-12 shadow-2xl relative">
          {attachedFiles.length > 0 && (
            <div className="mb-10">
              <span className="text-[10px] font-header font-bold uppercase tracking-[0.2em] text-slate-500 mb-6 block">
                Selected Artifacts
              </span>
              <div className="flex flex-col gap-4">
                {attachedFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-5 bg-[#1A112B]/30 border border-[#B066FE]/10 rounded-2xl group hover:border-[#B066FE]/30 transition-all duration-300">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-xl bg-[#1A112B] flex items-center justify-center border border-white/5">
                        <FileText className="w-7 h-7 text-[#B066FE]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-header font-bold text-base">{file.name}</span>
                        <span className="text-slate-500 font-body text-xs mt-1">{file.size}</span>
                      </div>
                    </div>
                    <button onClick={() => removeFile(file.id)} className="p-3 hover:bg-red-500/10 rounded-xl transition-colors group/btn">
                      <Trash2 className="w-5 h-5 text-slate-500 group-hover/btn:text-red-500 transition-colors" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isAddingNew ? (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 animate-in fade-in duration-500" onSubmit={handleSubmit(onFormSubmit)}>
              <div>
                <input type="file" id="file-upload" className="hidden" onChange={handleFileSelect} />
                <label 
                  htmlFor="file-upload"
                  className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-[32px] transition-all duration-300 cursor-pointer group ${
                    isDragging ? 'border-[#B066FE] bg-[#B066FE]/5' : (fileError ? 'border-red-500/30' : 'border-white/10 hover:border-[#B066FE]/50 hover:bg-white/[0.02]')
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                >
                  <div className="w-16 h-16 rounded-full bg-[#1A112B] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <UploadCloud className="w-8 h-8 text-[#B066FE]" />
                  </div>
                  <h3 className="text-base font-header font-bold text-white mb-2 text-center truncate max-w-full px-4">
                    {selectedFile ? selectedFile.name : 'Drag & drop file'}
                  </h3>
                  <p className="text-xs font-body text-slate-500 tracking-wide uppercase">MAX 100MB</p>
                </label>
                {fileError && <p className="text-[10px] text-red-400 mt-2 font-header tracking-widest uppercase text-center italic">{fileError}</p>}
              </div>

              <div className="flex justify-end gap-4 mt-auto">
                  {attachedFiles.length > 0 && (
                    <button 
                      type="button"
                      onClick={() => setIsAddingNew(false)}
                      className="px-6 py-4 text-xs font-header font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  <Button 
                    variant="primary" 
                    size="lg" 
                    type="submit"
                    disabled={!selectedFile}
                    className="w-full md:w-auto min-w-[200px] py-4 text-sm font-black tracking-widest shadow-[0_0_20px_rgba(111,38,255,0.4)] hover:shadow-[0_0_30px_rgba(111,38,255,0.6)]"
                  >
                    Upload & Create
                  </Button>
                </div>
            </form>
          ) : (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button
                onClick={() => setIsAddingNew(true)}
                className="w-full py-6 border border-[#B066FE]/30 rounded-[20px] bg-transparent text-[#B066FE] font-header font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-[#B066FE]/5 hover:border-[#B066FE]/60 transition-all duration-300 relative group overflow-hidden"
              >
                <span className="relative z-10">Add another file</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B066FE]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>

              <div className="flex justify-end pt-6 border-t border-white/10 mt-2">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={handleFinalUpload}
                  disabled={isUploading}
                  className="w-full md:w-auto min-w-[240px] py-5 text-sm font-black tracking-widest shadow-[0_0_30px_rgba(111,38,255,0.5)] hover:shadow-[0_0_45px_rgba(111,38,255,0.7)]"
                >
                  {isUploading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      DEPLOYING...
                    </span>
                  ) : 'Finish & Deploy'}
                </Button>
              </div>
              
              {fileError && <p className="text-[10px] text-red-400 mt-2 font-header tracking-widest uppercase text-center italic">{fileError}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttachFile;
