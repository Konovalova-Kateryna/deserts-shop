import { cn } from "@/lib/utils";
import React from "react";
import { CauntButton } from "./count-button";
import { DeleteBtn } from "./delete-btn";
import Image from "next/image";
import { Trash2 } from "lucide-react";

interface Props {
  name: string;
  price: number;
  imageUrl: string;
  className: string;
  quantity: number;
  disabled?: boolean;
  onClickCountBtn?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
}

export const CartDrawerItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  className,
  quantity,
  disabled,
  onClickCountBtn,
  onClickRemove,
}) => {
  return (
    <div
      className={cn(
        "flex gap-3 items-center justify-between bg-white p-5 rounded-lg font-segoe",
        { "opacity-50 pointer-events-none": disabled },
        className
      )}
    >
      <Image
        src={imageUrl || "/NoPhoto.png"}
        alt={name}
        width={60}
        height={60}
        className={cn("w-[60px] h-[60px]", className)}
      />
      <div>
        <div className="flex gap-3 mb-4 justify-between">
          <h2 className="font-normal text-base">{name}</h2>
          <p className={cn("font-bold", className)}>{price} грн</p>
        </div>
        <div className=" flex justify-between items-center">
          <CauntButton
            className=""
            onClick={onClickCountBtn}
            value={quantity}
          />
          <DeleteBtn className="" onClickRemove={onClickRemove}>
            <Trash2 size="24" strokeWidth={1} />
          </DeleteBtn>
        </div>
      </div>
    </div>
  );
};
