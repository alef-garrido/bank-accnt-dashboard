import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { currencyFormatter } from '../utils/formatters';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

const mockData = [
  { name: 'Food', value: 400 },
  { name: 'Rent', value: 1200 },
  { name: 'Transport', value: 200 },
  { name: 'Entertainment', value: 150 },
];

export const CategoryChart = () => {
  // handles `undefined` values from Recharts
  const tooltipFormatter = (value?: number): string =>
    value === undefined ? '—' : currencyFormatter(value);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full w-full flex flex-col min-h-0">
      <h3 className="text-lg font-semibold text-gray-700 mb-4 flex-shrink-0">Spending by Category</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={mockData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {mockData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={tooltipFormatter} />
          <Legend iconType="circle" verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};