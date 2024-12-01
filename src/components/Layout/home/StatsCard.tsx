
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  trend: number;
  icon: LucideIcon;
  color: string;
}

const StatsCard = ({ title, value, trend, icon: Icon, color }: StatsCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm dark:text-white dark:bg-black">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-semibold  mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend >= 0 ? '+' : ''}{trend}%
        </span>
        <span className="text-gray-500 text-sm ml-2">vs mes anterior</span>
      </div>
    </div>
  );
};

export default StatsCard;