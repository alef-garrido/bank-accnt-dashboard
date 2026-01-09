import { useFinance } from "../contexts/FinanceContext";
import { useToast } from "../hooks/toast-manager";
import type { Transaction } from "../types/finance";

export function useDashboardUtils() {
  const { state, resetToDemo } = useFinance();
  const { toast } = useToast();

  const handleExportCSV = (transactions: Transaction[]) => {
    const headers = ["Date", "Description", "Category", "Type", "Amount"];
    const rows = transactions.map((t) => [
      t.date,
      t.description,
      t.category,
      t.type,
      t.amount.toString(),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `transactions_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    toast({
      title: "Export complete",
      description: `Exported ${transactions.length} transactions to CSV.`, 
    });
  };

  const handleReset = () => {
    resetToDemo();
    toast({
      title: "Data reset",
      description: "Demo data has been restored.",
    });
  };

  return { handleExportCSV, handleReset };
}