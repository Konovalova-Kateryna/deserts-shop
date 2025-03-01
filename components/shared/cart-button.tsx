import { cn } from "@/lib/utils";
import { ShoppingBasket } from "lucide-react";
import NextLink from "next/link";
import React from "react";
import { CartDrawer } from "./cart-drawer";

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  return (
    <CartDrawer>
      <NextLink href="#" className={cn("", className)}>
        <ShoppingBasket
          size="48"
          strokeWidth={1}
          className="  cursor-pointer hover:text-red-500"
        />
      </NextLink>
    </CartDrawer>
  );
};
