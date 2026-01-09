import React from "react";

export type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
export type ButtonSize = "default" | "sm" | "lg" | "icon";

const baseStyles =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

const variantStyles: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground hover:opacity-90 dark:bg-primary dark:text-primary-foreground",
  destructive: "bg-destructive text-destructive-foreground hover:opacity-90 dark:bg-destructive dark:text-destructive-foreground",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-background dark:hover:bg-accent dark:hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:opacity-90 dark:bg-secondary dark:text-secondary-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent dark:hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline dark:text-primary",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3 text-xs",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

export function buttonVariants(options?: { variant?: ButtonVariant; size?: ButtonSize }): string {
  const variant = options?.variant || "default";
  const size = options?.size || "default";
  return `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const combinedClassName = `${buttonVariants({ variant, size })} ${className}`;

    return (
      <button ref={ref} className={combinedClassName} {...props} />
    );
  }
);

Button.displayName = "Button";

export { Button };
