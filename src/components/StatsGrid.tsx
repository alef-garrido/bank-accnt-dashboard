import { HiArrowTrendingUp, HiArrowTrendingDown, HiScale } from 'react-icons/hi2';
import { StatCard } from './StatCard';

interface StatsGridProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

export const StatsGrid = ({ totalBalance, totalIncome, totalExpenses }: StatsGridProps) => {
  return (
    <div className="grid justify-center md:flex md:m-4 md:gap-6">
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
