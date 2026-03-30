import React from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import Explore from '../Explore';

const ExploreDashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-white overflow-hidden selection:bg-primary/30">
      {/* Background Glow Decorations */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-600/10 rounded-full filter blur-[150px]"></div>
      </div>

      <Sidebar />

      <main className="flex-1 flex flex-col relative z-20">
        <DashboardNavbar />
        
        <div className="overflow-y-auto max-h-[calc(100vh-88px)]">
           <Explore isDashboard={true} />
        </div>
      </main>
    </div>
  );
};

export default ExploreDashboard;
