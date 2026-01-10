import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Calendar } from "./calendar";

type Story = StoryObj;

const meta: Meta = {
  title: "UI/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) => date.getDay() === 0}
        />
      </div>
    );
  },
};

export const SingleDateSelection: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div className="flex flex-col gap-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
        />
        {date && (
          <p className="text-sm text-muted-foreground">
            Selected: {date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </div>
    );
  },
};

export const RangeSelection: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<
      { from?: Date; to?: Date } | undefined
    >();

    return (
      <div className="flex flex-col gap-4">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
        />
        {dateRange?.from && (
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              From: {dateRange.from.toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            {dateRange.to && (
              <p>
                To: {dateRange.to.toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
};

export const MultipleSelection: Story = {
  render: () => {
    const [dates, setDates] = useState<Date[] | undefined>();

    return (
      <div className="flex flex-col gap-4">
        <Calendar
          mode="multiple"
          selected={dates}
          onSelect={setDates}
        />
        {dates && dates.length > 0 && (
          <div className="text-sm text-muted-foreground">
            <p>Selected {dates.length} date(s):</p>
            <ul className="list-disc list-inside">
              {dates.map((date) => (
                <li key={date.toISOString()}>
                  {date.toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};

export const DisabledDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div className="flex flex-col gap-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) => {
            const day = date.getDay();
            const isPastDate = date < new Date(new Date().setHours(0, 0, 0, 0));
            return day === 0 || day === 6 || isPastDate;
          }}
        />
        <p className="text-xs text-muted-foreground">
          Weekends and past dates are disabled
        </p>
      </div>
    );
  },
};

export const SpecificMonth: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(
      new Date(2026, 5, 15)
    );

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        defaultMonth={new Date(2026, 5)}
      />
    );
  },
};

export const MultipleMonths: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<
      { from?: Date; to?: Date } | undefined
    >();

    return (
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={setDateRange}
        numberOfMonths={2}
      />
    );
  },
};

export const WithInitialDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(
      new Date(2026, 0, 15)
    );

    return (
      <div className="flex flex-col gap-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={date}
        />
        {date && (
          <p className="text-sm font-medium">
            Selected Date: {date.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};

export const DateLimits: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    return (
      <div className="flex flex-col gap-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) => date < today || date > nextMonth}
        />
        <p className="text-xs text-muted-foreground">
          Only dates between today and next month are allowed
        </p>
      </div>
    );
  },
};

export const DarkMode: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div className="dark bg-slate-950 p-4 rounded-lg">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
        />
      </div>
    );
  },
};
