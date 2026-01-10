import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";

type Story = StoryObj<typeof Label>;

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "The label text",
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    htmlFor: "email",
    children: "Email Address",
  },
};

export const Required: Story = {
  render: () => (
    <Label htmlFor="password">
      Password <span className="text-destructive">*</span>
    </Label>
  ),
};

export const WithInput: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="username">Username</Label>
      <input
        id="username"
        type="text"
        placeholder="Enter your username"
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder-muted-foreground"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="disabled-input">Disabled Field</Label>
      <input
        id="disabled-input"
        type="text"
        placeholder="This is disabled"
        disabled
        className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm opacity-50 cursor-not-allowed"
      />
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="first-name">First Name</Label>
        <input
          id="first-name"
          type="text"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="last-name">Last Name</Label>
        <input
          id="last-name"
          type="text"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <input
          id="email"
          type="email"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
    </div>
  ),
};
