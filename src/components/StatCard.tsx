import { type ReactNode } from 'react';
import { currencyFormatter } from '../utils/formatters';

interface StatCardProps {
  title: string;
  amount: number;
  icon: ReactNode;
  color: 'blue' | 'green' | 'red';
}

export const StatCard = ({ title, amount, icon, color }: StatCardProps) => {
  return (
    <div className="text-center grid place-items-center m-4 rounded-lg p-6 shadow-md bg-white w-64">
      <div className={
        color === 'blue' ? 'bg-blue-50 text-blue-600' :
        color === 'green' ? 'bg-green-50 text-green-600' :
        'bg-red-50 text-red-600'
      }>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{currencyFormatter(amount)}</p>
      </div>
    </div>
  );
};
