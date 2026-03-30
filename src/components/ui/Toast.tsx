import React, { useState, useEffect, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type: ToastType) => void;
}

export const ToastContext = React.createContext<ToastContextType | null>(null);

export const toast = {
  success: (msg: string) => (window as any).addToast?.(msg, 'success'),
  error: (msg: string) => (window as any).addToast?.(msg, 'error'),
  info: (msg: string) => (window as any).addToast?.(msg, 'info'),
  warning: (msg: string) => (window as any).addToast?.(msg, 'warning'),
};

export const Toaster: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  useEffect(() => {
    (window as any).addToast = addToast;
    return () => {
      delete (window as any).addToast;
    };
  }, [addToast]);

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-4 max-w-sm w-full">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`
            p-5 rounded-2xl border backdrop-blur-xl shadow-2xl transform transition-all duration-500 animate-in fade-in slide-in-from-right-8
            ${t.type === 'success' ? 'bg-[#00ff95]/10 border-[#00ff95]/20 text-[#00ff95]' : ''}
            ${t.type === 'error' ? 'bg-[#ff4b4b]/10 border-[#ff4b4b]/20 text-[#ff4b4b]' : ''}
            ${t.type === 'info' ? 'bg-[#6f26ff]/10 border-[#6f26ff]/20 text-white' : ''}
            ${t.type === 'warning' ? 'bg-[#ffb800]/10 border-[#ffb800]/20 text-[#ffb800]' : ''}
          `}
        >
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              t.type === 'success' ? 'bg-[#00ff95]' : 
              t.type === 'error' ? 'bg-[#ff4b4b]' : 
              t.type === 'info' ? 'bg-[#6f26ff]' : 'bg-[#ffb800]'
            }`} />
            <p className="text-sm font-header tracking-wide italic lowercase">
              {t.message}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
