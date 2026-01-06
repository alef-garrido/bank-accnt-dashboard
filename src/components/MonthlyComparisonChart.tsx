import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { currencyFormatter } from '../utils/formatters';

const defaultData: { name: string; income: number; expenses: number }[] = [];

interface MonthlyComparisonChartProps {
  data?: { name: string; income: number; expenses: number }[];
}

export const MonthlyComparisonChart = ({ data }: MonthlyComparisonChartProps) => {
  const chartData = data ?? defaultData;

  if (!chartData || chartData.length === 0) {
    return (
      <div className="w-full h-96 bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
        <p className="text-gray-500">No hay datos de ingresos vs gastos disponibles.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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