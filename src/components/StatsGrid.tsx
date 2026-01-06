import { HiArrowTrendingUp, HiArrowTrendingDown, HiScale } from 'react-icons/hi2';
import { StatCard } from './StatCard';

interface StatsGridProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

export const StatsGrid = ({ totalBalance, totalIncome, totalExpenses }: StatsGridProps) => {
  return (
    <div className="flex m-4 gap-6 justify-center">
      <StatCard 
        title="Total Balance" 
        amount={totalBalance} 
        icon={<HiScale size={32} />} 
        color="blue" 
      />
      <StatCard 
        title="Total Income" 
        amount={totalIncome} 
        icon={<HiArrowTrendingUp size={32} />} 
        color="green" 
      />
      <StatCard 
        title="Total Expenses" 
        amount={totalExpenses} 
        icon={<HiArrowTrendingDown size={32} />} 
        color="red" 
      />
    </div>
  );
};
