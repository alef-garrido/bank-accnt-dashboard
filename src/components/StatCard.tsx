import { ReactNode } from 'react';
import { currencyFormatter } from '../utils/formatters';

interface StatCardProps {
  title: string;
  amount: number;
  icon: ReactNode;
  color: 'blue' | 'green' | 'red';
}

const colorMap = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  red: 'bg-red-50 text-red-600',
};

export const StatCard = ({ title, amount, icon, color }: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
      <div className={`p-3 rounded-lg ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{currencyFormatter(amount)}</p>
      </div>
    </div>
  );
};
