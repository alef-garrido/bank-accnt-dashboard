import { useContext } from "react";
import { ToastClose, ToastDescription, ToastTitle, ToastViewport } from "./toast";
import type { Toast } from "./toast";
import { ToastContext } from "./toast";

export function Toaster() {
  const context = useContext(ToastContext);
  
  if (!context) {
    return null;
  }

  const { toasts, removeToast } = context;

  return (
    <>
      {toasts.map(function ({ id, title, description, action, variant }: Toast) {
        return (
          <div key={id} className="fixed bottom-0 right-0 z-[100] flex flex-col gap-2 p-4 w-full sm:w-96 pointer-events-auto">
            <div
              className={`group pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-md border p-6 shadow-lg transition-all animate-in slide-in-from-right-full duration-300 ${
                variant === "destructive"
                  ? "border-red-300 bg-red-50 text-red-900"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
            >
              <div className="flex-1 flex flex-col gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>

              <div className="flex items-center gap-2">
                {action && (
                  <button
                    onClick={action.onClick}
                    className="inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-transparent px-3 text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    {action.label}
                  </button>
                )}
                <ToastClose onClick={() => removeToast(id)} variant={variant} />
              </div>
            </div>
          </div>
        );
      })}
      <ToastViewport />
    </>
  );
}
