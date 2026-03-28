import React from 'react';
import { Loader2 } from 'lucide-react';
import { useGoogleAuth } from '../hooks/auth/useGoogleAuth';

const GoogleCallback: React.FC = () => {
  const { error } = useGoogleAuth();

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 relative overflow-hidden bg-[#0B0B14]">
      {/* Background Decorative Elements */}
      <div className="absolute top-[20%] right-[10%] w-64 h-64 border border-slate-800/20 rotate-45 pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full -z-20 pointer-events-none" />

      <div className="bg-[#11111B]/80 backdrop-blur-xl border border-white/5 rounded-[32px] p-10 shadow-2xl relative text-center max-w-md w-full">
        {error ? (
          <>
            <h2 className="text-2xl font-header font-black tracking-tight text-red-500 mb-4 uppercase">
              Authentication Failed
            </h2>
            <p className="text-sm font-body text-slate-300 mb-6">{error}</p>
            <a 
              href="/login" 
              className="inline-block bg-primary/20 text-white font-header text-[10px] tracking-widest uppercase py-3 px-8 rounded-full border border-primary/50 hover:bg-primary/30 transition shadow-lg"
            >
              Return to Login
            </a>
          </>
        ) : (
          <>
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-header font-black tracking-tight text-white mb-2 uppercase">
              Verifying Google Account
            </h2>
            <p className="text-sm font-body text-slate-400">
              Please wait while we securely connect your profile...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleCallback;
