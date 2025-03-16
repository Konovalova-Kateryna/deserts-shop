"use client";

import {
  CheckoutCart,
  CheckoutContacts,
  CheckoutSidebar,
  Container,
} from "@/components/shared";

import { useCart } from "@/hooks";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "@/components/shared/checkout/checkout-form-schema";

const deliveryPrice = 150;

export default function CheckoutPage() {
  const { totalAmount, items, removeCartItem, updateItemQuantity } = useCart();
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      comment: "",
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {
    console.log(data);
  };

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

  const totalPrice = totalAmount + deliveryPrice;

  return (
    <Container className="mt-12 z-30">
      <h2 className="text-[30px] lg:text-[40px] font-bold mb-9 mx-auto text-center">
        Оформлення замовлення
      </h2>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row gap-5 mb-20 justify-between">
            <div className="flex flex-col gap-5  w-full max-w-[650px]">
              <CheckoutCart
                items={items}
                removeCartItem={removeCartItem}
                onClickCountBtn={onClickCountBtn}
              />
              <CheckoutContacts />
            </div>
            <CheckoutSidebar
              totalPrice={totalPrice}
              totalAmount={totalAmount}
              deliveryPrice={deliveryPrice}
            />
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
