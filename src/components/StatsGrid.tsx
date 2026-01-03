import { HiArrowTrendingUp, HiArrowTrendingDown, HiScale } from 'react-icons/hi2';
import { StatCard } from './StatCard';

export const StatsGrid = () => {
  // Estos datos luego vendrán de tu estado global/localstorage
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        title="Total Balance" 
        amount={12450.0} 
        icon={<HiScale size={24} />} 
        color="blue" 
      />
      <StatCard 
        title="Total Income" 
        amount={8200.0} 
        icon={<HiArrowTrendingUp size={24} />} 
        color="green" 
      />
      <StatCard 
        title="Total Expenses" 
        amount={3750.0} 
        icon={<HiArrowTrendingDown size={24} />} 
        color="red" 
      />
    </div>
  );
};
