import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { FinanceProvider } from "../../contexts/FinanceContext";
import { ToastProvider } from "../ui/toast";
import type { DateRange } from "../../types/finance";

type Story = StoryObj;

const meta: Meta = {
  title: "Dashboard/DashboardHeader",
  component: DashboardHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

const DashboardHeaderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <ToastProvider>
    <FinanceProvider>{children}</FinanceProvider>
  </ToastProvider>
);

export const Default: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>("month");
    const [isDark, setIsDark] = useState(false);

    return (
      <DashboardHeaderWrapper>
        <DashboardHeader
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          isDark={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
        />
      </DashboardHeaderWrapper>
    );
  },
};

export const WithWeekRange: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>("week");
    const [isDark, setIsDark] = useState(false);

    return (
      <DashboardHeaderWrapper>
        <DashboardHeader
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          isDark={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
        />
      </DashboardHeaderWrapper>
    );
  },
};

export const WithQuarterRange: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>("quarter");
    const [isDark, setIsDark] = useState(false);

    return (
      <DashboardHeaderWrapper>
        <DashboardHeader
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          isDark={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
        />
      </DashboardHeaderWrapper>
    );
  },
};

export const WithYearRange: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>("year");
    const [isDark, setIsDark] = useState(false);

    return (
      <DashboardHeaderWrapper>
        <DashboardHeader
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          isDark={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
        />
      </DashboardHeaderWrapper>
    );
  },
};

export const WithAllTimeRange: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>("all");
    const [isDark, setIsDark] = useState(false);

    return (
      <DashboardHeaderWrapper>
        <DashboardHeader
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          isDark={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
        />
      </DashboardHeaderWrapper>
    );
  },
};

export const DarkMode: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>("month");
    const [isDark, setIsDark] = useState(true);

    return (
      <div className="dark bg-slate-950 p-4 rounded-lg">
        <DashboardHeaderWrapper>
          <DashboardHeader
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            isDark={isDark}
            onThemeToggle={() => setIsDark(!isDark)}
          />
        </DashboardHeaderWrapper>
      </div>
    );
  },
};

export const LightMode: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>("month");
    const [isDark, setIsDark] = useState(false);

    return (
      <div className="bg-white p-4 rounded-lg">
        <DashboardHeaderWrapper>
          <DashboardHeader
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            isDark={isDark}
            onThemeToggle={() => setIsDark(!isDark)}
          />
        </DashboardHeaderWrapper>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>("month");
    const [isDark, setIsDark] = useState(false);
    const [exported, setExported] = useState(false);

    return (
      <DashboardHeaderWrapper>
        <div className="space-y-4">
          <DashboardHeader
            dateRange={dateRange}
            onDateRangeChange={(range) => {
              setDateRange(range);
              setExported(false);
            }}
            isDark={isDark}
            onThemeToggle={() => setIsDark(!isDark)}
          />
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              Current date range: <strong>{dateRange}</strong>
            </p>
            <p>
              Theme: <strong>{isDark ? "Dark" : "Light"}</strong>
            </p>
          </div>
        </div>
      </DashboardHeaderWrapper>
    );
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>("month");
    const [isDark, setIsDark] = useState(false);

    return (
      <DashboardHeaderWrapper>
        <DashboardHeader
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          isDark={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
        />
      </DashboardHeaderWrapper>
    );
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>("month");
    const [isDark, setIsDark] = useState(false);

    return (
      <DashboardHeaderWrapper>
        <DashboardHeader
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          isDark={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
        />
      </DashboardHeaderWrapper>
    );
  },
};
