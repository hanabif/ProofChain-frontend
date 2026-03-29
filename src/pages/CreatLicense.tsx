import React from 'react';
import LicenseCreationForm from '../components/dashboard/LicenseCreationForm';

const CreatLicense: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0B14] text-white pt-40 pb-32 px-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] border-[0.5px] border-white/[0.03] border-dashed rounded-full pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] border-[0.5px] border-white/[0.03] border-dashed rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto w-full relative z-10">
        <LicenseCreationForm isDashboard={false} />
      </div>

    </div>
  );
};

export default CreatLicense;
