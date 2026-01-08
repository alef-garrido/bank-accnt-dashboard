import { BalanceChart } from './BalanceChart'
import { CategoryChart } from './CategoryChart'
import { MonthlyComparisonChart } from './MonthlyComparisonChart'
import { StatsGrid } from './StatsGrid'
import { TransactionTable } from './TransactionTable'
import { TransactionForm } from './TransactionForm'
import type { Transaction } from '../types'
import { calculateCategoryTotals, calculateMonthlyComparison, calculateBalanceOverTime } from '../utils/dataHelpers'

interface DashboardProps {
  transactions: Transaction[];
  onAddTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
}

export function Dashboard({ transactions, onAddTransaction, onDeleteTransaction }: DashboardProps) {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='md:px-4'>
        <div className='mb-2'>
          <StatsGrid totalBalance={totalBalance} totalIncome={totalIncome} totalExpenses={totalExpenses} />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-2'>
          <div className="md:col-span-2 lg:col-span-1">
            <TransactionForm onAddTransaction={onAddTransaction} />
          </div>
          <div className="md:col-span-2 lg:col-span-2">
            <TransactionTable
              transactions={transactions}
              onDeleteTransaction={onDeleteTransaction}
            />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
          <div className='h-[400px]'>
            <BalanceChart data={calculateBalanceOverTime(transactions)} />
          </div>
          <div className='h-[400px]'>
            <CategoryChart data={calculateCategoryTotals(transactions)} />
          </div>
          <div className='h-[400px]'>
            <MonthlyComparisonChart data={calculateMonthlyComparison(transactions)} />
          </div>
        </div>
      </div>
    </div>
  )
}
