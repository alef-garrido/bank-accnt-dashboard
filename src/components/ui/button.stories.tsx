import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default: Story = {
  args: {
    children: "Click me",
  },
};
