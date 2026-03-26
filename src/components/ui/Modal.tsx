import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  maxWidth = 'max-w-2xl' 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#00000080] backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div 
        className={`relative w-full ${maxWidth} bg-[#11111b] border border-[#ffffff10] rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300`}
        style={{
          boxShadow: '0 0 50px rgba(111, 38, 255, 0.2)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          {title && <h2 className="text-xl font-bold font-header text-white">{title}</h2>}
          <button 
            onClick={onClose}
            className="ml-auto p-2 rounded-full hover:bg-white/5 text-[#ffffff40] hover:text-white transition-all group"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
