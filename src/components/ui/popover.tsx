import React, { useState, useRef, useEffect, createContext, useContext } from "react";

interface PopoverContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

const usePopoverContext = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within a Popover component");
  }
  return context;
};

interface PopoverProps {
  children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        triggerRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef, contentRef }}>
      {children}
    </PopoverContext.Provider>
  );
};

const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = "", onClick, ...props }, ref) => {
  const { open, setOpen, triggerRef } = usePopoverContext();

  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  return (
    <button
      ref={(el) => {
        triggerRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      }}
      className={`${baseStyles} ${className}`}
      onClick={(e) => {
        setOpen(!open);
        onClick?.(e);
      }}
      {...props}
    />
  );
});
PopoverTrigger.displayName = "PopoverTrigger";

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className = "", align = "center", sideOffset = 4, ...props }, ref) => {
    const { open, contentRef, triggerRef } = usePopoverContext();
    const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

    useEffect(() => {
      if (!open || !triggerRef.current || !contentRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      let left = triggerRect.left;
      if (align === "center") {
        left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
      } else if (align === "end") {
        left = triggerRect.left + triggerRect.width - contentRect.width;
      }

      const top = triggerRect.bottom + sideOffset;

      // Clamp to viewport
      const minLeft = 8;
      const maxLeft = window.innerWidth - contentRect.width - 8;
      left = Math.max(minLeft, Math.min(left, maxLeft));

      setPosition({ top, left });
    }, [open, align, sideOffset]);

    if (!open || !position) return null;

    const baseStyles =
      "z-50 w-72 rounded-md border border-gray-300 bg-white p-4 text-gray-900 shadow-md outline-none animate-in fade-in-0 zoom-in-95 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";

    return (
      <div
        ref={(el) => {
          contentRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
        }}
        className={`${baseStyles} ${className}`}
        style={{
          position: "fixed",
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
        {...props}
      />
    );
  }
);
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
