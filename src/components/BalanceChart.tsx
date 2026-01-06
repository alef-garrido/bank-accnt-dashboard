import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { currencyFormatter } from '../utils/formatters';

const defaultData: { date: string; balance: number }[] = [];

interface BalanceChartProps {
  data?: { date: string; balance: number }[];
}

export const BalanceChart = ({ data }: BalanceChartProps) => {
  const chartData = data ?? defaultData;
  
  if (!chartData || chartData.length === 0) {
    return (
      <div className="shadow-sm h-full flex flex-col min-h-0 justify-center items-center bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-sm">No hay datos de balance disponibles.</p>
      </div>
    );
  }
  
  // handles `undefined` values 
  const tooltipFormatter: (value?: number) => [string, 'Balance'] = (value) => [
    value === undefined ? '—' : currencyFormatter(value),
    'Balance',
  ];
  return (
    <div className="shadow-sm h-full flex flex-col min-h-0 bg-white rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4 flex-shrink-0">Balance Over Time</h3>
      <div className="flex-grow px-8 min-h-0"> 
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12 }} 
          />
          <YAxis/>
          <Tooltip
            formatter={tooltipFormatter}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Line 
            type="monotone" 
            dataKey="balance" 
            stroke="#3b82f6" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#3b82f6' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};