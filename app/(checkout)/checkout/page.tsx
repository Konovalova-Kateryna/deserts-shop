"use client";

import {
  CheckoutCart,
  CheckoutContacts,
  CheckoutSidebar,
  Container,
} from "@/components/shared";

import { useCart } from "@/hooks";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "@/components/shared/checkout/checkout-form-schema";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useState } from "react";

const deliveryPrice = 150;

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false);
  const { totalAmount, items, removeCartItem, updateItemQuantity, loading } =
    useCart();

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

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);

      const url = await createOrder(data);

      toast.success(
        "Замовлення створено. Зараз Вас буде перенаправлено на сторінку оплати",
        { icon: "✅" }
      );

      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      toast.error("Замовлення не створено", { icon: "❌" });
    }
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
    <Container className="mt-5 lg:mt-12 z-30">
      <h2 className="text-2xl lg:text-[40px] font-bold mb-5 lg:mb-9 mx-auto text-center">
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
                loading={loading}
              />
              <CheckoutContacts
                loading={loading}
                className={
                  loading
                    ? "opacity-40 pointer-events-none"
                    : `text-center lg:text-left`
                }
              />
            </div>
            <CheckoutSidebar
              totalPrice={totalPrice}
              totalAmount={totalAmount}
              deliveryPrice={deliveryPrice}
              loading={loading || submitting}
            />
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
