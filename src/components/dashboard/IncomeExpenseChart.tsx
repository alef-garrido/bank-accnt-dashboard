import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format, parseISO, startOfMonth, endOfMonth, eachMonthOfInterval } from "date-fns";
import type { Transaction, DateRange } from "../../types/finance";
import { filterTransactionsByDateRange, formatCurrencyCompact } from "../../lib/finance-utils";

interface IncomeExpenseChartProps {
  transactions: Transaction[];
  dateRange: DateRange;
}

export function IncomeExpenseChart({ transactions, dateRange }: IncomeExpenseChartProps) {
  const chartData = useMemo(() => {
    const filtered = filterTransactionsByDateRange(transactions, dateRange);
    
    if (filtered.length === 0) return [];

    // Get date range for months
    const dates = filtered.map((t) => parseISO(t.date));
    const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

    // Generate months in range
    const months = eachMonthOfInterval({
      start: startOfMonth(minDate),
      end: endOfMonth(maxDate),
    });

    // Aggregate by month
    return months.map((month) => {
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);

      const monthTransactions = filtered.filter((t) => {
        const date = parseISO(t.date);
        return date >= monthStart && date <= monthEnd;
      });

      const income = monthTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

      const expenses = monthTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        month: format(month, "MMM"),
        income,
        expenses,
      };
    });
  }, [transactions, dateRange]);

  if (chartData.length === 0) {
    return (
      <Card className="animate-fade-in" style={{ animationDelay: "500ms" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Income vs Expenses</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center text-muted-foreground">
          No data available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in" style={{ animationDelay: "500ms" }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Income vs Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatCurrencyCompact(value)}
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                formatter={(value: number | undefined, name: string | undefined) => [
                  value !== undefined ? `$${value.toLocaleString()}` : "$0",
                  name ? name.charAt(0).toUpperCase() + name.slice(1) : "",
                ]}
              />
              <Legend
                formatter={(value) => (
                  <span style={{ color: "hsl(var(--foreground))", fontSize: "12px" }}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </span>
                )}
              />
              <Bar
                dataKey="income"
                fill="hsl(var(--chart-7))"
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              />
              <Bar
                dataKey="expenses"
                fill="hsl(var(--chart-3))"
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
