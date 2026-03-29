import React from 'react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLogin } from '../hooks/auth/useLogin';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const { loginUser, loading: isLoading, error: apiError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    await loginUser({ email: data.email, password: data.password });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[20%] right-[10%] w-64 h-64 border border-slate-800/20 rotate-45 pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-[20%] left-[5%] w-48 h-48 border border-slate-800/10 rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full -z-20 pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 pt-20">
        <div className="bg-[#11111B]/80 backdrop-blur-xl border border-white/5 rounded-[32px] p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          
          <div className="text-center mb-10">
            <h1 className="text-4xl font-header font-black tracking-tight mb-3 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent uppercase">
              Login
            </h1>
            <p className="text-[10px] font-header tracking-[0.2em] text-[#ffffff40] uppercase">Secure Protocol Entrance</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {apiError && (
              <p className="text-[9px] font-header text-red-400 uppercase tracking-widest pl-2 italic text-center">
                {apiError}
              </p>
            )}
            <div className="space-y-1">
              <Input 
                {...register('email')}
                label="Email" 
                placeholder="you@example.com" 
                icon={<Mail size={18} />}
                className={errors.email ? 'border-red-500/50 focus:border-red-500/50' : ''}
              />
              {errors.email && (
                <p className="text-[9px] font-header text-red-400 uppercase tracking-widest pl-2 italic">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Input 
                {...register('password')}
                label="Password" 
                type="password"
                placeholder="********" 
                icon={<Lock size={18} />}
                className={errors.password ? 'border-red-500/50 focus:border-red-500/50' : ''}
              />
              {errors.password && (
                <p className="text-[9px] font-header text-red-400 uppercase tracking-widest pl-2 italic">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="pt-4 space-y-4 text-center">
              <Button fullWidth size="lg" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    AUTHENTICATING...
                  </span>
                ) : 'ACCESS DASHBOARD'}
              </Button>
              
              <p className="text-[10px] font-header tracking-widest text-slate-500 uppercase pt-4 italic">
                Don't have an account? <Link to="/register" className="text-primary cursor-pointer hover:underline">Register now</Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="absolute right-10 top-1/3 opacity-20 pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" />
          <path d="M50 10 L50 50 M90 30 L50 50 M10 30 L50 50 M50 90 L50 50" />
        </svg>
      </div>

       <div className="absolute left-[-50px] bottom-[15%] opacity-10 pointer-events-none scale-150">
        <div className="w-64 h-64 border border-white rounded-full flex items-center justify-center">
            <div className="w-48 h-48 border border-white/50 rounded-full" />
        </div>
      </div>

    </div>
  );
};

export default Login;
