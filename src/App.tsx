import './App.css'
import { Dashboard } from './components/Dashboard'
import { TooltipProvider } from './components/ui/tooltip'
import { ToastProvider } from './components/ui/toast'
import { Toaster } from './components/ui/toaster'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { Transaction } from './types'
import { mockTransactions } from './types'

function App() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', mockTransactions);

  return (
    <ToastProvider>
      <TooltipProvider>
        <h1 className='text-3xl font-bold my-6 text-center'>
          Financial Analytics Dashboard
        </h1>
        <hr />
        <Dashboard
          transactions={transactions}
          onAddTransaction={(tx) => setTransactions(prev => [tx, ...prev])}
          onDeleteTransaction={(id) => setTransactions(prev => prev.filter(t => t.id !== id))}
        />
        <Toaster />
      </TooltipProvider>
    </ToastProvider>
  )
}

export default App
