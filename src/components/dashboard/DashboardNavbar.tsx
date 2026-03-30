import { Bell, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';


const DashboardNavbar: React.FC = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <div className="flex items-center justify-between p-6 bg-transparent border-b border-[#ffffff05] backdrop-blur-sm sticky top-0 z-40">
      <div className="flex-1 max-w-xl" />

      <div className="flex items-center gap-4 ml-6">
        <Button variant="outline" className="relative !p-2.5 min-w-0" clipped={false}>
          <Bell className="h-6 w-6 text-[#ffffff60] group-hover:text-white transition-colors duration-300" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full border-2 border-[#11111b] animate-sparkle"></span>
        </Button>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleLogout}
          className="flex items-center gap-2 border-[#ffffff10] text-[#ffffff60] hover:text-white hover:bg-[#ffffff0a]"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-xs uppercase tracking-widest hidden sm:inline">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
