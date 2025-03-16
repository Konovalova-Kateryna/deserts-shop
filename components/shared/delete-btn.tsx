import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
  onClickRemove?: () => void;
}

export const DeleteBtn: React.FC<Props> = ({
  className,
  onClickRemove,
  children,
}) => {
  return (
    <button
      onClick={onClickRemove}
      className={cn("hover:text-red-500", className)}
    >
      {children}
    </button>
  );
};
