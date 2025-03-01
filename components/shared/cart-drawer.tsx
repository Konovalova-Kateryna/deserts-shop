"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui";
import { CartDrawerItem } from "./cart-drawer-item";
import { useCartStore } from "@/store";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const totalAmount = useCartStore((state) => state.totalAmount);
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateItemQuantity);
  const removeItem = useCartStore((state) => state.removeCartItem);

  React.useEffect(() => {
    fetchCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickCountBtn = (
    id: string,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    if (type === "plus") {
      updateQuantity(id, (quantity += 1));
    } else {
      updateQuantity(id, (quantity -= 1));
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-blue-200 px-3">
        <SheetHeader>
          <SheetTitle>
            В кошику <span className="font-bold">{items.length} </span>товарів
          </SheetTitle>
        </SheetHeader>
        <div className=" mt-5 overflow-auto flex-1 scrollbar">
          <div className="mb-4 mr-1">
            {items.map((item) => (
              <CartDrawerItem
                key={item.id}
                name={item.titleUa}
                price={item.price}
                imageUrl={item.imageUrl}
                className="mb-2"
                quantity={item.quantity}
                onClickCountBtn={(type) => {
                  onClickCountBtn(item.id, item.quantity, type);
                }}
                onClickRemove={() => removeItem(item.id)}
              />
            ))}
          </div>
        </div>

        <SheetFooter className="-mx-3 p-8 bg-white flex flex-col">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-black">
                Разом:
                <div className="flex-1 border-b border-dashed relative -top-1 mx-2 text-black" />
              </span>

              <span className="font-bold text-lg"> {totalAmount}грн</span>
            </div>
          </div>

          <Link href="/cart">
            <Button className="w-full h-12 text-base" type="submit">
              Оформити замовлення
            </Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
