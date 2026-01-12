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
