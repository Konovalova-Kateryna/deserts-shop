import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  title: string;
  value: React.ReactNode;
}

export const CheckoutDetails: React.FC<Props> = ({
  className,
  title,
  value,
}) => {
  return (
    <div className={cn("flex my-4", className)}>
      <span className="flex flex-1 text-lg text-blue-700">
        {title}
        <div className="flex-1 border-b border-dashed border-b-blue-300 relative -top-1"></div>
      </span>
      <span className="font-bold text-lg">{value}</span>
    </div>
  );
};
