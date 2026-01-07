import type { Transaction } from "../types/finance";
import { generateId } from "./finance-utils";
import { subDays, format } from "date-fns";

function createTransaction(
  daysAgo: number,
  description: string,
  amount: number,
  type: "income" | "expense",
  category: Transaction["category"]
): Transaction {
  const date = subDays(new Date(), daysAgo);
  return {
    id: generateId(),
    description,
    amount,
    type,
    category,
    date: format(date, "yyyy-MM-dd"),
    createdAt: date.toISOString(),
  };
}

export const DEMO_TRANSACTIONS: Transaction[] = [
  // Recent transactions
  createTransaction(0, "Grocery Shopping", 156, "expense", "food"),
  createTransaction(1, "Monthly Salary", 5200, "income", "work"),
  createTransaction(2, "Netflix Subscription", 15, "expense", "entertainment"),
  createTransaction(3, "Electric Bill", 89, "expense", "utilities"),
  createTransaction(4, "Uber Ride", 24, "expense", "transportation"),
  createTransaction(5, "Freelance Project", 850, "income", "work"),
  createTransaction(6, "Restaurant Dinner", 67, "expense", "food"),
  createTransaction(7, "Gym Membership", 45, "expense", "health"),
  
  // Last week
  createTransaction(8, "Online Shopping", 234, "expense", "shopping"),
  createTransaction(9, "Gas Station", 52, "expense", "transportation"),
  createTransaction(10, "Coffee Shop", 18, "expense", "food"),
  createTransaction(12, "Concert Tickets", 120, "expense", "entertainment"),
  createTransaction(14, "Medical Checkup", 150, "expense", "health"),
  
  // 2-3 weeks ago
  createTransaction(16, "Monthly Salary", 5200, "income", "work"),
  createTransaction(17, "Phone Bill", 65, "expense", "utilities"),
  createTransaction(18, "New Shoes", 89, "expense", "shopping"),
  createTransaction(20, "Weekend Trip", 320, "expense", "travel"),
  createTransaction(21, "Side Gig Payment", 400, "income", "work"),
  createTransaction(22, "Internet Bill", 75, "expense", "utilities"),
  createTransaction(24, "Movie Night", 35, "expense", "entertainment"),
  
  // Last month
  createTransaction(28, "Insurance Premium", 180, "expense", "health"),
  createTransaction(30, "Home Decor", 156, "expense", "shopping"),
  createTransaction(32, "Monthly Salary", 5200, "income", "work"),
  createTransaction(35, "Vacation Booking", 890, "expense", "travel"),
  createTransaction(38, "Birthday Gift", 75, "expense", "shopping"),
  createTransaction(40, "Bonus Payment", 1200, "income", "work"),
  createTransaction(42, "Water Bill", 45, "expense", "utilities"),
  
  // 2 months ago
  createTransaction(50, "Monthly Salary", 5200, "income", "work"),
  createTransaction(55, "Car Maintenance", 280, "expense", "transportation"),
  createTransaction(58, "Streaming Services", 42, "expense", "entertainment"),
  createTransaction(60, "Pharmacy", 32, "expense", "health"),
  
  // 3 months ago
  createTransaction(75, "Monthly Salary", 5200, "income", "work"),
  createTransaction(80, "Electronics", 450, "expense", "shopping"),
  createTransaction(85, "Flight Tickets", 560, "expense", "travel"),
  createTransaction(90, "Dividend Income", 180, "income", "other"),
];
