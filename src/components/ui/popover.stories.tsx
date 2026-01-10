import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Button } from "./button";
import { Input } from "./input";
import { Calendar } from "./calendar";

type Story = StoryObj;

const meta: Meta = {
  title: "UI/Popover",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Popover Content</h4>
          <p className="text-sm text-muted-foreground">
            This is some popover content.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithInput: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Search</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-3">
            <h4 className="font-medium leading-none">Search</h4>
            <Input
              placeholder="Type to search..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
            />
            {value && (
              <p className="text-sm text-muted-foreground">
                Search results for: <strong>{value}</strong>
              </p>
            )}
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

export const WithCalendar: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {date ? date.toLocaleDateString() : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
          />
        </PopoverContent>
      </Popover>
    );
  },
};

export const AlignStart: Story = {
  render: () => (
    <div className="flex justify-start pt-12">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align Start</Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <div className="space-y-2">
            <h4 className="font-medium">Aligned to Start</h4>
            <p className="text-sm text-muted-foreground">
              This popover is aligned to the start of the trigger.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const AlignCenter: Story = {
  render: () => (
    <div className="flex justify-center pt-12">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align Center</Button>
        </PopoverTrigger>
        <PopoverContent align="center">
          <div className="space-y-2">
            <h4 className="font-medium">Aligned to Center</h4>
            <p className="text-sm text-muted-foreground">
              This popover is aligned to the center of the trigger.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const AlignEnd: Story = {
  render: () => (
    <div className="flex justify-end pr-12 pt-12">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align End</Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <div className="space-y-2">
            <h4 className="font-medium">Aligned to End</h4>
            <p className="text-sm text-muted-foreground">
              This popover is aligned to the end of the trigger.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const ComplexContent: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>("");

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {selected || "Select Option"}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium leading-none mb-2">Options</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Choose one of the options below.
              </p>
            </div>
            <div className="space-y-2">
              {["Option A", "Option B", "Option C"].map((option) => (
                <button
                  key={option}
                  onClick={() => setSelected(option)}
                  className={`w-full px-3 py-2 text-left text-sm rounded-md transition-colors ${
                    selected === option
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

export const Menu: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Menu</Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0 w-48">
        <div className="flex flex-col">
          {["Edit", "Duplicate", "Delete", "Archive"].map((item, index) => (
            <button
              key={item}
              className={`px-4 py-2 text-left text-sm hover:bg-accent transition-colors ${
                index !== 3 ? "border-b border-border" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Settings</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Settings</h4>
            <p className="text-xs text-muted-foreground">
              Customize your preferences.
            </p>
          </div>
          <div className="space-y-3">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm">Enable notifications</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Dark mode</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm">Auto-save</span>
            </label>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const ProfileCard: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="rounded-full h-10 w-10">👤</Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">john@example.com</p>
          </div>
          <div className="border-t border-border pt-3">
            <div className="space-y-1">
              {["Profile", "Settings", "Help", "Sign out"].map((item) => (
                <button
                  key={item}
                  className="block w-full text-left px-2 py-1.5 text-sm hover:bg-accent rounded transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Hoverable: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            Hover me
          </Button>
        </PopoverTrigger>
        <PopoverContent onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
          <div className="space-y-2">
            <h4 className="font-medium">Hover Popover</h4>
            <p className="text-sm text-muted-foreground">
              This popover appears on hover.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};
