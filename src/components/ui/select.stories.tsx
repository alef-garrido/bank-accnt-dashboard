import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./select";

type Story = StoryObj<typeof Select>;

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger placeholder="Select an option" />
        <SelectContent>
          <SelectItem value="option-1">Option 1</SelectItem>
          <SelectItem value="option-2">Option 2</SelectItem>
          <SelectItem value="option-3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    );
  },
};

export const WithInitialValue: Story = {
  render: () => {
    const [value, setValue] = useState("option-2");

    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger />
        <SelectContent>
          <SelectItem value="option-1">Option 1</SelectItem>
          <SelectItem value="option-2">Option 2</SelectItem>
          <SelectItem value="option-3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    );
  },
};

export const Countries: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger placeholder="Select a country" />
        <SelectContent>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="ca">Canada</SelectItem>
          <SelectItem value="mx">Mexico</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="au">Australia</SelectItem>
        </SelectContent>
      </Select>
    );
  },
};

export const Fruits: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger placeholder="Select a fruit" />
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
          <SelectItem value="strawberry">Strawberry</SelectItem>
          <SelectItem value="kiwi">Kiwi</SelectItem>
        </SelectContent>
      </Select>
    );
  },
};

export const ManyOptions: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const options = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger placeholder="Select an item" />
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={index} value={`item-${index + 1}`}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
};

export const CustomWidth: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="w-64">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger placeholder="Select an option" />
          <SelectContent>
            <SelectItem value="option-1">First Option</SelectItem>
            <SelectItem value="option-2">Second Option</SelectItem>
            <SelectItem value="option-3">Third Option</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState("selected");

    return (
      <div className="flex flex-col gap-4">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger />
          <SelectContent>
            <SelectItem value="selected">Selected Value</SelectItem>
            <SelectItem value="other">Other Value</SelectItem>
            <SelectItem value="another">Another Value</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">Selected: {value || "None"}</p>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="flex flex-col gap-4">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger placeholder="Choose a priority" />
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
        <button
          onClick={() => setValue("")}
          className="px-3 py-2 text-sm font-medium rounded-md border border-input hover:bg-accent"
        >
          Reset
        </button>
      </div>
    );
  },
};
