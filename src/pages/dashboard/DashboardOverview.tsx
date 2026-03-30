import React from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import StatCard from '../../components/dashboard/StatCard';
import OperationsTerminal from '../../components/dashboard/OperationsTerminal';
import RecentActivity from '../../components/dashboard/RecentActivity';
import licenseIcon from '../../assets/icons/License.svg';
import { useLicenses } from '../../hooks/licenses/useLicenses';
import { useTransactions } from '../../hooks/transactions/useTransactions';

const DashboardOverview: React.FC = () => {
  const { data: licenses } = useLicenses();
  const { data: transactions } = useTransactions();

  const totalEarnings = transactions?.reduce((acc, tx) => acc + Number(tx.amount || 0), 0) || 0;
  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-white overflow-hidden selection:bg-primary/30">
      {/* Background Glow Decorations */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-600/10 rounded-full filter blur-[150px]"></div>
        
        {/* Geometric Accents */}
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] border border-white/5 rotate-45 transform translate-x-32 translate-y-32"></div>
        <div className="absolute bottom-[15%] right-[15%] w-[300px] h-[300px] border border-white/10 rotate-45 transform translate-x-24 translate-y-24"></div>
      </div>

      <Sidebar />

      <main className="flex-1 flex flex-col relative z-20">
        <DashboardNavbar />
        
        <div className="p-8 lg:p-12 overflow-y-auto max-h-[calc(100vh-88px)]">
          {/* Header Section */}
          <div className="mb-12 flex items-center justify-between">
            <h1 className="text-4xl md:text-5xl font-bold font-header tracking-tight text-white drop-shadow-2xl">
              OVERVIEW
            </h1>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-header tracking-widest text-[#ffffff60]">NETWORK: MAINNET</span>
            </div>
          </div>

          {/* Stats & Terminal Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
            <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <StatCard 
                icon={licenseIcon} 
                label="TOTAL LICENSES" 
                value={licenses?.length.toString() || "0"} 
              />
              <StatCard 
                icon={licenseIcon} 
                label="TOTAL EARNINGS" 
                value={`${totalEarnings.toFixed(2)} ETH`} 
                iconBgColor="green-400"
              />
            </div>
            <div className="xl:col-span-1">
              <OperationsTerminal />
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="grid grid-cols-1 gap-8">
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardOverview;
