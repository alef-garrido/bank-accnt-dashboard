import { currencyFormatter } from '../utils/formatters';
import type { Transaction } from '../types';

interface TransactionTableProps {
  transactions: Transaction[];
}

export const TransactionTable = ({ transactions }: TransactionTableProps) => {
  return (
    <div className="border border-gray-100 ">
      <div className="border-b border-gray-100 p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <input
            type="text"
            aria-label="Search transactions"
            placeholder="Search transactions..."
            className="px-3 py-2 border border-gray-200 rounded-md text-sm w-64 bg-white"
          />
        </div>
        <button className="text-sm font-medium hover:underline">View All</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead className="text-xs uppercase">
            <tr>
              <th className="font-medium">Date</th>
              <th className="font-medium">Description</th>
              <th className="font-medium">Category</th>
              <th className="font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map((t: Transaction) => (
              <tr key={t.id}>
                <td className="text-sm">{t.date}</td>
                <td className="text-sm font-medium">{t.description}</td>
                <td>
                  <span className="px-2 py-1 text-xs rounded-full">
                    {t.category}
                  </span>
                </td>
                <td className="text-sm text-right">
                  {t.type === 'income' ? '+' : '-'}{currencyFormatter(t.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
