import React from "react";
import { CheckoutItem } from "../checkout-item";
import { WhiteBlock } from "../white-block";
import { CartStateItem } from "@/lib/get-cart-details";
import { Skeleton } from "@/components/ui";

interface Props {
  className?: string;
  items: CartStateItem[];
  loading?: boolean;
  onClickCountBtn: (
    id: string,
    quantity: number,
    type: "plus" | "minus"
  ) => void;
  removeCartItem: (id: string) => void;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  className,
  loading,
  onClickCountBtn,
  removeCartItem,
}) => {
  return (
    <div className={className}>
      <WhiteBlock title="Кошик">
        {loading &&
          [...Array(4)].map((_, index) => (
            <Skeleton key={index} className="w-full bg-blue-100 h-14 mb-2" />
          ))}

        {!loading &&
          items.length > 0 &&
          items.map((item) => (
            <CheckoutItem
              name={item.titleUa}
              price={item.price}
              imageUrl={item.imageUrl}
              quantity={item.quantity}
              disabled={item.disabled}
              key={item.id}
              onClickCountBtn={(type) => {
                onClickCountBtn(item.id, item.quantity, type);
              }}
              onClickRemove={() => removeCartItem(item.id)}
            />
          ))}
      </WhiteBlock>
    </div>
  );
};
