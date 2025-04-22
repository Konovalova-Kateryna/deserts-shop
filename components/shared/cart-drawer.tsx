"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui";
import { CartDrawerItem } from "./cart-drawer-item";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCart } from "@/hooks";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();

  const onClickCountBtn = (
    id: string,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    if (type === "plus") {
      updateItemQuantity(id, (quantity += 1));
    } else {
      updateItemQuantity(id, (quantity -= 1));
    }
  };

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="lg:w-[500px] mx-auto flex flex-col justify-between pb-0 bg-blue-200 px-3 right-1">
        {isOpen && (
          <div
            className={cn(
              "flex flex-col h-full",
              !totalAmount && "justify-center"
            )}
          >
            {!totalAmount && (
              <div className="flex flex-col items-center justify-center w-72 h-full mx-auto">
                <h2 className="font-segoe font-semibold text-2xl mb-8">
                  Кошик порожній
                </h2>
                <Image
                  src="/cup.svg"
                  alt="cup"
                  width={120}
                  height={120}
                  aria-hidden="true"
                />

                <SheetClose className="mx-auto mt-8">
                  <Button>Обрати десерт</Button>
                </SheetClose>
              </div>
            )}

            {totalAmount > 0 && (
              <>
                <SheetHeader>
                  <SheetTitle>
                    В кошику <span className="font-bold">{items.length} </span>
                    товарів
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
                        disabled={item.disabled}
                        onClickCountBtn={(type) => {
                          onClickCountBtn(item.id, item.quantity, type);
                        }}
                        onClickRemove={() => removeCartItem(item.id)}
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

                      <span className="font-bold text-lg">
                        {" "}
                        {totalAmount}грн
                      </span>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full h-12 text-base" type="submit">
                      Оформити замовлення
                    </Button>
                  </Link>
                </SheetFooter>
              </>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
