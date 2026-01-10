import type { Meta, StoryObj } from "@storybook/react";
import { TransactionsTable } from "./TransactionsTable";
import { FinanceProvider } from "../../contexts/FinanceContext";
import type { Transaction, DateRange } from "../../types/finance";
import { format, subDays } from "date-fns";

type Story = StoryObj;

const meta: Meta = {
  title: "Dashboard/TransactionsTable",
  component: TransactionsTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

// Mock transaction data
const generateMockTransactions = (count: number, daysBack: number = 30): Transaction[] => {
  const transactions: Transaction[] = [];
  const categories: Array<"food" | "transportation" | "entertainment" | "utilities" | "health" | "shopping" | "travel" | "work" | "other"> = [
    "food",
    "transportation",
    "entertainment",
    "utilities",
    "health",
    "shopping",
    "travel",
    "work",
    "other",
  ];

  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * daysBack);
    const date = subDays(new Date(), daysAgo);
    const isIncome = Math.random() > 0.7;
    const category = isIncome ? "work" : categories[Math.floor(Math.random() * (categories.length - 1))];

    transactions.push({
      id: `tx-${i}`,
      description: isIncome 
        ? ["Salary", "Bonus", "Freelance work", "Investment returns"][Math.floor(Math.random() * 4)]
        : ["Groceries", "Gas", "Movie tickets", "Restaurant", "Online shopping", "Gym membership", "Coffee", "Uber ride", "Book purchase", "Electricity bill"][Math.floor(Math.random() * 10)],
      amount: isIncome ? Math.random() * 2000 + 1000 : Math.random() * 300 + 10,
      type: isIncome ? "income" : "expense",
      category,
      date: format(date, "yyyy-MM-dd"),
    });
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const TransactionsTableWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <FinanceProvider>
    {children}
  </FinanceProvider>
);

export const Default: Story = {
  args: {
    dateRange: "month" as DateRange,
  },
  decorators: [
    (Story) => (
      <TransactionsTableWrapper>
        <Story />
      </TransactionsTableWrapper>
    ),
  ],
};

export const WeekView: Story = {
  args: {
    dateRange: "week" as DateRange,
  },
  decorators: [
    (Story) => (
      <TransactionsTableWrapper>
        <Story />
      </TransactionsTableWrapper>
    ),
  ],
};

export const MonthView: Story = {
  args: {
    dateRange: "month" as DateRange,
  },
  decorators: [
    (Story) => (
      <TransactionsTableWrapper>
        <Story />
      </TransactionsTableWrapper>
    ),
  ],
};

export const QuarterView: Story = {
  args: {
    dateRange: "quarter" as DateRange,
  },
  decorators: [
    (Story) => (
      <TransactionsTableWrapper>
        <Story />
      </TransactionsTableWrapper>
    ),
  ],
};

export const YearView: Story = {
  args: {
    dateRange: "year" as DateRange,
  },
  decorators: [
    (Story) => (
      <TransactionsTableWrapper>
        <Story />
      </TransactionsTableWrapper>
    ),
  ],
};

export const AllTimeView: Story = {
  args: {
    dateRange: "all" as DateRange,
  },
  decorators: [
    (Story) => (
      <TransactionsTableWrapper>
        <Story />
      </TransactionsTableWrapper>
    ),
  ],
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
  args: {
    dateRange: "month" as DateRange,
  },
  decorators: [
    (Story) => (
      <div className="dark bg-slate-950 p-4 rounded-lg">
        <TransactionsTableWrapper>
          <Story />
        </TransactionsTableWrapper>
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
    dateRange: "month" as DateRange,
  },
  decorators: [
    (Story) => (
      <div className="bg-white p-4 rounded-lg">
        <TransactionsTableWrapper>
          <Story />
        </TransactionsTableWrapper>
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
    dateRange: "week" as DateRange,
  },
  decorators: [
    (Story) => (
      <TransactionsTableWrapper>
        <Story />
      </TransactionsTableWrapper>
    ),
  ],
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
  args: {
    dateRange: "month" as DateRange,
  },
  decorators: [
    (Story) => (
      <TransactionsTableWrapper>
        <Story />
      </TransactionsTableWrapper>
    ),
  ],
};
