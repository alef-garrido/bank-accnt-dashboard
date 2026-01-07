import type { Category, CategoryInfo, Transaction, DateRange } from "../types/finance";
import { subDays, subMonths, subYears, isAfter, parseISO, startOfDay } from "date-fns";

export const CATEGORIES: Record<Category, CategoryInfo> = {
  food: { label: "Food & Dining", color: "hsl(var(--chart-3))", icon: "🍔" },
  work: { label: "Work & Salary", color: "hsl(var(--chart-7))", icon: "💼" },
  entertainment: { label: "Entertainment", color: "hsl(var(--chart-4))", icon: "🎮" },
  utilities: { label: "Utilities", color: "hsl(var(--chart-5))", icon: "💡" },
  health: { label: "Health", color: "hsl(var(--chart-2))", icon: "🏥" },
  shopping: { label: "Shopping", color: "hsl(var(--chart-1))", icon: "🛍️" },
  transportation: { label: "Transportation", color: "hsl(var(--chart-6))", icon: "🚗" },
  travel: { label: "Travel", color: "hsl(var(--chart-8))", icon: "✈️" },
  other: { label: "Other", color: "hsl(var(--muted-foreground))", icon: "📦" },
};

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function getDateRangeStart(range: DateRange): Date | null {
  const now = new Date();
  switch (range) {
    case "week":
      return subDays(now, 7);
    case "month":
      return subMonths(now, 1);
    case "quarter":
      return subMonths(now, 3);
    case "year":
      return subYears(now, 1);
    case "all":
      return null;
  }
}

export function filterTransactionsByDateRange(
  transactions: Transaction[],
  range: DateRange
): Transaction[] {
  const rangeStart = getDateRangeStart(range);
  if (!rangeStart) return transactions;

  return transactions.filter((t) =>
    isAfter(parseISO(t.date), startOfDay(rangeStart))
  );
}

export function calculateTotals(transactions: Transaction[]) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    income,
    expenses,
    balance: income - expenses,
  };
}

export function getSpendingByCategory(transactions: Transaction[]) {
  const expenses = transactions.filter((t) => t.type === "expense");
  const categoryTotals: Record<string, number> = {};

  expenses.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  return Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    amount,
    label: CATEGORIES[category as Category].label,
    color: CATEGORIES[category as Category].color,
    icon: CATEGORIES[category as Category].icon,
  }));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyCompact(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  return formatCurrency(amount);
}
