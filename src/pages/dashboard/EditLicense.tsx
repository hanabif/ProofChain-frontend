import React, { useEffect } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { Button } from '../../components/ui/Button';
import { 
  Lock, 
  CheckCircle2,
  Loader2,
  AlertCircle
} from 'lucide-react';

import { useParams, useNavigate } from 'react-router-dom';
import { useLicense } from '../../hooks/licenses/useLicense';
import { useUpdateLicense } from '../../hooks/licenses/useUpdateLicense';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const editLicenseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  price: z.number().min(0, 'Price must be positive'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type EditLicenseFormValues = z.infer<typeof editLicenseSchema>;

const EditLicense: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: licenseData, isLoading, isError } = useLicense(id);
  const updateMutation = useUpdateLicense();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editLicenseSchema),
    defaultValues: {
      title: '',
      price: 0,
      description: '',
    }
  });

  useEffect(() => {
    if (licenseData) {
      setValue('title', licenseData.title || '');
      setValue('price', Number(licenseData.price) || 0);
      setValue('description', licenseData.description || '');
    }
  }, [licenseData, setValue]);

  const onFormSubmit = async (data: EditLicenseFormValues) => {
    if (!id) return;
    try {
      await updateMutation.mutateAsync({
        id,
        updates: {
          title: data.title,
          price: data.price as any,
          description: data.description
        }
      });
      navigate('/dashboard/licenses');
    } catch (error) {
      console.error('Failed to update license:', error);
    }
  };

  const isPersonal = licenseData?.type?.toLowerCase() === 'personal';

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-white overflow-hidden selection:bg-primary/30">
      <Sidebar />

      <main className="flex-1 flex flex-col relative z-20">
        <DashboardNavbar />

        <div className="p-8 lg:p-12 overflow-y-auto max-h-[calc(100vh-88px)]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-40 space-y-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-[#ffffff20] font-header tracking-widest text-xs uppercase italic">Syncing with Registry...</p>
            </div>
          ) : isError || !licenseData ? (
            <div className="flex flex-col items-center justify-center py-40 space-y-6">
              <AlertCircle className="w-12 h-12 text-red-500/50" />
              <p className="text-red-400 font-header tracking-widest text-xs uppercase italic">License Protocol Error</p>
              <Button variant="outline" onClick={() => navigate('/dashboard/licenses')} clipped={false}>Return to Dashboard</Button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-12">
                <h1 className="text-4xl font-bold font-header tracking-tight text-white mb-2 italic uppercase">
                  Edit <span className="text-primary">License</span>
                </h1>
                <p className="text-[#ffffff40] font-body text-sm">
                  Update pricing and description for protocol version {licenseData.id}.
                </p>
              </div>

              <form className="max-w-4xl space-y-8" onSubmit={handleSubmit(onFormSubmit)}>
                {/* Title Field */}
                <div className="space-y-4">
                  <label className="text-[10px] font-header tracking-[0.2em] text-[#ffffff30] uppercase block pl-4">
                    License Registry Title
                  </label>
                  <input 
                    type="text" 
                    {...register('title')}
                    placeholder="Enter Protocol Title..."
                    className={`w-full bg-[#ffffff05] border border-[#ffffff08] rounded-[24px] py-5 px-8 text-xl font-header text-white focus:outline-none focus:border-primary/50 focus:bg-[#ffffff0a] transition-all ${errors.title ? 'border-red-500/30' : ''}`}
                  />
                  {errors.title && (
                    <p className="text-[9px] font-header text-red-400 uppercase tracking-widest pl-4 italic">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Info Card - Type info */}
                <div className="bg-[#161622]/40 border border-[#ffffff08] rounded-[40px] p-8 relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -z-10"></div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-3">
                      <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff20] uppercase">License Protocol</span>
                      <div className="flex items-center gap-4">
                        <div className="px-6 py-2.5 bg-primary/10 border border-primary/20 rounded-xl text-[10px] font-header tracking-widest text-primary uppercase">
                          {licenseData.type}
                        </div>
                        <div className="flex items-center gap-2 text-[#ffffff20]">
                          <Lock className="w-3.5 h-3.5" />
                          <span className="text-[9px] font-header tracking-widest uppercase">Immutable Type</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-12">
                      <div className="space-y-2 text-right">
                        <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff20] uppercase">Linked Artifacts</span>
                        <div className="text-3xl font-bold font-header text-white">
                          {licenseData.assetCount || licenseData.assets?.length || 0}
                        </div>
                      </div>
                      <div className="space-y-2 text-right">
                        <span className="text-[10px] font-header tracking-[0.2em] text-[#ffffff20] uppercase">Usage Requests</span>
                        <div className="text-3xl font-bold font-header text-[#ff4b4b]">
                          {licenseData.requestCount || 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Inputs (Price & Description) */}
                <div className="grid grid-cols-1 gap-8">
                  {/* Price Field */}
                  <div className="space-y-4">
                    <label className="text-[10px] font-header tracking-[0.2em] text-[#ffffff30] uppercase block pl-4">
                      License Fee (ETH)
                    </label>
                    <div className={`relative group ${isPersonal ? 'opacity-50' : ''}`}>
                      <input 
                        type="number" 
                        step="0.01"
                        {...register('price', { valueAsNumber: true })}
                        disabled={isPersonal}
                        className="w-full bg-[#ffffff05] border border-[#ffffff08] rounded-[24px] py-5 px-8 text-xl font-header text-white focus:outline-none focus:border-primary/50 focus:bg-[#ffffff0a] transition-all"
                      />
                      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-1.5 bg-[#00ff95]/10 border border-[#00ff95]/20 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff95]" />
                        <span className="text-[9px] font-header tracking-widest text-[#00ff95] uppercase">
                          {isPersonal ? 'Fixed' : 'Verified'}
                        </span>
                      </div>
                    </div>
                    {errors.price && (
                      <p className="text-[9px] font-header text-red-400 uppercase tracking-widest pl-4 italic">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  {/* Description Field */}
                  <div className="space-y-4">
                    <label className="text-[10px] font-header tracking-[0.2em] text-[#ffffff30] uppercase block pl-4">
                      Protocol Description
                    </label>
                    <textarea 
                      {...register('description')}
                      rows={6}
                      className={`w-full bg-[#ffffff05] border border-[#ffffff08] rounded-[32px] p-8 text-sm font-body text-[#ffffff60] leading-relaxed focus:outline-none focus:border-primary/50 focus:bg-[#ffffff0a] transition-all resize-none ${errors.description ? 'border-red-500/30' : ''}`}
                    />
                    {errors.description && (
                      <p className="text-[9px] font-header text-red-400 uppercase tracking-widest pl-4 italic">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6 pt-6">
                  <div className="relative group overflow-hidden rounded-[20px] active:scale-95 transition-transform">
                    <Button 
                      variant="primary" 
                      type="submit"
                      className="!py-5 !px-16 !text-[11px] italic font-header tracking-[0.2em] relative z-10 uppercase" 
                      clipped={true}
                      disabled={updateMutation.isPending}
                    >
                      {updateMutation.isPending ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Updating...
                        </span>
                      ) : 'Save Changes'}
                    </Button>
                    <div className="absolute top-0 right-0 w-20 h-full bg-white/10 skew-x-[-25deg] translate-x-10 group-hover:translate-x-5 transition-transform duration-500"></div>
                  </div>

                  <Button 
                    variant="outline" 
                    type="button"
                    className="!rounded-[20px] !py-5 !px-16 !text-[11px] italic font-header tracking-[0.2em] !border-white/10 hover:!bg-white/5 uppercase" 
                    clipped={true}
                    onClick={() => navigate('/dashboard/licenses')}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default EditLicense;
