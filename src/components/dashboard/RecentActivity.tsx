import { CheckCircle, ShoppingCart, Share2, Send, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import { useActivityStore } from '../../store/activityStore';
import { useEffect, useState } from 'react';

const formatTimeAgo = (timestamp: number) => {
  const diffInMinutes = Math.floor((Date.now() - timestamp) / 60000);
  if (diffInMinutes < 1) return 'JUST NOW';
  if (diffInMinutes < 60) return `${diffInMinutes} MINS AGO`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} HOURS AGO`;
  return `${Math.floor(diffInHours / 24)} DAYS AGO`;
};

const getIconForType = (type: string) => {
  switch (type) {
    case 'registration':
      return { icon: <Share2 className="w-5 h-5 text-primary" />, bg: 'bg-primary/10' };
    case 'verification':
      return { icon: <CheckCircle className="w-5 h-5 text-green-400" />, bg: 'bg-green-400/10' };
    case 'purchase':
      return { icon: <ShoppingCart className="w-5 h-5 text-orange-400" />, bg: 'bg-orange-400/10' };
    case 'request_sent':
      return { icon: <Send className="w-5 h-5 text-blue-400" />, bg: 'bg-blue-400/10' };
    case 'request_received':
      return { icon: <Mail className="w-5 h-5 text-yellow-400" />, bg: 'bg-yellow-400/10' };
    default:
      return { icon: <Share2 className="w-5 h-5 text-primary" />, bg: 'bg-primary/10' };
  }
};

const RecentActivity: React.FC = () => {
  const { activities } = useActivityStore();
  
  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-8 bg-[#ffffff0a] border border-[#ffffff10] rounded-[32px] overflow-hidden relative group shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-xs font-header tracking-[0.2em] text-[#ffffff40]">RECENT ACTIVITY</h4>
        <Button variant="ghost" size="sm" className="!text-[10px] tracking-widest text-primary hover:text-white" clipped={false}>
          EXPORT LEDGER
        </Button>
      </div>

      <div className="space-y-6">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xs font-header tracking-widest text-[#ffffff30] uppercase italic">No recent activity detected.</p>
          </div>
        ) : activities.slice(0, 5).map((activity) => {
          const { icon, bg } = getIconForType(activity.type);
          return (
            <div key={activity.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 group/item cursor-pointer">
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${bg} border border-white/5 group-hover/item:scale-110 transition-transform`}>
                  {icon}
                </div>
                <div>
                  <h5 className="text-sm font-medium text-[#ffffffcf] group-hover/item:text-white transition-colors">
                    {activity.title}
                  </h5>
                  <p className="text-[10px] font-header tracking-wider text-[#ffffff30] group-hover/item:text-[#ffffff50]">
                    {activity.subtitle}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-header tracking-tighter text-[#ffffff20] group-hover/item:text-primary transition-colors uppercase">
                  {formatTimeAgo(activity.timestamp)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Decorative chart-like bars in bottom right */}
      <div className="absolute bottom-6 right-8 flex items-end gap-1 opacity-20 group-hover:opacity-40 transition-opacity">
        {[20, 35, 25, 45, 30].map((h, i) => (
          <div key={i} className="w-1.5 bg-primary rounded-full transition-all duration-500" style={{ height: `${h}px` }}></div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
