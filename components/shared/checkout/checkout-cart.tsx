import React from "react";
import { CheckoutItem } from "../checkout-item";
import { WhiteBlock } from "../white-block";
import { CartStateItem } from "@/lib/get-cart-details";

interface Props {
  className?: string;
  items: CartStateItem[];
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
  onClickCountBtn,
  removeCartItem,
}) => {
  return (
    <div className={className}>
      <WhiteBlock title="Кошик">
        {items.map((item) => (
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
