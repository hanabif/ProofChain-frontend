import React from 'react';
import { theme } from './theme';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, icon, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && (
        <label className="text-[10px] text-slate-400 font-header uppercase tracking-widest ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        <input
          className="
            w-full bg-[#1A1A2E]/60 border border-slate-800 rounded-lg px-4 py-3 
            text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50
            transition-all duration-300 font-body text-sm
          "
          {...props}
        />
        {icon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors duration-300">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
