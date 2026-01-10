import type { Meta, StoryObj } from "@storybook/react";
import { IncomeExpenseChart } from "./IncomeExpenseChart";
import type { Transaction, DateRange } from "../../types/finance";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";

type Story = StoryObj;

const meta: Meta = {
  title: "Dashboard/IncomeExpenseChart",
  component: IncomeExpenseChart,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

// Mock transaction data
const generateMockTransactions = (monthsBack: number): Transaction[] => {
  const transactions: Transaction[] = [];
  const today = new Date();

  for (let m = 0; m < monthsBack; m++) {
    const monthDate = new Date(today.getFullYear(), today.getMonth() - m, 1);
    const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();

    // Add income transactions
    for (let i = 0; i < 2; i++) {
      const day = Math.floor(Math.random() * daysInMonth) + 1;
      const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
      const dateStr = format(date, "yyyy-MM-dd");

      transactions.push({
        id: `income-${m}-${i}`,
        description: i === 0 ? "Salary" : "Bonus",
        amount: i === 0 ? 3000 : Math.random() * 500 + 200,
        type: "income",
        category: "work",
        date: dateStr,
      });
    }

    // Add expense transactions
    for (let i = 0; i < Math.floor(Math.random() * 10) + 10; i++) {
      const day = Math.floor(Math.random() * daysInMonth) + 1;
      const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
      const dateStr = format(date, "yyyy-MM-dd");

      const categories: Array<"food" | "transportation" | "entertainment" | "utilities" | "health" | "shopping" | "travel" | "work" | "other"> = [
        "food",
        "transportation",
        "entertainment",
        "utilities",
        "health",
        "shopping",
        "other",
      ];
      const category = categories[Math.floor(Math.random() * categories.length)];

      transactions.push({
        id: `expense-${m}-${i}`,
        description: `${category} expense`,
        amount: Math.random() * 200 + 10,
        type: "expense",
        category,
        date: dateStr,
      });
    }
  }

  return transactions;
};

const mockTransactions3Months = generateMockTransactions(3);
const mockTransactions6Months = generateMockTransactions(6);
const mockTransactions12Months = generateMockTransactions(12);
const mockTransactions1Month = generateMockTransactions(1);

export const Default: Story = {
  args: {
    transactions: mockTransactions3Months,
    dateRange: "quarter" as DateRange,
  },
};

export const OneMonth: Story = {
  args: {
    transactions: mockTransactions1Month,
    dateRange: "month" as DateRange,
  },
};

export const ThreeMonths: Story = {
  args: {
    transactions: mockTransactions3Months,
    dateRange: "quarter" as DateRange,
  },
};

export const SixMonths: Story = {
  args: {
    transactions: mockTransactions6Months,
    dateRange: "quarter" as DateRange,
  },
};

export const FullYear: Story = {
  args: {
    transactions: mockTransactions12Months,
    dateRange: "year" as DateRange,
  },
};

export const AllTime: Story = {
  args: {
    transactions: mockTransactions12Months,
    dateRange: "all" as DateRange,
  },
};

export const NoData: Story = {
  args: {
    transactions: [],
    dateRange: "month" as DateRange,
  },
};

export const IncomeExceedsExpenses: Story = {
  args: {
    transactions: [
      {
        id: "1",
        description: "Salary",
        amount: 5000,
        type: "income",
        category: "work",
        date: format(new Date(new Date().getFullYear(), new Date().getMonth(), 1), "yyyy-MM-dd"),
      },
      {
        id: "2",
        description: "Bonus",
        amount: 1000,
        type: "income",
        category: "work",
        date: format(new Date(new Date().getFullYear(), new Date().getMonth(), 15), "yyyy-MM-dd"),
      },
      {
        id: "3",
        description: "Groceries",
        amount: 400,
        type: "expense",
        category: "food",
        date: format(new Date(new Date().getFullYear(), new Date().getMonth(), 5), "yyyy-MM-dd"),
      },
      {
        id: "4",
        description: "Utilities",
        amount: 150,
        type: "expense",
        category: "utilities",
        date: format(new Date(new Date().getFullYear(), new Date().getMonth(), 20), "yyyy-MM-dd"),
      },
    ],
    dateRange: "month" as DateRange,
  },
};

export const ExpensesExceedIncome: Story = {
  args: {
    transactions: [
      {
        id: "1",
        description: "Salary",
        amount: 2000,
        type: "income",
        category: "work",
        date: format(new Date(new Date().getFullYear(), new Date().getMonth(), 1), "yyyy-MM-dd"),
      },
      {
        id: "2",
        description: "Rent",
        amount: 1200,
        type: "expense",
        category: "utilities",
        date: format(new Date(new Date().getFullYear(), new Date().getMonth(), 5), "yyyy-MM-dd"),
      },
      {
        id: "3",
        description: "Groceries",
        amount: 600,
        type: "expense",
        category: "food",
        date: format(new Date(new Date().getFullYear(), new Date().getMonth(), 10), "yyyy-MM-dd"),
      },
      {
        id: "4",
        description: "Entertainment",
        amount: 300,
        type: "expense",
        category: "entertainment",
        date: format(new Date(new Date().getFullYear(), new Date().getMonth(), 20), "yyyy-MM-dd"),
      },
    ],
    dateRange: "month" as DateRange,
  },
};

export const BalancedMonthly: Story = {
  args: {
    transactions: [
      {
        id: "1",
        description: "Salary",
        amount: 3000,
        type: "income",
        category: "work",
        date: format(new Date(new Date().getFullYear(), new Date().getMonth(), 1), "yyyy-MM-dd"),
      },
      {
        id: "2",
        description: "Expenses",
        amount: 3000,
        type: "expense",
        category: "other",
        date: format(new Date(new Date().getFullYear(), new Date().getMonth(), 15), "yyyy-MM-dd"),
      },
    ],
    dateRange: "month" as DateRange,
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
  args: {
    transactions: mockTransactions3Months,
    dateRange: "quarter" as DateRange,
  },
  decorators: [
    (Story) => (
      <div className="dark bg-slate-950 p-4 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export const LightMode: Story = {
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
  args: {
    transactions: mockTransactions3Months,
    dateRange: "quarter" as DateRange,
  },
  decorators: [
    (Story) => (
      <div className="bg-white p-4 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  args: {
    transactions: mockTransactions1Month,
    dateRange: "month" as DateRange,
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
  args: {
    transactions: mockTransactions3Months,
    dateRange: "quarter" as DateRange,
  },
};

export const LargeDataset: Story = {
  args: {
    transactions: generateMockTransactions(24),
    dateRange: "year" as DateRange,
  },
};

export const VariableIncome: Story = {
  args: {
    transactions: [
      {
        id: "1",
        description: "Salary",
        amount: 2500,
        type: "income",
        category: "work",
        date: format(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), "yyyy-MM-dd"),
      },
      {
        id: "2",
        description: "Freelance work",
        amount: 800,
        type: "income",
        category: "work",
        date: format(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 15), "yyyy-MM-dd"),
      },
      {
        id: "3",
        description: "Salary",
        amount: 2500,
        type: "income",
        category: "work",
        date: format(new Date(new Date().getFullYear(), new Date().getMonth(), 1), "yyyy-MM-dd"),
      },
      {
        id: "4",
        description: "Regular expenses",
        amount: 2000,
        type: "expense",
        category: "other",
        date: format(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 10), "yyyy-MM-dd"),
      },
      {
        id: "5",
        description: "Regular expenses",
        amount: 2200,
        type: "expense",
        category: "other",
        date: format(new Date(new Date().getFullYear(), new Date().getMonth(), 10), "yyyy-MM-dd"),
      },
    ],
    dateRange: "quarter" as DateRange,
  },
};
