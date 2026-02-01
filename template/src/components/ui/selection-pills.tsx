"use client";

import { cn } from "@/lib/utils";

interface SelectionPillOption<T extends string> {
  readonly key: T;
  readonly label: string;
  readonly description?: string;
}

interface SelectionPillsProps<T extends string> {
  options: readonly SelectionPillOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

function SelectionPills<T extends string>({
  options,
  value,
  onChange,
  className,
}: SelectionPillsProps<T>) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => (
        <button
          key={option.key}
          type="button"
          onClick={() => onChange(option.key)}
          title={option.description}
          className={cn(
            "px-3 py-1.5 text-xs rounded-full border transition-all",
            value === option.key
              ? "border-primary bg-primary/10 text-primary dark:text-primary"
              : "border-border/60 hover:border-foreground/20"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export { SelectionPills, type SelectionPillOption, type SelectionPillsProps };
