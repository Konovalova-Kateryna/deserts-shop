import React from "react";
import { WhiteBlock } from "../white-block";
import { CheckoutDetails } from "../checkout-details";
import { Button, Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Loader, LoaderDots } from "../loader/loader";

interface Props {
  className?: string;
  totalPrice: number;
  totalAmount: number;
  deliveryPrice: number;
  loading?: boolean;
}

export const CheckoutSidebar: React.FC<Props> = ({
  className,
  totalPrice,
  totalAmount,
  deliveryPrice,
  loading,
}) => {
  return (
    <div className={cn("w-full max-w-[500px]", className)}>
      <WhiteBlock className="sticky top-4">
        <div className="flex justify-between">
          <span className="text-xl ">Разом:</span>
          {loading ? (
            <Skeleton className="w-[100px] bg-blue-100 h-7" />
          ) : (
            <span className="font-bold text-xl"> {totalPrice} грн</span>
          )}
        </div>

        <CheckoutDetails
          title="Вартість товару:"
          value={
            loading ? (
              <Skeleton className="w-[100px] bg-blue-100 h-6" />
            ) : (
              `${totalAmount} грн`
            )
          }
        />

        <CheckoutDetails
          title="Доставка:"
          value={
            loading ? (
              <Skeleton className="w-[100px] bg-blue-100 h-6 " />
            ) : (
              `${deliveryPrice} грн`
            )
          }
        />
        <Button
          type="submit"
          className={`w-full mt-5 rounded-[8px] text-sm lg:text-lg ${
            loading
              ? "pointer-events-none bg-gray-300 text-gray-300 border-gray-300"
              : ""
          }`}
        >
          Перейти до оплати
        </Button>
      </WhiteBlock>
    </div>
  );
};
