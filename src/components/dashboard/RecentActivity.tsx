import { CheckCircle, ShoppingCart, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'registration',
      title: 'Asset "Genesis_v01.pdf" registered',
      subtitle: 'HASH: 0X82...F92A',
      time: '14 MINS AGO',
      icon: <Share2 className="w-5 h-5 text-primary" />,
      iconBg: 'bg-primary/10',
    },
    {
      id: 2,
      type: 'verification',
      title: 'Verification successful: contract_04.doc',
      subtitle: 'GLOBAL CONSENSUS: 99.8%',
      time: '2 HOURS AGO',
      icon: <CheckCircle className="w-5 h-5 text-green-400" />,
      iconBg: 'bg-green-400/10',
    },
    {
      id: 3,
      type: 'purchase',
      title: 'License purchased: Industrial_Blueprints_v4',
      subtitle: 'BUYER: OXEF...1102',
      time: '5 HOURS AGO',
      icon: <ShoppingCart className="w-5 h-5 text-orange-400" />,
      iconBg: 'bg-orange-400/10',
    },
  ];

  return (
    <div className="p-8 bg-[#ffffff0a] border border-[#ffffff10] rounded-[32px] overflow-hidden relative group shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-xs font-header tracking-[0.2em] text-[#ffffff40]">RECENT ACTIVITY</h4>
        <Button variant="ghost" size="sm" className="!text-[10px] tracking-widest text-primary hover:text-white" clipped={false}>
          EXPORT LEDGER
        </Button>
      </div>

      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 group/item cursor-pointer">
            <div className="flex items-center gap-5">
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${activity.iconBg} border border-white/5 group-hover/item:scale-110 transition-transform`}>
                {activity.icon}
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
              <span className="text-[9px] font-header tracking-tighter text-[#ffffff20] group-hover/item:text-primary transition-colors">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
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
