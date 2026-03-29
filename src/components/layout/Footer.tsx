import React from 'react';
import logo from '../../assets/images/logo.svg';
import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0B0B14] border-t border-white/5 py-12 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <img src={logo} alt="ProofChain Logo" className="w-6 h-6 object-contain" />
            <span className="text-lg font-header font-bold tracking-tighter text-white">
              ProofChain
            </span>
          </div>
          <p className="text-xs font-body text-slate-500">
            © 2026 ProofChain. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-xs font-header tracking-widest text-slate-400 uppercase">
          <a href="#" className="hover:text-primary transition-colors duration-300">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors duration-300">Contact Us</a>
          <a href="#" className="hover:text-primary transition-colors duration-300">Status</a>
        </div>
      </div>
    </footer>
  );
};
