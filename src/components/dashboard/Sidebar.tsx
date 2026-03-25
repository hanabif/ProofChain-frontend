import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import overviewIcon from '../../assets/icons/overview.svg';
import assetsIcon from '../../assets/icons/assets.svg';
import requestIcon from '../../assets/icons/Request.svg';
import licenseIcon from '../../assets/icons/License.svg';
import transactionsIcon from '../../assets/icons/transactions.svg';
import settingsIcon from '../../assets/icons/settings.svg';
import logoIcon from '../../assets/images/logo.svg';

interface SidebarProps {
  onToggle?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (onToggle) onToggle(newState);
  };

  const menuItems = [
    { name: 'OVERVIEW', icon: overviewIcon, path: '/dashboard/overview' },
    { name: 'ASSETS', icon: assetsIcon, path: '/dashboard/assets' },
    { name: 'REQUESTS', icon: requestIcon, path: '/dashboard/requests' },
    { name: 'LICENSES', icon: licenseIcon, path: '/dashboard/licenses' },
    { name: 'TRANSACTIONS', icon: transactionsIcon, path: '/dashboard/transactions' },
    { name: 'SETTINGS', icon: settingsIcon, path: '/dashboard/settings' },
  ];

  return (
    <div 
      className={`h-screen transition-all duration-300 flex flex-col bg-[#11111b] border-r border-[#ffffff10] sticky top-0 left-0 z-50 ${
        isCollapsed ? 'w-[80px]' : 'w-[260px]'
      }`}
    >
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3 cursor-pointer" onClick={toggleSidebar}>
        <img src={logoIcon} alt="Logo" className="w-10 h-10 animate-pulse" />
        {!isCollapsed && (
          <span className="text-xl font-bold tracking-wider text-white font-header">
            ProofChain
          </span>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 mt-8 px-3 space-y-2">
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
              <img 
                src={item.icon} 
                alt={item.name} 
                className={`w-6 h-6 ${isCollapsed ? 'opacity-80' : ''}`} 
              />
            </div>
            {!isCollapsed && (
              <span className="text-sm font-medium tracking-widest font-header">
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="p-6 border-t border-[#ffffff10] flex justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-primary/50 overflow-hidden shadow-[0_0_15px_rgba(111,38,255,0.2)]">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky" 
            alt="User" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
