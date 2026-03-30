import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Send, Loader2, Shield } from 'lucide-react';
import { toast } from '../ui/Toast';
import { createRequest } from '../../services/requestService';
import { webSocketService } from '../../services/websocketService';
import { useAuthStore } from '../../store/authStore';
import { useRequestStore } from '../../store/requestStore';
import { useActivityStore } from '../../store/activityStore';

interface LicenseRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  license: {
    id: string;
    title: string;
    owner?: {
      id: string;
      username: string;
      email?: string;
    };
    assets?: any[];
  } | null;
}

const LicenseRequestModal: React.FC<LicenseRequestModalProps> = ({
  isOpen,
  onClose,
  license,
}) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user: currentUser } = useAuthStore();
  const { addOutgoingRequest } = useRequestStore();
  const { addActivity } = useActivityStore();

  if (!license) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Please specify what you are planning to do with this license.');
      return;
    }

    if (!currentUser) {
      toast.error('Protocol Error: Authentication details missing.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Create request in database/mock-server
      const requestData = {
        senderId: currentUser.id,
        receiverId: license.owner?.id || 'unknown-id',
        licenseId: license.id,
        assetId: license.assets?.[0]?.id || 'unknown-asset-id',
        requesterName: `${currentUser.first_name} ${currentUser.last_name}`.trim() || currentUser.username,
        requesterEmail: currentUser.email,
        receiverName: license.owner?.username || 'License Owner',
        receiverEmail: license.owner?.email || '',
        message: message.trim(),
        type: 'INQUIRY' as const,
      };

      const newRequest = await createRequest(requestData);
      addOutgoingRequest(newRequest);

      // 2. Send real-time notification via WebSocket
      webSocketService.send('request_license', {
        license_id: license.id,
        message: message.trim(),
        metadata: {
          asset_title: license.title,
          requester_id: currentUser.id
        }
      });

      addActivity({
        type: 'request_sent',
        title: `License requested: ${license.title}`,
        subtitle: `OWNER: ${license.owner?.username || 'Unknown'}`,
      });

      toast.success('Licensing inquiry transmitted successfully across the ledger.');
      setMessage('');
      onClose();
    } catch (error) {
      console.error('Request failed:', error);
      toast.error('Communication protocol failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      maxWidth="max-w-xl"
    >
      <div className="flex flex-col space-y-8 py-4">
        {/* Header Icon */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_20px_rgba(111,38,255,0.1)]">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-black font-header tracking-tight text-white uppercase italic">Request License</h2>
            <p className="text-[10px] font-header tracking-[0.2em] text-primary font-bold uppercase italic">{license.title}</p>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-sm font-body text-[#ffffff50] leading-relaxed italic border-l-2 border-primary/20 pl-4">
            You are initiating a licensing inquiry. Describe your intended use for this artifact to help the owner process your request.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-header font-bold uppercase tracking-widest text-[#ffffff20] ml-1">
                Your Planning & Intent
              </label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe what you are planning to do with this license..."
                className="w-full bg-[#ffffff05] border border-[#ffffff10] rounded-2xl p-6 text-sm font-body text-white placeholder-white/10 min-h-[160px] focus:outline-none focus:border-primary/50 focus:bg-[#ffffff0a] transition-all resize-none shadow-inner"
              />
            </div>

            <div className="flex gap-4">
              <Button 
                variant="outline" 
                fullWidth 
                className="!py-4 !text-[10px] font-black tracking-widest uppercase italic !rounded-2xl"
                onClick={onClose}
                type="button"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                fullWidth 
                className="!py-4 !text-[10px] font-black tracking-widest uppercase italic !rounded-2xl shadow-xl hover:shadow-primary/20 shadow-[0_0_30px_rgba(111,38,255,0.2)]"
                type="submit"
                disabled={isSubmitting}
                rightIcon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin ml-2" /> : <Send className="w-4 h-4 ml-2" />}
              >
                {isSubmitting ? 'Transmitting...' : 'Submit Request'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default LicenseRequestModal;
