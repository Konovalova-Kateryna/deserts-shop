"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../ui";
import { Heart } from "lucide-react";
import { Product } from "@prisma/client";

interface Props {
  product: Product;
}

export const TrendProductComponent: React.FC<Props> = ({ product }) => {
  return (
    <section className="mx-auto">
      <div className="lg:flex flex-row-reverse gap-[200px] justify-center mt-[70px] ">
        <div className="relative">
          <Image
            src="/week.png"
            alt="weekTrend"
            width={150}
            height={150}
            className="absolute top-[-50px] right-0 z-30 w-[107px] h-[107px] lg:w-[150px] lg:h-[150px] lg:right-[-80px]"
          />
          <Image
            src={product.imageUrl || "/NoPhoto.png"}
            alt={product.titleUa}
            width={320}
            height={320}
            className="w-[238px] h-[283px] mx-auto lg:w-[330px] lg:h-[390px] z-20 relative "
          />
          <Image
            src="/shadow.png"
            alt="shadow"
            width={320}
            height={30}
            className="absolute z-20 bottom-[-25px] lg:bottom-[15px] left-4 w-[260px] h-[30px] lg:h-12"
          />
          <div
            className={`bg-[--yellow] w-full h-[82px] lg:w-[650px] lg:h-[190px] absolute bottom-[-30px] lg:bottom-0 lg:left-[-116px] z-10`}
          ></div>
        </div>
        <div className="lg:w-[433px] gap-[70px]">
          <h3 className="text-2xl mt-12 font-segoe font-bold lg:text-2xl">
            {product.titleUa}
          </h3>
          <p className="text-base lg:text-xl font-normal mt-9 col-start-1">
            {product.description}
          </p>
          <div className="grid grid-cols-2 gap-[50px] lg:gap-12 justify-between items-end mt-11">
            <div className="price-with-line  lg:text-2xl font-segoe font-bold text-xl py-3 col-start-1 lg:row-start-1">
              {product.price}грн
            </div>
            <button
              className="w-12 h-12  transition-all col-start-2 row-start-1 lg:row-start-2 self-end justify-self-end"
              aria-label="Add to favorites"
            >
              <Heart
                className=" hover:text-red-500 w-full h-full hover:stroke-2 "
                strokeWidth={1}
              />
            </button>

            <Button className="lg:w-[214px] col-start-1 row-start-2">
              В кошик
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .price-with-line {
          position: relative;
          display: inline-block;
        }
        .price-with-line::before {
          content: "";
          position: absolute;
          top: -20px;
          left: 0px;
          width: 68px;
          height: 2px;
          background-color: black;
          /* transform: translateY(-50%); */
        }
      `}</style>
    </section>
  );
};
