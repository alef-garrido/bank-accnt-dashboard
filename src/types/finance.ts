export type TransactionType = "income" | "expense";

export type Category = 
  | "food"
  | "work"
  | "entertainment"
  | "utilities"
  | "health"
  | "shopping"
  | "transportation"
  | "travel"
  | "other";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string; // ISO date string
  createdAt: string;
}

export interface FinanceState {
  transactions: Transaction[];
}

export type FinanceAction =
  | { type: "ADD_TRANSACTION"; payload: Omit<Transaction, "id" | "createdAt"> }
  | { type: "DELETE_TRANSACTION"; payload: string }
  | { type: "LOAD_TRANSACTIONS"; payload: Transaction[] }
  | { type: "RESET_TO_DEMO" };

export type DateRange = "week" | "month" | "quarter" | "year" | "all";

export interface CategoryInfo {
  label: string;
  color: string;
  icon: string;
}
