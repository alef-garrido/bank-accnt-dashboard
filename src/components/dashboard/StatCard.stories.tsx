import type { Meta, StoryObj } from "@storybook/react";
import { StatCard } from "./StatCard";

type Story = StoryObj;

const meta: Meta = {
  title: "Dashboard/StatCard",
  component: StatCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const BalanceCard: Story = {
  args: {
    title: "Total Balance",
    value: 5250,
    type: "balance",
  },
};

export const BalanceCardWithTrend: Story = {
  args: {
    title: "Total Balance",
    value: 5250,
    trend: 12.5,
    type: "balance",
  },
};

export const IncomeCard: Story = {
  args: {
    title: "Total Income",
    value: 8500,
    type: "income",
  },
};

export const IncomeCardWithPositiveTrend: Story = {
  args: {
    title: "Total Income",
    value: 8500,
    trend: 15.3,
    type: "income",
  },
};

export const IncomeCardWithNegativeTrend: Story = {
  args: {
    title: "Total Income",
    value: 8500,
    trend: -5.2,
    type: "income",
  },
};

export const ExpenseCard: Story = {
  args: {
    title: "Total Expenses",
    value: 3250,
    type: "expense",
  },
};

export const ExpenseCardWithPositiveTrend: Story = {
  args: {
    title: "Total Expenses",
    value: 3250,
    trend: 8.7,
    type: "expense",
  },
};

export const ExpenseCardWithNegativeTrend: Story = {
  args: {
    title: "Total Expenses",
    value: 3250,
    trend: -12.4,
    type: "expense",
  },
};

export const LargeValue: Story = {
  args: {
    title: "Total Balance",
    value: 125750.50,
    trend: 5.2,
    type: "balance",
  },
};

export const SmallValue: Story = {
  args: {
    title: "Total Expenses",
    value: 45.75,
    trend: -2.1,
    type: "expense",
  },
};

export const WithDelay: Story = {
  args: {
    title: "Total Balance",
    value: 5250,
    trend: 12.5,
    type: "balance",
    delay: 200,
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
  args: {
    title: "Total Balance",
    value: 5250,
    trend: 12.5,
    type: "balance",
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
    title: "Total Balance",
    value: 5250,
    trend: 12.5,
    type: "balance",
  },
  decorators: [
    (Story) => (
      <div className="bg-white p-4 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export const Multiple: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard title="Total Balance" value={5250} trend={12.5} type="balance" />
      <StatCard title="Total Income" value={8500} trend={15.3} type="income" />
      <StatCard title="Total Expenses" value={3250} trend={-12.4} type="expense" />
    </div>
  ),
};

export const MultipleAnimated: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard title="Total Balance" value={5250} trend={12.5} type="balance" delay={0} />
      <StatCard title="Total Income" value={8500} trend={15.3} type="income" delay={100} />
      <StatCard title="Total Expenses" value={3250} trend={-12.4} type="expense" delay={200} />
    </div>
  ),
};

export const VariedTrends: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard title="Balance (Up)" value={5250} trend={25.8} type="balance" />
        <StatCard title="Balance (Down)" value={5250} trend={-10.3} type="balance" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard title="Income (Up)" value={8500} trend={20.5} type="income" />
        <StatCard title="Income (Down)" value={8500} trend={-8.2} type="income" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard title="Expenses (Up)" value={3250} trend={15.1} type="expense" />
        <StatCard title="Expenses (Down)" value={3250} trend={-20.7} type="expense" />
      </div>
    </div>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  args: {
    title: "Total Balance",
    value: 5250,
    trend: 12.5,
    type: "balance",
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
  args: {
    title: "Total Balance",
    value: 5250,
    trend: 12.5,
    type: "balance",
  },
};

export const NoTrend: Story = {
  args: {
    title: "Total Balance",
    value: 5250,
    type: "balance",
  },
};

export const ZeroValue: Story = {
  args: {
    title: "Total Balance",
    value: 0,
    type: "balance",
  },
};

export const NegativeBalance: Story = {
  args: {
    title: "Total Balance",
    value: -500,
    trend: -15.2,
    type: "balance",
  },
};
