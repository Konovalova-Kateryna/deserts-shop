import { cn } from "@/lib/utils";
import React from "react";
import { Plus, Minus } from "lucide-react";

interface Props {
  value?: number;
  size?: "sm" | "lg";
  className?: string;
  onClick?: (type: "plus" | "minus") => void;
}

export const CauntButton: React.FC<Props> = ({
  className,
  onClick,
  value = 1,
  size = "sm",
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-between gap-3",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onClick && onClick("minus")}
        disabled={value === 1}
      >
        <Minus
          size={size === "sm" ? "16" : "24"}
          strokeWidth={1}
          className="  cursor-pointer hover:text-red-500"
        />
      </button>

      <b className={className}>{value}</b>
      <button type="button" onClick={() => onClick && onClick("plus")}>
        <Plus
          size={size === "sm" ? "16" : "24"}
          strokeWidth={1}
          className="  cursor-pointer hover:text-red-500"
        />
      </button>
    </div>
  );
};
