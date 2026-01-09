import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatCurrency } from "../../lib/finance-utils";

interface StatCardProps {
  title: string;
  value: number;
  trend?: number;
  type: "balance" | "income" | "expense";
  delay?: number;
}

export function StatCard({ title, value, trend, type, delay = 0 }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(interval);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const gradientClass = {
    balance: "gradient-success",
    income: "gradient-info",
    expense: "gradient-warning",
  }[type];

  const Icon = {
    balance: Wallet,
    income: TrendingUp,
    expense: TrendingDown,
  }[type];

  const TrendIcon = trend && trend > 0 ? ArrowUpRight : ArrowDownRight;
  const trendColor = trend && trend > 0 
    ? type === "expense" ? "text-destructive" : "text-success"
    : type === "expense" ? "text-success" : "text-destructive";

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight">
              {type === "expense" ? "-" : ""}{formatCurrency(displayValue)}
            </p>
            {trend !== undefined && (
              <div className={`flex items-center gap-1 text-sm font-medium ${trendColor}`}>
                <TrendIcon className="h-4 w-4" />
                <span>{Math.abs(trend).toFixed(1)}%</span>
                <span className="text-muted-foreground font-normal">vs last period</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-xl text-white ${gradientClass}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
