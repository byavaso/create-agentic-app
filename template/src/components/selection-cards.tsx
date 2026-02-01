"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectionCardOption<T extends string> {
  readonly key: T;
  readonly label: string;
  readonly description?: string;
  readonly icon?: LucideIcon;
}

interface SelectionCardsProps<T extends string> {
  options: readonly SelectionCardOption<T>[];
  value: T;
  onChange: (value: T) => void;
  columns?: 1 | 2 | 3;
  className?: string;
}

function SelectionCards<T extends string>({
  options,
  value,
  onChange,
  columns = 2,
  className,
}: SelectionCardsProps<T>) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
  };

  return (
    <div className={cn("grid gap-2", gridCols[columns], className)}>
      {options.map((option) => {
        const isSelected = value === option.key;
        const Icon = option.icon;

        return (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange(option.key)}
            className={cn(
              "p-3 text-left rounded-xl border-2 transition-all duration-200",
              "hover:shadow-sm",
              isSelected
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border/40 hover:border-primary/40 hover:bg-secondary/30"
            )}
          >
            <div className="flex items-start gap-2.5">
              {Icon && (
                <div
                  className={cn(
                    "p-1.5 rounded-lg shrink-0 transition-colors",
                    isSelected
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
              )}
              <div className="min-w-0">
                <div
                  className={cn(
                    "text-xs font-medium leading-tight",
                    isSelected && "text-primary"
                  )}
                >
                  {option.label}
                </div>
                {option.description && (
                  <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
                    {option.description}
                  </div>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export { SelectionCards, type SelectionCardOption, type SelectionCardsProps };
