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
    <>
      <h1 className='text-3xl font-bold my-6 text-center'>
        Financial Analytics Dashboard
      </h1>
      <hr />

      <div className='bg-gray-100 min-h-screen'>
        <div className='md:px-4'>
          <div className='mb-2'>
            <StatsGrid totalBalance={totalBalance} totalIncome={totalIncome} totalExpenses={totalExpenses} />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-2'>
            <div className="md:col-span-2 lg:col-span-1">
              <TransactionForm onAddTransaction={(tx) => setTransactions(prev => [tx, ...prev])} />
            </div>
            <div className="md:col-span-2 lg:col-span-2">
              <TransactionTable
                transactions={transactions}
                onDeleteTransaction={(id) => setTransactions(prev => prev.filter(t => t.id !== id))}
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
    </>
  )
}

export default App
