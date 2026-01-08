import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";

export type TooltipSide = "top" | "right" | "bottom" | "left";
export type TooltipAlign = "start" | "center" | "end";

interface TooltipContextType {
  isOpen: boolean;
  position: { top: number; left: number } | null;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  setOpen: (open: boolean) => void;
  setPosition: (position: { top: number; left: number } | null) => void;
  side: TooltipSide;
  align: TooltipAlign;
  sideOffset: number;
  delayMs: number;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

const useTooltipContext = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip components must be used within a Tooltip component");
  }
  return context;
};

export const TooltipProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

interface TooltipProps {
  children: ReactNode;
  side?: TooltipSide;
  align?: TooltipAlign;
  sideOffset?: number;
  delayMs?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  side = "top",
  align = "center",
  sideOffset = 4,
  delayMs = 200,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const calculatePosition = () => {
    if (!triggerRef.current || !contentRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();
    const gap = sideOffset;

    let top = 0;
    let left = 0;

    // Calculate horizontal position based on align
    switch (align) {
      case "start":
        left = triggerRect.left;
        break;
      case "center":
        left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
        break;
      case "end":
        left = triggerRect.left + triggerRect.width - contentRect.width;
        break;
    }

    // Calculate vertical position based on side
    switch (side) {
      case "top":
        top = triggerRect.top - contentRect.height - gap;
        break;
      case "bottom":
        top = triggerRect.bottom + gap;
        break;
      case "left":
        left = triggerRect.left - contentRect.width - gap;
        top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
        break;
      case "right":
        left = triggerRect.right + gap;
        top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
        break;
    }

    // Clamp to viewport
    const minLeft = 8;
    const maxLeft = window.innerWidth - contentRect.width - 8;
    left = Math.max(minLeft, Math.min(left, maxLeft));

    const minTop = 8;
    const maxTop = window.innerHeight - contentRect.height - 8;
    top = Math.max(minTop, Math.min(top, maxTop));

    setPosition({ top, left });
  };

  const handleMouseEnter = () => {
    delayTimerRef.current = setTimeout(() => {
      setIsOpen(true);
    }, delayMs);
  };

  const handleMouseLeave = () => {
    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      calculatePosition();
      window.addEventListener("resize", calculatePosition);
      window.addEventListener("scroll", calculatePosition);

      return () => {
        window.removeEventListener("resize", calculatePosition);
        window.removeEventListener("scroll", calculatePosition);
      };
    }
  }, [isOpen]);

  return (
    <TooltipContext.Provider
      value={{
        isOpen,
        position,
        triggerRef,
        contentRef,
        setOpen: setIsOpen,
        setPosition,
        side,
        align,
        sideOffset,
        delayMs,
      }}
    >
      <div className="inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
    </TooltipContext.Provider>
  );
};

interface TooltipTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const TooltipTrigger = React.forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  ({ className = "", ...props }, ref) => {
    const { triggerRef, isOpen } = useTooltipContext();

    return (
      <button
        ref={(element: HTMLButtonElement | null) => {
          triggerRef.current = element;
          if (typeof ref === "function") ref(element);
          else if (ref) ref.current = element;
        }}
        className={`inline-flex items-center justify-center rounded-md transition-colors ${className}`}
        aria-describedby={isOpen ? "tooltip-content" : undefined}
        {...props}
      />
    );
  }
);

TooltipTrigger.displayName = "TooltipTrigger";

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  sideOffset?: number;
}

export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className = "", sideOffset, children, ...props }, ref) => {
    const { isOpen, position, contentRef } = useTooltipContext();

    if (!isOpen || !position) return null;

    const baseStyles =
      "relative z-50 px-3 py-1.5 text-sm text-white bg-gray-900 rounded-md shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95";

    const combinedClassName = `${baseStyles} ${className}`;

    return (
      <div
        ref={(element: HTMLDivElement | null) => {
          contentRef.current = element;
          if (typeof ref === "function") ref(element);
          else if (ref) ref.current = element;
        }}
        id="tooltip-content"
        className={combinedClassName}
        role="tooltip"
        style={{
          position: "fixed",
          top: `${position.top}px`,
          left: `${position.left}px`,
          pointerEvents: "none",
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TooltipContent.displayName = "TooltipContent";
