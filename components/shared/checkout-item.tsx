"use client";

import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import { CauntButton } from "./count-button";
import { X } from "lucide-react";
import { DeleteBtn } from "./delete-btn";

interface Props {
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
  quantity: number;
  disabled?: boolean;
  onClickCountBtn?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  className,
  quantity,
  // disabled,
  onClickCountBtn,
  onClickRemove,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between mb-5 text-base lg:text-xl",
        className
      )}
    >
      <div className="flex items-center gap-5 justify-between">
        <Image
          src={imageUrl || "/NoPhoto.png"}
          alt={name}
          width={60}
          height={60}
          className={cn("w-[60px] h-[60px] grow", className)}
        />
        {/* <div className="flex grow-2 flex-col lg:flex-row lg:justify-between gap-3 items-center"> */}
        <div className="grid grid-cols-[1fr_auto] gap-3 lg:flex lg:gap-10 items-center">
          <h2 className="font-normal  max-w-[250px]">{name}</h2>
          <p
            className={cn(
              "font-bold justify-self-end auto-cols-min",
              className
            )}
          >
            {price} грн
          </p>

          <CauntButton
            className="text-base lg:text-xl"
            size="lg"
            onClick={onClickCountBtn}
            value={quantity}
          />
          <DeleteBtn
            className="justify-self-end auto-cols-min"
            onClickRemove={onClickRemove}
          >
            <X size="24" strokeWidth={1} />
          </DeleteBtn>
        </div>
      </div>
    </div>
  );
};
