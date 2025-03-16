import React from "react";
import { WhiteBlock } from "../white-block";
import { CheckoutDetails } from "../checkout-details";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  totalPrice: number;
  totalAmount: number;
  deliveryPrice: number;
}

export const CheckoutSidebar: React.FC<Props> = ({
  className,
  totalPrice,
  totalAmount,
  deliveryPrice,
}) => {
  return (
    <div className={cn("w-full max-w-[500px]", className)}>
      <WhiteBlock className="sticky top-4">
        <div className="flex justify-between">
          <span className="text-xl ">Разом:</span>
          <span className="font-bold text-xl"> {totalPrice} грн</span>
        </div>
        <CheckoutDetails title="Вартість товару:" value={`${totalAmount}грн`} />
        <CheckoutDetails title="Доставка:" value={`${deliveryPrice} грн`} />
        <Button
          type="submit"
          className="w-full mt-5 rounded-[8px] text-sm lg:text-lg"
        >
          Перейти до оплати
        </Button>
      </WhiteBlock>
    </div>
  );
};
