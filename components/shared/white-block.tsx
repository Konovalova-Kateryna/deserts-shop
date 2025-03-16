import { cn } from "@/lib/utils";
import { TitleComponent } from "./title";
import React from "react";

interface Props {
  title?: string;
  className?: string;
  endAdornment?: React.ReactNode;
  contentClassName?: string;
}

export const WhiteBlock: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  className,
  children,
  endAdornment,
  contentClassName,
}) => {
  return (
    <div className={cn("bg-white rounded-3xl", className)}>
      {title && (
        <div className="flex items-center justify-between p-5 px-7 border-b border-gray-100">
          <h3 className="text-3xl font-bold">{title}</h3>
          {endAdornment}
        </div>
      )}
      <div className={cn("px-5 py-4", contentClassName)}>{children}</div>
    </div>
  );
};
