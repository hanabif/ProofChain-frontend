import React from 'react';
import { Shield, CheckCircle2 } from 'lucide-react';
import type { User } from '../../types/auth.types';
import { Button } from '../ui/Button';

interface UserCardProps {
  user: User;
  onInvite: (user: User) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onInvite }) => {
  return (
    <div className="flex flex-col bg-[#11111B]/80 backdrop-blur-md border border-white/5 rounded-[32px] p-7 transition-all duration-300 hover:bg-[#11111B] hover:border-primary/30 hover:-translate-y-2 shadow-xl group relative overflow-hidden z-20">
      
      {/* Background decoration */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500"></div>

      {/* Header with Avatar and Badge */}
      <div className="flex items-start justify-between mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shadow-inner overflow-hidden">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
            alt={user.username} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="inline-flex items-center gap-2 bg-[#00ff95]/10 border border-[#00ff95]/20 px-3 py-1.5 rounded-full">
          <CheckCircle2 className="w-3 h-3 text-[#00ff95]" />
          <span className="text-[8px] font-black text-[#00ff95] tracking-widest uppercase">Verified Purchaser</span>
        </div>
      </div>

      {/* User Info */}
      <div className="space-y-1 mb-6">
        <h3 className="text-xl font-header font-bold text-white tracking-wide group-hover:text-primary transition-colors italic">
          {user.first_name} {user.last_name}
        </h3>
        <p className="text-[11px] font-mono text-slate-500 tracking-tight">@{user.username}</p>
      </div>

      <div className="space-y-4 mb-8 flex-1">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 shrink-0">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-mono truncate">{user.wallet_address}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/5 my-2" />

      {/* Action Footer */}
      <div className="mt-6">
        <Button 
          variant="primary" 
          fullWidth 
          className="!py-3.5 !text-[10px] font-black tracking-[0.2em] italic uppercase"
          onClick={() => onInvite(user)}
        >
          Invite to License
        </Button>
      </div>
    </div>
  );
};
