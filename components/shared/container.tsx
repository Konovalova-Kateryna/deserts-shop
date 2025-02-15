import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 lg:px-20 sm:w-[360px] lg:w-[1920px]",
        className
      )}
    >
      {children}
    </div>
  );
};
