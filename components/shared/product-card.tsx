"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Heart, ShoppingBasket } from "lucide-react";
import { Product } from "@prisma/client";
import { toggleFavorite } from "./toggle-favorite";
import { cn } from "@/lib/utils";

interface Props {
  item: Product;
  className?: string;
  index: number;
  showDescription: boolean;
  onBtnClick: () => void;
}

const colors = [
  "bg-background-yellow",
  "bg-background-pink",
  "bg-background-blue",
];

export const ProductCard: React.FC<Props> = ({
  index,
  item,
  className,
  showDescription,
  onBtnClick,
}) => {
  const bgColor = useMemo(() => colors[index % colors.length], [index]);
  const [isFavorite, setFavorite] = useState(false);

  const handleClick = async ({
    productId,
    isFavorite,
  }: {
    productId: string;
    isFavorite: boolean;
  }) => {
    console.log("str toggle favorite", productId);
    await toggleFavorite(productId, isFavorite);
    setFavorite(!isFavorite);
  };

  return (
    <div className={cn("h-full w-full relative", className)}>
      <div
        className={` px-7 py-5 lg:py-20 lg:px-12 grid grid-rows-[auto_1fr_auto] grid-cols-2 gap-8 text-black ${bgColor} group`}
      >
        <div className="relative justify-self-center row-start-2 lg:row-start-1 col-start-1 col-span-2">
          <Image
            src={item.imageUrl || "/NoPhoto.png"}
            width={320}
            height={320}
            alt={item.name}
            className="w-auto h-[206px] object-contain lg:w-[360px] lg:h-[320px] "
          />
          <Image
            src="/shadow.png"
            alt="shadow"
            width={320}
            height={30}
            className="absolute z-20 bottom-[-15px] left-0 w-[260px] lg:w-[360px] h-auto"
          />
        </div>
        <h3 className="text-start text-xl font-segoe font-bold lg:text-2xl col-span-2 row-start-3 lg:row-start-2 min-h-[6rem] lg:min-h-[4rem]">
          {item.titleUa}
        </h3>
        {showDescription && item.description && (
          <p className="text-base lg:text-lg font-normal font-segoe text-black col-span-2 row-start-4 lg:row-start-3">
            {item.description}
          </p>
        )}

        <p className="price-with-line lg:text-2xl font-segoe font-bolt text-xl pt-10 col-start-1 row-start-5 lg:row-start-4">
          {item.price} грн
        </p>
        <button
          className="w-12 h-12 ml-auto transition-all col-start-2 row-start-1 lg:row-start-5 self-end"
          aria-label="Add to favorites"
          onClick={() => handleClick({ productId: item.id, isFavorite })}
        >
          <Heart
            className={cn(
              `hover:text-red-500 w-full h-full hover:stroke-2`,
              isFavorite && "fill-red-500"
            )}
            strokeWidth={1}
          />
        </button>
        <button
          onClick={onBtnClick}
          className="w-12 h-12 ml-auto  lg:flex lg:items-center lg:justify-center self-end lg:mr-auto lg:px-10 lg:py-3 lg:w-[214px] lg:border-solid lg:border-2 lg:border-black transition-all col-start-2 row-start-5 lg:col-start-1 lg:row-start-5"
        >
          <span className="lg:hidden w-12 h-12 ">
            <ShoppingBasket
              className={cn(`hover:text-red-500 w-full h-full hover:stroke-2 `)}
              strokeWidth={1}
            />
          </span>
          <span className="hidden lg:flex items-center justify-center uppercase font-segoe font-normal text-xl ">
            В кошик
          </span>
        </button>
      </div>

      <style jsx>{`
        .price-with-line {
          position: relative;
          display: inline-block;
        }
        .price-with-line::before {
          content: "";
          position: absolute;
          top: 0px;
          left: 0px;
          width: 68px;
          height: 2px;
          background-color: black;
          /* transform: translateY(-50%); */
        }
      `}</style>
    </div>
  );
};
