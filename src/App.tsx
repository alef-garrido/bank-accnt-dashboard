import './App.css'
import  Dashboard  from './components/dashboard/Dashboard'
import { TooltipProvider } from './components/ui/tooltip'
import { ToastProvider } from './components/ui/toast'
import { Toaster } from './components/ui/toaster'
import { Toaster as SonnerToaster } from './components/ui/sonner'
import { ThemeProvider } from './contexts/ThemeContext'

function AppContent() {
  return (
    <ToastProvider>
      <TooltipProvider>
        <h1 className='text-3xl font-bold my-6 text-center'>
          Financial Analytics Dashboard
        </h1>
        <hr />
        <Dashboard />
        <Toaster />
        <SonnerToaster position="bottom-right" />
      </TooltipProvider>
    </ToastProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
