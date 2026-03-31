import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import overviewIcon from '../../assets/icons/overview.svg';
import requestIcon from '../../assets/icons/Request.svg';
import licenseIcon from '../../assets/icons/License.svg';
import transactionsIcon from '../../assets/icons/transactions.svg';
import settingsIcon from '../../assets/icons/settings.svg';
import logoIcon from '../../assets/images/logo.svg';
import { LogOut, Users, Compass } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface SidebarProps {
  onToggle?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (onToggle) onToggle(newState);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { name: 'OVERVIEW', icon: overviewIcon, path: '/dashboard/overview' },
    { name: 'REQUESTS', icon: requestIcon, path: '/dashboard/requests' },
    { name: 'LICENSES', icon: licenseIcon, path: '/dashboard/licenses' },
    { name: 'USERS', icon: '', lucideIcon: <Users className="w-6 h-6" />, path: '/dashboard/users' },
    { name: 'EXPLORE LICENSES', icon: '', lucideIcon: <Compass className="w-6 h-6" />, path: '/dashboard/explore' },
    { name: 'TRANSACTIONS', icon: transactionsIcon, path: '/dashboard/transactions' },
    { name: 'SETTINGS', icon: settingsIcon, path: '/dashboard/settings' },
  ];

  return (
    <div 
      className={`h-screen max-h-screen transition-all duration-300 flex flex-col bg-[#11111b] border-r border-[#ffffff10] sticky top-0 left-0 z-50 ${
        isCollapsed ? 'w-[80px]' : 'w-[260px]'
      }`}
    >
      {/* Logo Section */}
      <div className="p-6 shrink-0 flex items-center gap-3 cursor-pointer" onClick={toggleSidebar}>
        <img src={logoIcon} alt="Logo" className="w-10 h-10 animate-pulse" />
        {!isCollapsed && (
          <span className="text-xl font-bold tracking-wider text-white font-header uppercase">
            ProofChain
          </span>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 mt-4 px-3 space-y-2 overflow-y-auto overflow-x-hidden scrollbar-hide mb-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
              ${isActive 
                ? 'bg-primary/20 text-white shadow-[0_0_20px_rgba(111,38,255,0.3)] border border-primary/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'}
            `}
          >
            <div className={`
              w-10 h-10 flex items-center justify-center rounded-lg transition-transform group-hover:scale-110
              ${isCollapsed ? 'mx-auto' : ''}
            `}>
              {item.lucideIcon ? (
                <div className={`${isCollapsed ? 'opacity-80' : ''} text-gray-400 group-hover:text-white transition-colors`}>
                  {item.lucideIcon}
                </div>
              ) : (
                <img 
                  src={item.icon} 
                  alt={item.name} 
                  className={`w-6 h-6 ${isCollapsed ? 'opacity-80' : ''}`} 
                />
              )}
            </div>
            {!isCollapsed && (
              <span className="text-[11px] font-bold tracking-widest font-header">
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className={`p-6 border-t border-[#ffffff10] flex flex-col gap-4 ${isCollapsed ? 'items-center' : ''}`}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-primary/50 overflow-hidden shadow-[0_0_15px_rgba(111,38,255,0.2)] shrink-0">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'User'}`} 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white font-header truncate">{user ? `${user.first_name} ${user.last_name}`.trim() || user.username : 'User'}</p>
              <p className="text-[9px] text-[#ffffff30] font-header truncate">{user?.wallet_address || '0x000...0000'}</p>
            </div>
          )}
        </div>
        
        <button 
          onClick={handleLogout}
          className={`
            flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
            text-red-400/60 hover:text-red-400 hover:bg-red-400/10 border border-transparent hover:border-red-400/20
            ${isCollapsed ? 'justify-center' : ''}
          `}
        >
          <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
          {!isCollapsed && (
            <span className="text-[11px] font-bold tracking-widest font-header">LOGOUT</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
