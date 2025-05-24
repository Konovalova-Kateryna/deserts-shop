import React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";

interface Props {
  onToggleClick: () => void;
  isVisible: boolean;
  className?: string;
}

export const PasswordToggleBtn: React.FC<Props> = ({
  onToggleClick,
  isVisible,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onToggleClick}
      className={cn(
        "absolute right-8 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer",
        className
      )}
    >
      {isVisible ? <Eye size={24} /> : <EyeClosed size={24} />}
    </button>
  );
};
