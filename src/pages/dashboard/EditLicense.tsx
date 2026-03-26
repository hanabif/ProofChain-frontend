import React, { useState } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { Button } from '../../components/ui/Button';
import { 
  Lock, 
  CheckCircle2
} from 'lucide-react';

import { useParams, useNavigate } from 'react-router-dom';

const EditLicense: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock license data
  const [license, setLicense] = useState({
    id: id || '1',
    type: 'NON-EXCLUSIVE',
    price: '25.00',
    currency: 'XLM',
    description: 'This license grants the holder non-exclusive rights to utilize the attached digital assets for commercial broadcasting and digital distribution. Rights are restricted to the duration of the proof-of-stake validity and must be verified against the Ethereal Archive protocol on each execution. No sub-licensing permitted.',
    attachedAssets: 156,
    activeRequests: 42
  });

  const handleSave = () => {
    // Placeholder for save logic
    navigate('/dashboard/licenses');
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-white overflow-hidden selection:bg-primary/30">
      <Sidebar />

      <main className="flex-1 flex flex-col relative z-20">
        <DashboardNavbar />

        <div className="p-8 lg:p-12 overflow-y-auto max-h-[calc(100vh-88px)]">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold font-header tracking-tight text-white mb-2 italic uppercase">
              Edit License
            </h1>
            <p className="text-[#ffffff40] font-body text-sm">
              Update pricing and description for this license.
            </p>
          </div>

          <div className="max-w-4xl space-y-8">
            {/* Info Card */}
            <div className="bg-[#161622]/40 border border-[#ffffff08] rounded-[40px] p-8 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -z-10"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff20] uppercase">License Type</span>
                    <div className="flex items-center gap-4">
                      <div className="px-6 py-2.5 bg-primary/10 border border-primary/20 rounded-xl text-[10px] font-header tracking-widest text-primary uppercase">
                        {license.type}
                      </div>
                      <div className="flex items-center gap-2 text-[#ffffff20]">
                        <Lock className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-header tracking-widest uppercase">License type cannot be changed</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff20] uppercase">Attached Assets</span>
                    <div className="text-3xl font-bold font-header text-white">
                      {license.attachedAssets} <span className="text-sm font-medium text-[#ffffff30] ml-1">Assets</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff20] uppercase">Active Requests</span>
                    <div className="text-3xl font-bold font-header text-[#ff4b4b]">
                      {license.activeRequests} <span className="text-sm font-medium text-[#ffffff30] ml-1">Requests</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="space-y-8">
              {/* Price Field */}
              <div className="space-y-4">
                <label className="text-[10px] font-header tracking-[0.2em] text-[#ffffff30] uppercase block">
                  License Price ({license.currency})
                </label>
                <div className="relative group">
                  <input 
                    type="text" 
                    value={`${license.price} ${license.currency}`}
                    onChange={(e) => setLicense({ ...license, price: e.target.value.split(' ')[0] })}
                    className="w-full bg-[#ffffff05] border border-[#ffffff08] rounded-[24px] py-5 px-8 text-xl font-header text-white focus:outline-none focus:border-primary/50 focus:bg-[#ffffff0a] transition-all"
                  />
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-1.5 bg-[#00ff95]/10 border border-[#00ff95]/20 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff95]" />
                    <span className="text-[9px] font-header tracking-widest text-[#00ff95] uppercase">Verified</span>
                  </div>
                </div>
              </div>

              {/* Description Field */}
              <div className="space-y-4">
                <label className="text-[10px] font-header tracking-[0.2em] text-[#ffffff30] uppercase block">
                  License Description
                </label>
                <textarea 
                  value={license.description}
                  onChange={(e) => setLicense({ ...license, description: e.target.value })}
                  rows={6}
                  className="w-full bg-[#ffffff05] border border-[#ffffff08] rounded-[32px] p-8 text-sm font-body text-[#ffffff60] leading-relaxed focus:outline-none focus:border-primary/50 focus:bg-[#ffffff0a] transition-all resize-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 pt-6">
              <div className="relative group overflow-hidden rounded-[20px] active:scale-95 transition-transform">
                <Button 
                  variant="primary" 
                  className="!py-5 !px-16 !text-[11px] italic font-header tracking-[0.2em] relative z-10" 
                  clipped={true}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
                <div className="absolute top-0 right-0 w-20 h-full bg-white/10 skew-x-[-25deg] translate-x-10 group-hover:translate-x-5 transition-transform duration-500"></div>
              </div>

              <Button 
                variant="outline" 
                className="!rounded-[20px] !py-5 !px-16 !text-[11px] italic font-header tracking-[0.2em] !border-white/10 hover:!bg-white/5" 
                clipped={true}
                onClick={() => navigate('/dashboard/licenses')}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditLicense;
