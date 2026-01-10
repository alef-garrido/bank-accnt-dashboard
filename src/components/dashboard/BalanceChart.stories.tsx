import type { Meta, StoryObj } from "@storybook/react";
import { BalanceChart } from "./BalanceChart";
import type { Transaction, DateRange } from "../../types/finance";
import { format, subDays } from "date-fns";

type Story = StoryObj;

const meta: Meta = {
  title: "Dashboard/BalanceChart",
  component: BalanceChart,
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

  for (let i = 0; i < daysBack; i++) {
    const date = subDays(today, i);
    const dateStr = format(date, "yyyy-MM-dd");

    // Income transaction every 3 days
    if (i % 3 === 0) {
      transactions.push({
        id: `income-${i}`,
        description: "Salary",
        amount: 2000,
        type: "income",
        category: "salary",
        date: dateStr,
      });
    }

    // Random expenses
    if (i % 2 === 0) {
      transactions.push({
        id: `expense-${i}-1`,
        description: "Groceries",
        amount: Math.random() * 80 + 20,
        type: "expense",
        category: "food",
        date: dateStr,
      });
    }

    if (i % 4 === 1) {
      transactions.push({
        id: `expense-${i}-2`,
        description: "Gas",
        amount: Math.random() * 40 + 30,
        type: "expense",
        category: "transport",
        date: dateStr,
      });
    }
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

export const MinimalData: Story = {
  args: {
    transactions: [
      {
        id: "1",
        description: "Starting Balance",
        amount: 1000,
        type: "income",
        category: "salary",
        date: format(subDays(new Date(), 5), "yyyy-MM-dd"),
      },
      {
        id: "2",
        description: "Coffee",
        amount: 5.5,
        type: "expense",
        category: "food",
        date: format(subDays(new Date(), 4), "yyyy-MM-dd"),
      },
      {
        id: "3",
        description: "Bonus",
        amount: 500,
        type: "income",
        category: "salary",
        date: format(subDays(new Date(), 2), "yyyy-MM-dd"),
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
