import { Moon, Sun, RotateCcw, Download } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { DateRange } from "../../types/finance";
import { useFinance } from "../../context/FinanceContext";
import { useToast } from "../../hooks/toast-manager";

interface DashboardHeaderProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

export function DashboardHeader({
  dateRange,
  onDateRangeChange,
  isDark,
  onThemeToggle,
}: DashboardHeaderProps) {
  const { state, resetToDemo } = useFinance();
  const { toast } = useToast();



  const handleReset = () => {
    resetToDemo();
    toast({
      title: "Data reset",
      description: "Demo data has been restored.",
    });
  };

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-chart-4 bg-clip-text text-transparent">
          Finance Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your income and expenses
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select value={dateRange} onValueChange={(v) => onDateRangeChange(v as DateRange)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last 7 days</SelectItem>
            <SelectItem value="month">Last month</SelectItem>
            <SelectItem value="quarter">Last 3 months</SelectItem>
            <SelectItem value="year">Last year</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon" >
          <Download className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="icon" onClick={handleReset}>
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="icon" onClick={onThemeToggle}>
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  );
}
