import type { Meta, StoryObj } from "@storybook/react";
import { HelpCircle, Info, AlertCircle, CheckCircle } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";

type Story = StoryObj;

const meta: Meta = {
  title: "UI/Tooltip",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default: Story = {
  render: () => (
    <Tooltip side="top" align="center">
      <TooltipTrigger className="p-2 rounded-md hover:bg-accent">
        <HelpCircle className="w-5 h-5" />
      </TooltipTrigger>
      <TooltipContent>This is a helpful tooltip</TooltipContent>
    </Tooltip>
  ),
};

export const TopPosition: Story = {
  render: () => (
    <div className="flex justify-center pt-12">
      <Tooltip side="top" align="center">
        <TooltipTrigger className="p-2 rounded-md hover:bg-accent">
          <Info className="w-5 h-5" />
        </TooltipTrigger>
        <TooltipContent>Tooltip on top</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const BottomPosition: Story = {
  render: () => (
    <div className="flex justify-center pb-12">
      <Tooltip side="bottom" align="center">
        <TooltipTrigger className="p-2 rounded-md hover:bg-accent">
          <Info className="w-5 h-5" />
        </TooltipTrigger>
        <TooltipContent>Tooltip on bottom</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const LeftPosition: Story = {
  render: () => (
    <div className="flex justify-end pr-12">
      <Tooltip side="left" align="center">
        <TooltipTrigger className="p-2 rounded-md hover:bg-accent">
          <Info className="w-5 h-5" />
        </TooltipTrigger>
        <TooltipContent>Tooltip on left</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const RightPosition: Story = {
  render: () => (
    <div className="flex justify-start pl-12">
      <Tooltip side="right" align="center">
        <TooltipTrigger className="p-2 rounded-md hover:bg-accent">
          <Info className="w-5 h-5" />
        </TooltipTrigger>
        <TooltipContent>Tooltip on right</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const AlignStart: Story = {
  render: () => (
    <div className="flex justify-center pt-12">
      <Tooltip side="top" align="start">
        <TooltipTrigger className="p-2 rounded-md hover:bg-accent">
          <Info className="w-5 h-5" />
        </TooltipTrigger>
        <TooltipContent>Aligned to start</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const AlignEnd: Story = {
  render: () => (
    <div className="flex justify-center pt-12">
      <Tooltip side="top" align="end">
        <TooltipTrigger className="p-2 rounded-md hover:bg-accent">
          <Info className="w-5 h-5" />
        </TooltipTrigger>
        <TooltipContent>Aligned to end</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip side="top">
      <TooltipTrigger className="p-2 rounded-md hover:bg-accent">
        <HelpCircle className="w-5 h-5" />
      </TooltipTrigger>
      <TooltipContent>
        This is a longer tooltip content that demonstrates how the tooltip handles multiple lines
        of text.
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Tooltip side="right">
      <TooltipTrigger className="p-2 rounded-md hover:bg-accent">
        <AlertCircle className="w-5 h-5 text-yellow-600" />
      </TooltipTrigger>
      <TooltipContent>Warning: Check your input</TooltipContent>
    </Tooltip>
  ),
};

export const Success: Story = {
  render: () => (
    <Tooltip side="right">
      <TooltipTrigger className="p-2 rounded-md hover:bg-accent">
        <CheckCircle className="w-5 h-5 text-green-600" />
      </TooltipTrigger>
      <TooltipContent>Operation completed successfully</TooltipContent>
    </Tooltip>
  ),
};

export const ButtonTrigger: Story = {
  render: () => (
    <Tooltip side="top">
      <TooltipTrigger className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
        Hover me
      </TooltipTrigger>
      <TooltipContent>This button has a tooltip</TooltipContent>
    </Tooltip>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <Tooltip side="top" delayMs={500}>
      <TooltipTrigger className="p-2 rounded-md hover:bg-accent">
        <Info className="w-5 h-5" />
      </TooltipTrigger>
      <TooltipContent>This tooltip has a 500ms delay</TooltipContent>
    </Tooltip>
  ),
};

export const AllPositions: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-16 py-16">
      <div className="flex gap-16">
        <Tooltip side="top" align="center">
          <TooltipTrigger className="p-2 rounded-md hover:bg-accent">
            <span className="text-sm">Top</span>
          </TooltipTrigger>
          <TooltipContent>Top</TooltipContent>
        </Tooltip>

        <Tooltip side="right" align="center">
          <TooltipTrigger className="p-2 rounded-md hover:bg-accent">
            <span className="text-sm">Right</span>
          </TooltipTrigger>
          <TooltipContent>Right</TooltipContent>
        </Tooltip>
      </div>

      <div className="flex gap-16">
        <Tooltip side="left" align="center">
          <TooltipTrigger className="p-2 rounded-md hover:bg-accent">
            <span className="text-sm">Left</span>
          </TooltipTrigger>
          <TooltipContent>Left</TooltipContent>
        </Tooltip>

        <Tooltip side="bottom" align="center">
          <TooltipTrigger className="p-2 rounded-md hover:bg-accent">
            <span className="text-sm">Bottom</span>
          </TooltipTrigger>
          <TooltipContent>Bottom</TooltipContent>
        </Tooltip>
      </div>
    </div>
  ),
};
