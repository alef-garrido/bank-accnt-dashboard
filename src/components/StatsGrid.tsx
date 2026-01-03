import { HiArrowTrendingUp, HiArrowTrendingDown, HiScale } from 'react-icons/hi2';
import { StatCard } from './StatCard';

interface StatsGridProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

export const StatsGrid = ({ totalBalance, totalIncome, totalExpenses }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        title="Total Balance" 
        amount={totalBalance} 
        icon={<HiScale size={24} />} 
        color="blue" 
      />
      <StatCard 
        title="Total Income" 
        amount={totalIncome} 
        icon={<HiArrowTrendingUp size={24} />} 
        color="green" 
      />
      <StatCard 
        title="Total Expenses" 
        amount={totalExpenses} 
        icon={<HiArrowTrendingDown size={24} />} 
        color="red" 
      />
    </div>
  );
};
