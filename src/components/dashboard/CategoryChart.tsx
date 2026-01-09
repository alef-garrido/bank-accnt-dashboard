import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import type { Transaction, DateRange } from "../../types/finance";
import { filterTransactionsByDateRange, getSpendingByCategory, formatCurrency } from "../../lib/finance-utils";

interface CategoryChartProps {
  transactions: Transaction[];
  dateRange: DateRange;
}

export function CategoryChart({ transactions, dateRange }: CategoryChartProps) {
  const chartData = useMemo(() => {
    const filtered = filterTransactionsByDateRange(transactions, dateRange);
    return getSpendingByCategory(filtered);
  }, [transactions, dateRange]);

  if (chartData.length === 0) {
    return (
      <Card className="animate-fade-in" style={{ animationDelay: "450ms" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Spending by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center text-muted-foreground">
          No expenses in this period
        </CardContent>
      </Card>
    );
  }

  const total = chartData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card className="animate-fade-in" style={{ animationDelay: "450ms" }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="amount"
                nameKey="label"
                animationDuration={1000}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number | undefined, name: string | undefined) => [
                  value !== undefined
                    ? `${formatCurrency(value)} (${((value / total) * 100).toFixed(1)}%)`
                    : "$0 (0%)",
                  name || "",
                ]}
              />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                formatter={(value) => (
                  <span style={{ color: "hsl(var(--foreground))", fontSize: "12px" }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
