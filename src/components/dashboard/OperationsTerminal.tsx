import { FileText, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const OperationsTerminal: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="p-8 bg-[#ffffff0a] border border-[#ffffff10] rounded-[24px] space-y-8 relative overflow-hidden group shadow-2xl">
      <div className="relative z-10">
        <h4 className="text-xs font-header tracking-[0.2em] text-[#ffffff40] mb-6">OPERATIONS TERMINAL</h4>
        
        <div className="space-y-4">
          <Button 
            variant="primary" 
            fullWidth 
            leftIcon={<FileText className="w-5 h-5" />}
          >
            Create license
          </Button>

          <Button 
            variant="outline" 
            fullWidth 
            leftIcon={<ShieldCheck className="w-5 h-5" />}
            onClick={() => navigate('/dashboard/verify')}
          >
            Verify Document
          </Button>
        </div>
      </div>

      {/* Decoration circle */}
      <div className="absolute top-1/2 -right-12 w-48 h-48 border border-white/5 rounded-full filter blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
    </div>
  );
};

export default OperationsTerminal;
