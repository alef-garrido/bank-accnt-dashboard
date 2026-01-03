import './App.css'
import { BalanceChart } from './components/BalanceChart'
import { CategoryChart } from './components/CategoryChart'
import { MonthlyComparisonChart } from './components/MonthlyComparisonChart'
import { StatsGrid } from './components/StatsGrid'

function App() {
  return (
    <div className='min-h-screen p-6 md:p-12'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-8'>
          Financial Analytics Dashboard
        </h1>
        <StatsGrid />
        <div>
          <div className='h-[400px]'>
            <BalanceChart />
          </div>
          <div className='h-[400px]'>
            <CategoryChart />
          </div>
          <div className='h-[400px]'>
            <MonthlyComparisonChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
