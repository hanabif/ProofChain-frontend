import React from 'react';
import { Navbar } from './Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0B0B14] text-white">
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
