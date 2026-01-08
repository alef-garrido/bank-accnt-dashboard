import { useToast as useToastContext } from "../components/ui/toast";

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function useToast() {
  const { addToast, removeToast } = useToastContext();

  const toast = (options: ToastOptions) => {
    return addToast(options);
  };

  return {
    toast,
    dismiss: removeToast,
  };
}
