import React from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import LicenseCreationForm from '../../components/dashboard/LicenseCreationForm';

const CreateLicenseDashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-white overflow-hidden selection:bg-primary/30">
      {/* Background Decor */}
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] border-[0.5px] border-white/[0.03] border-dashed rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-5%] right-[-5%] w-[400px] h-[400px] border-[0.5px] border-white/[0.03] border-dashed rounded-full pointer-events-none z-0" />

      <Sidebar />

      <main className="flex-1 flex flex-col relative z-20">
        <DashboardNavbar />

        <div className="p-8 lg:p-12 overflow-y-auto max-h-[calc(100vh-88px)]">
          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-header tracking-tight text-white mb-2 uppercase italic">
              Create <span className="text-primary">License</span>
            </h1>
            <p className="text-[#ffffff40] font-body text-sm">
              Define usage rights and monetization terms for your property.
            </p>
          </div>

          <div className="max-w-4xl">
            <LicenseCreationForm isDashboard={true} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateLicenseDashboard;
