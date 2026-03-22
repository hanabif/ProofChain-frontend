import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import logo from '../../assets/images/logo.svg';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4
        transition-all duration-500
        ${isScrolled 
          ? 'bg-[#11111B]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl py-3' 
          : 'bg-transparent py-6'}
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer group">
        <div className="relative">
          <img src={logo} alt="ProofChain Logo" className="w-8 h-8 object-contain" />
          {!isScrolled && (
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full -z-10 h-8 w-8 animate-pulse" />
          )}
        </div>
        <span className="text-xl font-header font-bold tracking-tighter text-white">
          ProofChain
        </span>
      </div>

      {/* Nav Actions */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" className="text-[10px] tracking-widest bg-white/5 border-white/10 hover:border-primary/50">
          Login
        </Button>
        <Button variant="primary" size="sm" className="text-[10px] tracking-widest">
          Register now
        </Button>
      </div>
    </nav>
  );
};
