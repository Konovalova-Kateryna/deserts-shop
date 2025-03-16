import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React from "react";

interface Props {
  onClick?: () => void;
  className?: string;
}

export const ClearBtn: React.FC<Props> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer",
        className
      )}
    >
      <X className="h-6 w-6" />
    </button>
  );
};
