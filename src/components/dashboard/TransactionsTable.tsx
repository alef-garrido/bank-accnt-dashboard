import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Search, Trash2, ArrowUpDown } from "lucide-react";
import { format, parseISO } from "date-fns";
import type { Transaction, DateRange } from "../../types/finance";
import { CATEGORIES, formatCurrency, filterTransactionsByDateRange } from "../../lib/finance-utils";
import { useFinance } from "../../contexts/FinanceContext";

interface TransactionsTableProps {
  dateRange: DateRange;
}

type SortField = "date" | "description" | "category" | "amount";
type SortOrder = "asc" | "desc";

export function TransactionsTable({ dateRange }: TransactionsTableProps) {
  const { state, deleteTransaction } = useFinance();
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [visibleCount, setVisibleCount] = useState(10);

  const filteredTransactions = useMemo(() => {
    let filtered = filterTransactionsByDateRange(state.transactions, dateRange);

    // Apply search filter
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(searchLower) ||
          CATEGORIES[t.category].label.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "description":
          comparison = a.description.localeCompare(b.description);
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [state.transactions, dateRange, search, sortField, sortOrder]);

  const visibleTransactions = filteredTransactions.slice(0, visibleCount);
  const hasMore = filteredTransactions.length > visibleCount;

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8 data-[state=open]:bg-accent"
      onClick={() => toggleSort(field)}
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );

  return (
    <Card className="animate-fade-in flex flex-col min-h-96 lg:h-full overflow-hidden" style={{ animationDelay: "300ms" }}>
      <CardHeader className="pb-4 flex-shrink-0 border-b">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 min-h-0 overflow-hidden">
        <div className="rounded-none border-0 border-b flex flex-col flex-1 overflow-hidden max-h-[500px]">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
              <TableRow>
                <TableHead>
                  <SortButton field="date">Date</SortButton>
                </TableHead>
                <TableHead>
                  <SortButton field="description">Description</SortButton>
                </TableHead>
                <TableHead>
                  <SortButton field="category">Category</SortButton>
                </TableHead>
                <TableHead className="text-right">
                  <SortButton field="amount">Amount</SortButton>
                </TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No transactions found.
                  </TableCell>
                </TableRow>
              ) : (
                visibleTransactions.map((transaction, index) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                    onDelete={deleteTransaction}
                    delay={index * 50}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {hasMore && (
          <div className="flex justify-center flex-shrink-0 py-4 px-4 border-t">
            <Button
              variant="outline"
              onClick={() => setVisibleCount((prev) => prev + 10)}
            >
              Load More ({filteredTransactions.length - visibleCount} remaining)
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TransactionRow({
  transaction,
  onDelete,
  delay,
}: {
  transaction: Transaction;
  onDelete: (id: string) => void;
  delay: number;
}) {
  const categoryInfo = CATEGORIES[transaction.category];

  return (
    <TableRow
      className="animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <TableCell className="font-medium">
        {format(parseISO(transaction.date), "MMM d, yyyy")}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span>{categoryInfo.icon}</span>
          <span>{transaction.description}</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant="secondary"
          style={{ backgroundColor: categoryInfo.color + "20", color: categoryInfo.color }}
        >
          {categoryInfo.label}
        </Badge>
      </TableCell>
      <TableCell
        className={`text-right font-semibold ${
          transaction.type === "income" ? "text-success" : "text-destructive"
        }`}
      >
        {transaction.type === "income" ? "+" : "-"}
        {formatCurrency(transaction.amount)}
      </TableCell>
      <TableCell>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete transaction?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete "{transaction.description}" for{" "}
                {formatCurrency(transaction.amount)}. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(transaction.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}
