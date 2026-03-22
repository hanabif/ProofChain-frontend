import React from 'react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Phone, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decorative Elements (Consistent with Register) */}
      <div className="absolute top-[20%] right-[10%] w-64 h-64 border border-slate-800/20 rotate-45 pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-[20%] left-[5%] w-48 h-48 border border-slate-800/10 rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full -z-20 pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 pt-20">
        {/* Main Card */}
        <div className="bg-[#11111B]/80 backdrop-blur-xl border border-white/5 rounded-[32px] p-10 shadow-2xl relative overflow-hidden">
          {/* Inner top glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          
          <div className="text-center mb-10">
            <h1 className="text-4xl font-header font-black tracking-tight mb-3 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent uppercase">
              Login
            </h1>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <Input 
              label="Phone Number" 
              placeholder="+1 (555) 000-0000" 
              icon={<Phone size={18} />}
            />
            <Input 
              label="Password" 
              type="password"
              placeholder="********" 
              icon={<Lock size={18} />}
            />

            <div className="pt-4 space-y-4 text-center">
              <Button fullWidth size="lg">
                Login
              </Button>
              
              <div className="flex items-center gap-4 py-2">
                <div className="h-px flex-1 bg-slate-800" />
                <span className="text-[10px] font-header text-slate-600 uppercase">OR</span>
                <div className="h-px flex-1 bg-slate-800" />
              </div>

              <Button 
                variant="outline" 
                fullWidth 
                className="border-slate-800/50 hover:bg-white/5"
                leftIcon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                }
              >
                Continue with Google
              </Button>

              <p className="text-[10px] font-header tracking-widest text-slate-500 uppercase pt-4">
                Don't have an account? <Link to="/register" className="text-primary cursor-pointer hover:underline">Register now</Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Decorative side shape (wireframe box) */}
      <div className="absolute right-10 top-1/3 opacity-20 pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" />
          <path d="M50 10 L50 50 M90 30 L50 50 M10 30 L50 50 M50 90 L50 50" />
        </svg>
      </div>

       {/* Decorative side shape (circles) */}
       <div className="absolute left-[-50px] bottom-[15%] opacity-10 pointer-events-none scale-150">
        <div className="w-64 h-64 border border-white rounded-full flex items-center justify-center">
            <div className="w-48 h-48 border border-white/50 rounded-full" />
        </div>
      </div>

    </div>
  );
};

export default Login;
