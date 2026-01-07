import React, { createContext, useContext, useState } from "react";
import { ChevronDown } from "lucide-react";

interface SelectContextType {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SelectContext = createContext<SelectContextType | undefined>(undefined);

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within a Select component");
  }
  return context;
};

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ value = "", onValueChange, children }) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  const currentValue = value || internalValue;

  const handleValueChange = (newValue: string) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
    setOpen(false);
  };

  return (
    <SelectContext.Provider value={{ value: currentValue, onValueChange: handleValueChange, open, setOpen }}>
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  );
};

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className = "", placeholder, ...props }, ref) => {
    const { value, setOpen, open } = useSelectContext();

    const baseStyles =
      "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-left";

    const combinedClassName = `${baseStyles} ${className}`;

    return (
      <button
        ref={ref}
        className={combinedClassName}
        onClick={() => setOpen(!open)}
        type="button"
        {...props}
      >
        <span className="flex-1">{value || placeholder || "Select..."}</span>
        <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
    );
  }
);

SelectTrigger.displayName = "SelectTrigger";

interface SelectValueProps {
  placeholder?: string;
}

const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
  const { value } = useSelectContext();
  return <span>{value || placeholder || "Select..."}</span>;
};

SelectValue.displayName = "SelectValue";

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className = "", children, ...props }, ref) => {
    const { open, setOpen } = useSelectContext();

    if (!open) return null;

    const baseStyles =
      "absolute top-full left-0 right-0 mt-1 z-50 rounded-md border border-gray-300 bg-white shadow-lg overflow-hidden";

    const combinedClassName = `${baseStyles} ${className}`;

    return (
      <div
        ref={ref}
        className={combinedClassName}
        {...props}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </div>
    );
  }
);

SelectContent.displayName = "SelectContent";

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className = "", value, children, onClick, ...props }, ref) => {
    const { onValueChange, value: selectedValue } = useSelectContext();
    const isSelected = selectedValue === value;

    const baseStyles =
      "relative flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none hover:bg-blue-100 hover:text-blue-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

    const selectedStyles = isSelected ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white" : "";

    const combinedClassName = `${baseStyles} ${selectedStyles} ${className}`;

    return (
      <div
        ref={ref}
        className={combinedClassName}
        onClick={(e) => {
          onValueChange(value);
          onClick?.(e as React.MouseEvent<HTMLDivElement>);
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SelectItem.displayName = "SelectItem";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
