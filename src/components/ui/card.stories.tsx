import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card";

type Story = StoryObj<typeof Card>;

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area.</p>
      </CardContent>
      <CardFooter>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithContent: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>View product information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">
            <strong>Name:</strong> Amazing Product
          </p>
          <p className="text-sm">
            <strong>Price:</strong> $99.99
          </p>
          <p className="text-sm">
            <strong>Status:</strong> In Stock
          </p>
        </div>
      </CardContent>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Confirm Action</CardTitle>
        <CardDescription>Are you sure you want to proceed?</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline">Cancel</Button>
        <Button variant="destructive">Confirm</Button>
      </CardFooter>
    </Card>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardContent className="pt-6">
        <p className="text-center font-semibold">Simple Card</p>
      </CardContent>
    </Card>
  ),
};
