import { useState, useEffect, useMemo } from "react";
import { FinanceProvider, useFinance } from "../../contexts/FinanceContext";
import type { DateRange } from "../../types/finance";
import { filterTransactionsByDateRange, calculateTotals } from "../../lib/finance-utils";
import { DashboardHeader } from "./DashboardHeader";
import { StatCard } from "./StatCard";
import { AddTransactionForm } from "./AddTransactionForm";
import { TransactionsTable } from "./TansactionsTable";

function DashboardContent() {
  const { state } = useFinance();
  const [dateRange, setDateRange] = useState<DateRange>("month");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  const filteredTransactions = useMemo(
    () => filterTransactionsByDateRange(state.transactions, dateRange),
    [state.transactions, dateRange]
  );

  const totals = useMemo(
    () => calculateTotals(filteredTransactions),
    [filteredTransactions]
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 space-y-6">
        {/* Header */}
        <DashboardHeader
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          isDark={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
        />

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Total Balance"
            value={totals.balance}
            type="balance"
            delay={0}
          />
          <StatCard
            title="Total Income"
            value={totals.income}
            type="income"
            delay={100}
          />
          <StatCard
            title="Total Expenses"
            value={totals.expenses}
            type="expense"
            delay={200}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Add Transaction Form */}
          <div className="lg:col-span-1">
            <AddTransactionForm />
          </div>

          {/* Transactions Table */}
          <div className="lg:col-span-2">
            <TransactionsTable dateRange={dateRange} />
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* <BalanceChart transactions={state.transactions} dateRange={dateRange} />
          <CategoryChart transactions={state.transactions} dateRange={dateRange} />
          <IncomeExpenseChart transactions={state.transactions} dateRange={dateRange} /> */}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <FinanceProvider>
      <DashboardContent />
    </FinanceProvider>
  );
}
