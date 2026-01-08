import './App.css'
import { Dashboard } from './components/Dashboard'
import { TooltipProvider } from './components/ui/tooltip'
import { ToastProvider } from './components/ui/toast'
import { Toaster } from './components/ui/toaster'
import { Toaster as SonnerToaster } from './components/ui/sonner'
import { ThemeProvider } from './contexts/ThemeContext'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { Transaction } from './types'
import { mockTransactions } from './types'

function App() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', mockTransactions);

  return (
    <ThemeProvider>
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
          <SonnerToaster position="bottom-right" />
        </TooltipProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
