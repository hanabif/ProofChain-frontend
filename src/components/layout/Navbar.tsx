import React from 'react';
import { Button } from '../ui/Button';
import { Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-transparent">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer group">
        <div className="relative">
          <Sparkles className="w-8 h-8 text-primary transition-transform duration-500 group-hover:rotate-180" />
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full -z-10 h-8 w-8" />
        </div>
        <span className="text-xl font-header font-bold tracking-tighter text-white">
          ProofChain
        </span>
      </div>

      {/* Nav Actions */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" clipped={false} className="border-slate-800 hover:border-primary/50 text-xs">
          Login
        </Button>
        <Button variant="primary" size="sm" className="text-xs">
          Register now
        </Button>
      </div>
    </nav>
  );
};
