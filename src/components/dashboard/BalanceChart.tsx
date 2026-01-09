import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import type { Transaction, DateRange } from "../../types/finance";
import { filterTransactionsByDateRange, formatCurrencyCompact } from "../../lib/finance-utils";

interface BalanceChartProps {
  transactions: Transaction[];
  dateRange: DateRange;
}

export function BalanceChart({ transactions, dateRange }: BalanceChartProps) {
  const chartData = useMemo(() => {
    const filtered = filterTransactionsByDateRange(transactions, dateRange);
    
    // Sort by date ascending
    const sorted = [...filtered].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Group by date and calculate running balance
    const dailyData: Record<string, { income: number; expense: number }> = {};
    
    sorted.forEach((t) => {
      if (!dailyData[t.date]) {
        dailyData[t.date] = { income: 0, expense: 0 };
      }
      if (t.type === "income") {
        dailyData[t.date].income += t.amount;
      } else {
        dailyData[t.date].expense += t.amount;
      }
    });

    let runningBalance = 0;
    return Object.entries(dailyData).map(([date, { income, expense }]) => {
      runningBalance += income - expense;
      return {
        date,
        balance: runningBalance,
        formattedDate: format(parseISO(date), "MMM d"),
      };
    });
  }, [transactions, dateRange]);

  if (chartData.length === 0) {
    return (
      <Card className="animate-fade-in" style={{ animationDelay: "400ms" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Balance Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center text-muted-foreground">
          No data available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in" style={{ animationDelay: "400ms" }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Balance Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="formattedDate"
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
                formatter={(value: number | undefined) => [value !== undefined ? `$${value.toLocaleString()}` : "$0", "Balance"]}
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                fill="url(#balanceGradient)"
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
