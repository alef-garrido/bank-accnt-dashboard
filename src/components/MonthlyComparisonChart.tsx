import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { currencyFormatter } from '../utils/formatters';

const data = [
  { name: 'Jan', income: 4500, expenses: 3100 },
  { name: 'Feb', income: 5200, expenses: 4800 },
  { name: 'Mar', income: 4800, expenses: 3800 },
  { name: 'Apr', income: 6100, expenses: 4200 },
];

export const MonthlyComparisonChart = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[350px] w-full">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Income vs Expenses</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            cursor={{ fill: '#f9fafb' }}
            formatter={(value: number | undefined) => value !== undefined ? currencyFormatter(value) : ''}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend iconType="circle" />
          <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
          <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};