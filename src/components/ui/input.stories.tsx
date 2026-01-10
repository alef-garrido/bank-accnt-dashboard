import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

type Story = StoryObj<typeof Input>;

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url", "search", "date", "time"],
      description: "The type of input field",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Enter text...",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "you@example.com",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter a number",
  },
};

export const Tel: Story = {
  args: {
    type: "tel",
    placeholder: "+1 (555) 000-0000",
  },
};

export const URL: Story = {
  args: {
    type: "url",
    placeholder: "https://example.com",
  },
};

export const Search: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
  },
};

export const Date: Story = {
  args: {
    type: "date",
  },
};

export const Time: Story = {
  args: {
    type: "time",
  },
};

export const Disabled: Story = {
  args: {
    type: "text",
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    type: "text",
    defaultValue: "Pre-filled value",
  },
};

export const LongPlaceholder: Story = {
  args: {
    type: "text",
    placeholder: "This is a longer placeholder text to show how it looks",
  },
};
