import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToast, ToastViewport } from "./toast";
import { Button } from "./button";

type Story = StoryObj;

const meta: Meta = {
  title: "UI/Toast",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

const ToastDemoContent = ({ title, description, variant, action }: any) => {
  const { addToast } = useToast();

  const handleShowToast = () => {
    addToast({
      title,
      description,
      variant,
      action,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={handleShowToast}>Show Toast</Button>
      <ToastViewport />
    </div>
  );
};

const ToastDemoWrapper = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>{children}</ToastProvider>
);

export const Default: Story = {
  render: () => (
    <ToastDemoWrapper>
      <ToastDemoContent
        title="Hello!"
        description="This is a default toast notification."
      />
    </ToastDemoWrapper>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <ToastDemoWrapper>
      <ToastDemoContent
        title="Notification"
        description="This toast has both a title and a description to provide more context."
      />
    </ToastDemoWrapper>
  ),
};

export const DescriptionOnly: Story = {
  render: () => (
    <ToastDemoWrapper>
      <ToastDemoContent
        description="This is a toast with only a description, no title."
      />
    </ToastDemoWrapper>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <ToastDemoWrapper>
      <ToastDemoContent title="Success!" />
    </ToastDemoWrapper>
  ),
};

export const Destructive: Story = {
  render: () => (
    <ToastDemoWrapper>
      <ToastDemoContent
        title="Error!"
        description="Something went wrong. Please try again."
        variant="destructive"
      />
    </ToastDemoWrapper>
  ),
};

export const DestructiveWithAction: Story = {
  render: () => (
    <ToastDemoWrapper>
      <ToastDemoContent
        title="Error!"
        description="Failed to save your changes."
        variant="destructive"
        action={{
          label: "Retry",
          onClick: () => console.log("Retrying..."),
        }}
      />
    </ToastDemoWrapper>
  ),
};

export const WithAction: Story = {
  render: () => (
    <ToastDemoWrapper>
      <ToastDemoContent
        title="Changes saved"
        description="Your document has been saved to the cloud."
        action={{
          label: "View",
          onClick: () => console.log("Viewing document..."),
        }}
      />
    </ToastDemoWrapper>
  ),
};

export const LongDescription: Story = {
  render: () => (
    <ToastDemoWrapper>
      <ToastDemoContent
        title="Upload Complete"
        description="Your file has been successfully uploaded to the cloud storage. You can access it anytime from your account dashboard."
      />
    </ToastDemoWrapper>
  ),
};

export const Multiple: Story = {
  render: () => {
    const { addToast } = useToast();

    const handleShowMultiple = () => {
      addToast({
        title: "First Toast",
        description: "This is the first notification",
      });
      setTimeout(() => {
        addToast({
          title: "Second Toast",
          description: "This is the second notification",
        });
      }, 500);
      setTimeout(() => {
        addToast({
          title: "Third Toast",
          description: "This is the third notification",
          variant: "destructive",
        });
      }, 1000);
    };

    return (
      <ToastDemoWrapper>
        <div className="flex flex-col gap-4">
          <Button onClick={handleShowMultiple}>Show Multiple Toasts</Button>
          <ToastViewport />
        </div>
      </ToastDemoWrapper>
    );
  },
};

export const CustomDuration: Story = {
  render: () => {
    const { addToast } = useToast();

    return (
      <ToastDemoWrapper>
        <div className="flex flex-col gap-2">
          <Button
            onClick={() =>
              addToast({
                title: "Short Duration",
                description: "This toast will disappear in 2 seconds",
                duration: 2000,
              })
            }
          >
            2 Second Toast
          </Button>
          <Button
            onClick={() =>
              addToast({
                title: "Long Duration",
                description: "This toast will disappear in 10 seconds",
                duration: 10000,
              })
            }
          >
            10 Second Toast
          </Button>
          <Button
            onClick={() =>
              addToast({
                title: "Persistent",
                description: "This toast will not auto-dismiss",
                duration: 0,
              })
            }
          >
            Persistent Toast
          </Button>
          <ToastViewport />
        </div>
      </ToastDemoWrapper>
    );
  },
};

export const SuccessExample: Story = {
  render: () => (
    <ToastDemoWrapper>
      <ToastDemoContent
        title="✓ Success"
        description="Your payment has been processed successfully."
      />
    </ToastDemoWrapper>
  ),
};

export const WarningExample: Story = {
  render: () => (
    <ToastDemoWrapper>
      <ToastDemoContent
        title="⚠️ Warning"
        description="Your session will expire in 5 minutes."
      />
    </ToastDemoWrapper>
  ),
};

export const InfoExample: Story = {
  render: () => (
    <ToastDemoWrapper>
      <ToastDemoContent
        title="ℹ️ Info"
        description="A new version of the app is available. Please update soon."
      />
    </ToastDemoWrapper>
  ),
};

export const DifferentScenarios: Story = {
  render: () => {
    const { addToast } = useToast();

    return (
      <ToastDemoWrapper>
        <div className="flex flex-col gap-2">
          <Button
            onClick={() =>
              addToast({
                title: "Saved",
                description: "Your changes have been saved.",
              })
            }
          >
            Save Success
          </Button>
          <Button
            onClick={() =>
              addToast({
                title: "Deleted",
                description: "Item has been deleted successfully.",
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undoing deletion..."),
                },
              })
            }
          >
            Delete with Undo
          </Button>
          <Button
            onClick={() =>
              addToast({
                title: "Error",
                description: "Failed to load data.",
                variant: "destructive",
                action: {
                  label: "Retry",
                  onClick: () => console.log("Retrying..."),
                },
              })
            }
            variant="destructive"
          >
            Error with Retry
          </Button>
          <ToastViewport />
        </div>
      </ToastDemoWrapper>
    );
  },
};
