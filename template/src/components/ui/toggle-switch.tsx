"use client";

import { cn } from "@/lib/utils";

interface ToggleSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
}

function ToggleSwitch({
  checked,
  onCheckedChange,
  disabled = false,
  className,
  id,
}: ToggleSwitchProps) {
  return (
    <label
      className={cn(
        "relative inline-flex items-center cursor-pointer",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        disabled={disabled}
        className="sr-only peer"
      />
      <div
        className={cn(
          "w-9 h-5 rounded-full transition-colors",
          "bg-secondary",
          "peer-checked:bg-primary",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
          "after:content-[''] after:absolute after:top-[2px] after:left-[2px]",
          "after:bg-white after:rounded-full after:h-4 after:w-4",
          "after:transition-transform after:duration-200",
          "peer-checked:after:translate-x-full"
        )}
      />
    </label>
  );
}

export { ToggleSwitch, type ToggleSwitchProps };
