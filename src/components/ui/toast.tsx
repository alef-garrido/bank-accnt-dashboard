import React, { createContext, useContext, useState, useCallback } from "react";
import { X } from "lucide-react";

export type ToastVariant = "default" | "destructive";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  action?: {
    label: string;
    onClick: () => void;
  };
  isOpen: boolean;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id" | "isOpen">) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (toast: Omit<Toast, "id" | "isOpen">) => {
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newToast: Toast = {
        ...toast,
        id,
        isOpen: true,
        variant: toast.variant || "default",
        duration: toast.duration || 5000,
      };

      setToasts((prev) => [...prev, newToast]);

      if (newToast.duration && newToast.duration > 0) {
        const timer = setTimeout(() => {
          removeToast(id);
        }, newToast.duration);

        return id;
      }

      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const ToastViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => {
    const baseStyles =
      "fixed bottom-0 right-0 z-[100] flex flex-col gap-2 p-4 w-full sm:w-96 pointer-events-none";

    return <div ref={ref} className={`${baseStyles} ${className}`} {...props} />;
  }
);

ToastViewport.displayName = "ToastViewport";

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className = "", variant = "default", isOpen = true, onClose, children, ...props }, ref) => {
    if (!isOpen) return null;

    const baseStyles =
      "group pointer-events-auto relative flex w-full items-center justify-between gap-4 rounded-md border p-4 shadow-lg transition-all animate-in slide-in-from-bottom-full duration-300";

    const variantStyles: Record<ToastVariant, string> = {
      default: "border-gray-300 bg-white text-gray-900",
      destructive: "border-red-300 bg-red-50 text-red-900",
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

    return (
      <div ref={ref} className={combinedClassName} {...props}>
        {children}
      </div>
    );
  }
);

Toast.displayName = "Toast";

interface ToastTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ToastTitle = React.forwardRef<HTMLDivElement, ToastTitleProps>(
  ({ className = "", ...props }, ref) => {
    const baseStyles = "text-sm font-semibold";
    return <div ref={ref} className={`${baseStyles} ${className}`} {...props} />;
  }
);

ToastTitle.displayName = "ToastTitle";

interface ToastDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ToastDescription = React.forwardRef<HTMLDivElement, ToastDescriptionProps>(
  ({ className = "", ...props }, ref) => {
    const baseStyles = "text-sm opacity-90";
    return <div ref={ref} className={`${baseStyles} ${className}`} {...props} />;
  }
);

ToastDescription.displayName = "ToastDescription";

interface ToastActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ToastVariant;
}

export const ToastAction = React.forwardRef<HTMLButtonElement, ToastActionProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variantStyles: Record<ToastVariant, string> = {
      default: "border-gray-300 bg-transparent hover:bg-gray-100 focus:ring-blue-500",
      destructive:
        "border-red-300 bg-transparent hover:bg-red-100 text-red-900 focus:ring-red-500",
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

    return <button ref={ref} className={combinedClassName} {...props} />;
  }
);

ToastAction.displayName = "ToastAction";

interface ToastCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ToastVariant;
}

export const ToastClose = React.forwardRef<HTMLButtonElement, ToastCloseProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const baseStyles =
      "absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantStyles: Record<ToastVariant, string> = {
      default: "text-gray-500 hover:text-gray-700 focus:ring-blue-500",
      destructive: "text-red-500 hover:text-red-700 focus:ring-red-500",
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

    return (
      <button ref={ref} className={combinedClassName} type="button" {...props}>
        <X className="h-4 w-4" />
      </button>
    );
  }
);

ToastClose.displayName = "ToastClose";

export type ToastActionElement = React.ReactElement<typeof ToastAction>;
