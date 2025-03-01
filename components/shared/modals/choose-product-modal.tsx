"use client";

import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import { ProductModal } from "@/components/shared";
import Icon from "../icon";
import { useCartStore } from "@/store";
import toast from "react-hot-toast";

interface Props {
  className?: string;
  product: Product;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const onAddProduct = async () => {
    try {
      await addCartItem({
        productItemId: product.id,
        quantity: 1,
      });
      toast.success(`${product.titleUa} додано до кошика.`);
      router.back();
    } catch (error) {
      toast.error("Упс! Щось пішло не так.");
      console.error(error);
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogOverlay
        style={{
          backgroundImage: "url('/modal_bg_img.png')",
        }}
        className="bg-cover bg-center"
      />
      <DialogContent
        className={cn(
          "p-5 w-full max-w-[360px] lg:max-w-[1060px] min-h-[600px] bg-[--blue] overflow-x-hidden overflow-y-scroll",
          className
        )}
      >
        <Icon
          name="icon-donut"
          className="w-[180px] h-[180px] absolute bottom-[150px] right-[100px] fill-none stroke-gray-400"
        />
        <Icon
          name="icon-makaroon"
          className="w-[210px] h-[210px] absolute top-[100px] left-[-20px] fill-none stroke-gray-400"
        />
        <Icon
          name="icon-cupcake"
          className="w-[300px] h-[300px] absolute top-0 left-[830px] -rotate-45 fill-none stroke-gray-400 z-0"
        />

        <ProductModal
          product={product}
          onBtnClick={onAddProduct}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
};
