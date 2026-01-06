import { currencyFormatter } from '../utils/formatters';
import { HiTrash } from 'react-icons/hi2';
import type { Transaction } from '../types';

interface TransactionTableProps {
  transactions: Transaction[];
  onDeleteTransaction?: (id: string) => void;
}

export const TransactionTable = ({ transactions, onDeleteTransaction }: TransactionTableProps) => {
  return (
    <div className="h-75 p-6 border border-gray-100 rounded-lg shadow-md bg-white overflow-y-scroll">
      <div className="border-b border-gray-100 p-4 md:flex justify-between items-center">
        <div className="md:flex items-center gap-4">
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

      {transactions.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          <p className="text-sm">No hay transacciones aún. ¡Agrega la primera para ver tus estadísticas!</p>
        </div>
      ) : (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead className="text-xs uppercase">
            <tr>
              <th className="font-medium">Date</th>
              <th className="font-medium">Description</th>
              <th className="font-medium">Category</th>
              <th className="font-medium text-right">Amount</th>
              <th className="font-medium">&nbsp;</th>
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
                <td className="text-sm text-right">
                  {onDeleteTransaction && (
                    <button
                      aria-label={`Delete transaction ${t.description}`}
                      title="Delete"
                      className="inline-flex items-center justify-center px-2 py-1 text-sm rounded-md text-red-600 hover:bg-red-50"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this transaction?')) {
                          onDeleteTransaction(t.id);
                        }
                      }}
                    >
                      <HiTrash />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};
