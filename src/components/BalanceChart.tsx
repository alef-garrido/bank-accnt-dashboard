import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { currencyFormatter } from '../utils/formatters';

const defaultData = [
  { date: 'Jan', balance: 2000 },
  { date: 'Feb', balance: 2500 },
  { date: 'Mar', balance: 2200 },
  { date: 'Apr', balance: 3000 },
  { date: 'May', balance: 3200 },
  { date: 'Jun', balance: 2800 },
  { date: 'Jul', balance: 3500 },
  { date: 'Aug', balance: 3700 },
  { date: 'Sep', balance: 3600 },
  { date: 'Oct', balance: 4000 },
  { date: 'Nov', balance: 4200 },
  { date: 'Dec', balance: 4500 },
];

interface BalanceChartProps {
  data?: { date: string; balance: number }[];
}

export const BalanceChart = ({ data }: BalanceChartProps) => {
  const chartData = data ?? defaultData;
  // handles `undefined` values 
  const tooltipFormatter: (value?: number) => [string, 'Balance'] = (value) => [
    value === undefined ? '—' : currencyFormatter(value),
    'Balance',
  ];
  return (
    <div className="shadow-sm h-full flex flex-col min-h-0">
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