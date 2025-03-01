import { cn } from "@/lib/utils";
import React from "react";
import { Trash2 } from "lucide-react";

interface Props {
  className: string;
  onClickRemove?: () => void;
}

export const DeleteBtn: React.FC<Props> = ({ className, onClickRemove }) => {
  return (
    <button
      onClick={onClickRemove}
      className={cn("hover:text-red-500", className)}
    >
      <Trash2 size="24" strokeWidth={1} />
    </button>
  );
};
