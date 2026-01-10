import type { Meta, StoryObj } from "@storybook/react";
import { AddTransactionForm } from "./AddTransactionForm";
import { FinanceProvider } from "../../contexts/FinanceContext";
import { ToastProvider } from "../ui/toast";

type Story = StoryObj;

const meta: Meta = {
  title: "Dashboard/AddTransactionForm",
  component: AddTransactionForm,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

const AddTransactionFormWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <ToastProvider>
    <FinanceProvider>{children}</FinanceProvider>
  </ToastProvider>
);

export const Default: Story = {
  render: () => (
    <AddTransactionFormWrapper>
      <div className="max-w-md">
        <AddTransactionForm />
      </div>
    </AddTransactionFormWrapper>
  ),
};

export const WithFullWidth: Story = {
  render: () => (
    <AddTransactionFormWrapper>
      <AddTransactionForm />
    </AddTransactionFormWrapper>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-slate-950 p-4 rounded-lg">
      <AddTransactionFormWrapper>
        <div className="max-w-md">
          <AddTransactionForm />
        </div>
      </AddTransactionFormWrapper>
    </div>
  ),
};

export const LightMode: Story = {
  render: () => (
    <div className="bg-white p-4 rounded-lg">
      <AddTransactionFormWrapper>
        <div className="max-w-md">
          <AddTransactionForm />
        </div>
      </AddTransactionFormWrapper>
    </div>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => (
    <AddTransactionFormWrapper>
      <AddTransactionForm />
    </AddTransactionFormWrapper>
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
  render: () => (
    <AddTransactionFormWrapper>
      <div className="max-w-2xl">
        <AddTransactionForm />
      </div>
    </AddTransactionFormWrapper>
  ),
};

export const WithMargin: Story = {
  render: () => (
    <AddTransactionFormWrapper>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Add a new transaction</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Track your income and expenses
          </p>
        </div>
        <div className="max-w-md">
          <AddTransactionForm />
        </div>
      </div>
    </AddTransactionFormWrapper>
  ),
};
