import type { Meta, StoryObj } from "@storybook/react";
import { CategoryChart } from "./CategoryChart";
import type { Transaction, DateRange } from "../../types/finance";
import { format, subDays } from "date-fns";

type Story = StoryObj;

const meta: Meta = {
  title: "Dashboard/CategoryChart",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

// Mock transaction data
const generateMockTransactions = (daysBack: number): Transaction[] => {
  const transactions: Transaction[] = [];
  const today = new Date();
  const categories: Array<{ category: "food" | "transport" | "entertainment" | "utilities" | "healthcare" | "shopping" | "other"; amount: number }> = [
    { category: "food", amount: 45 },
    { category: "transport", amount: 35 },
    { category: "entertainment", amount: 60 },
    { category: "utilities", amount: 80 },
    { category: "healthcare", amount: 25 },
    { category: "shopping", amount: 120 },
    { category: "other", amount: 30 },
  ];

  for (let i = 0; i < daysBack; i++) {
    const date = subDays(today, i);
    const dateStr = format(date, "yyyy-MM-dd");

    // Add multiple expense transactions with different categories
    categories.forEach((cat, idx) => {
      if (Math.random() > 0.3) { // 70% chance of transaction
        const variance = (Math.random() - 0.5) * cat.amount * 0.5;
        transactions.push({
          id: `expense-${i}-${idx}`,
          description: `${cat.category} purchase`,
          amount: Math.max(5, cat.amount + variance),
          type: "expense",
          category: cat.category,
          date: dateStr,
        });
      }
    });
  }

  return transactions;
};

const mockTransactionsMonth = generateMockTransactions(30);
const mockTransactionsWeek = generateMockTransactions(7);
const mockTransactionsYear = generateMockTransactions(365);

export const Default: Story = {
  args: {
    transactions: mockTransactionsMonth,
    dateRange: "month" as DateRange,
  },
};

export const WeekView: Story = {
  args: {
    transactions: mockTransactionsWeek,
    dateRange: "week" as DateRange,
  },
};

export const YearView: Story = {
  args: {
    transactions: mockTransactionsYear,
    dateRange: "year" as DateRange,
  },
};

export const QuarterView: Story = {
  args: {
    transactions: generateMockTransactions(90),
    dateRange: "quarter" as DateRange,
  },
};

export const AllTimeView: Story = {
  args: {
    transactions: mockTransactionsYear,
    dateRange: "all" as DateRange,
  },
};

export const NoData: Story = {
  args: {
    transactions: [],
    dateRange: "month" as DateRange,
  },
};

export const SingleCategory: Story = {
  args: {
    transactions: [
      {
        id: "1",
        description: "Groceries",
        amount: 50,
        type: "expense",
        category: "food",
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        id: "2",
        description: "More groceries",
        amount: 75,
        type: "expense",
        category: "food",
        date: format(subDays(new Date(), 1), "yyyy-MM-dd"),
      },
      {
        id: "3",
        description: "Groceries again",
        amount: 60,
        type: "expense",
        category: "food",
        date: format(subDays(new Date(), 2), "yyyy-MM-dd"),
      },
    ],
    dateRange: "week" as DateRange,
  },
};

export const BalancedCategories: Story = {
  args: {
    transactions: [
      {
        id: "1",
        description: "Groceries",
        amount: 100,
        type: "expense",
        category: "food",
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        id: "2",
        description: "Gas",
        amount: 100,
        type: "expense",
        category: "transport",
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        id: "3",
        description: "Movie",
        amount: 100,
        type: "expense",
        category: "entertainment",
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        id: "4",
        description: "Electric bill",
        amount: 100,
        type: "expense",
        category: "utilities",
        date: format(new Date(), "yyyy-MM-dd"),
      },
    ],
    dateRange: "month" as DateRange,
  },
};

export const DominantCategory: Story = {
  args: {
    transactions: [
      {
        id: "1",
        description: "Shopping",
        amount: 500,
        type: "expense",
        category: "shopping",
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        id: "2",
        description: "Groceries",
        amount: 50,
        type: "expense",
        category: "food",
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        id: "3",
        description: "Gas",
        amount: 40,
        type: "expense",
        category: "transport",
        date: format(new Date(), "yyyy-MM-dd"),
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
    transactions: mockTransactionsMonth,
    dateRange: "month" as DateRange,
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
    transactions: mockTransactionsMonth,
    dateRange: "month" as DateRange,
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
    transactions: mockTransactionsWeek,
    dateRange: "week" as DateRange,
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
  args: {
    transactions: mockTransactionsMonth,
    dateRange: "month" as DateRange,
  },
};

export const LargeDataset: Story = {
  args: {
    transactions: generateMockTransactions(365),
    dateRange: "year" as DateRange,
  },
};

export const IncomeOnlyTransactions: Story = {
  args: {
    transactions: [
      {
        id: "1",
        description: "Salary",
        amount: 3000,
        type: "income",
        category: "salary",
        date: format(new Date(), "yyyy-MM-dd"),
      },
      {
        id: "2",
        description: "Bonus",
        amount: 500,
        type: "income",
        category: "salary",
        date: format(new Date(), "yyyy-MM-dd"),
      },
    ],
    dateRange: "month" as DateRange,
  },
};
