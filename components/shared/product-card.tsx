"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Heart, ShoppingBasket } from "lucide-react";
import { Product } from "@prisma/client";
import { toggleFavorite } from "../../lib/toggle-favorite";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

interface Props {
  item: Product;
  className?: string;
  index: number;
  showDescription: boolean;
  onBtnClick: () => void;
  isProductFavorite?: boolean;
}

const colors = [
  "bg-background-yellow",
  "bg-background-pink",
  "bg-background-blue",
];

const priceLineClass = `
  relative inline-block
  before:content-[''] before:absolute before:top-0 before:left-0
  before:w-[68px] before:h-[2px] before:bg-black
`;

export const ProductCard: React.FC<Props> = ({
  index,
  item,
  className,
  showDescription,
  onBtnClick,
  isProductFavorite,
}) => {
  const bgColor = useMemo(() => colors[index % colors.length], [index]);
  const [isFavoriteLocal, setIsFavoriteLocal] = useState(isProductFavorite ?? false);
  const { data: session } = useSession();

  React.useEffect(() => {
    setIsFavoriteLocal(isProductFavorite ?? false);
  }, [isProductFavorite]);

  const handleFavoriteClick =async (e: React.MouseEvent) => {
   e.preventDefault(); 
    if (!session) {
      toast.error("Ви повинні бути авторизовані, щоб додавати в обране.", {
        icon: "❌",
      });
      return;
    }
    const next = !isFavoriteLocal;
    setIsFavoriteLocal(next);
    try {
      await toggleFavorite(item.id, isFavoriteLocal);
    } catch {
      setIsFavoriteLocal(!next); 
      toast.error("Помилка при зміні обраного.");
    }
  };

    const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onBtnClick();
  };

  return (
    <>
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
      className={cn(
        `h-full w-full relative px-7 py-5 lg:py-20 lg:px-12
         grid grid-rows-[auto_1fr_auto] grid-cols-2 gap-8 text-black
         ${bgColor} group`,
        className
      )}
    >
        <div className="relative justify-self-center row-start-2 lg:row-start-1 col-start-1 col-span-2">
          <Image
            src={item.imageUrl || "/NoPhoto.png"}
            width={320}
            height={320}
            alt={item.name}
            loading="lazy"
            className="w-auto h-[206px] object-contain lg:w-[360px] lg:h-[320px] z-20 relative transition-transform duration-500 group-hover:scale-105"
          />
          <Image
            src="/shadow.png"
            alt="shadow"
            width={320}
            height={30}
             loading="lazy"
            className="absolute z-10 bottom-[-15px] left-0 w-[260px] lg:w-[360px] h-auto pointer-events-none"
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

        <p className={cn(" lg:text-2xl font-segoe font-bolt text-xl pt-10 col-start-1 row-start-5 lg:row-start-4", priceLineClass)}>
          {item.price} грн
        </p>
        <button
          className="w-12 h-12 ml-auto transition-all col-start-2 row-start-1 lg:row-start-5 self-end"
            aria-label={isFavoriteLocal ? "Видалити з обраного" : "Додати до обраного"}
        onClick={handleFavoriteClick}
        >
          <Heart
            className={cn(
              `hover:text-red-500 w-full h-full hover:stroke-2`,
              isProductFavorite && "fill-red-500 text-red-500"
            )}
            strokeWidth={1}
          />
        </button>

        <button
          onClick={handleBuyClick}
        aria-label="Додати до кошика"
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
      </motion.div>

      {/* <style jsx>{`
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
      {/* `}</style> */} 
    </>
  );
};
