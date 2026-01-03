import './App.css'
import { BalanceChart } from './components/BalanceChart'
import { CategoryChart } from './components/CategoryChart'
import { MonthlyComparisonChart } from './components/MonthlyComparisonChart'
import { StatsGrid } from './components/StatsGrid'
import { TransactionTable } from './components/TransactionTable'
import { TransactionForm } from './components/TransactionForm'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { Transaction } from './types'
import { mockTransactions } from './types'
import { calculateCategoryTotals, calculateMonthlyComparison, calculateBalanceOverTime } from './utils/dataHelpers'

function App() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', mockTransactions);
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;
  return (
    <div className='min-h-screen p-6 md:p-12'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-8'>
          Financial Analytics Dashboard
        </h1>
        <StatsGrid totalBalance={totalBalance} totalIncome={totalIncome} totalExpenses={totalExpenses} />

        {/* Transaction entry + list */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <TransactionForm onAddTransaction={(tx) => setTransactions(prev => [tx, ...prev])} />
          </div>
          <div className="lg:col-span-2">
            <TransactionTable
              transactions={transactions}
              onDeleteTransaction={(id) => setTransactions(prev => prev.filter(t => t.id !== id))}
            />
          </div>
        </div>

        <div className='mt-8'>
          <div className='h-[400px]'>
            <BalanceChart data={calculateBalanceOverTime(transactions)} />
          </div>
          <div className='h-[400px] mt-6'>
            <CategoryChart data={calculateCategoryTotals(transactions)} />
          </div>
          <div className='h-[400px] mt-6'>
            <MonthlyComparisonChart data={calculateMonthlyComparison(transactions)} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
