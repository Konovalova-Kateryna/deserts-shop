import { Carousel } from "../ui";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { ProductCard } from "./product-card";
import React from "react";
import { Product } from "@prisma/client";
import Link from "next/link";

export const ProductsCarousel: React.FC<{
  products: Product[];
  favoriteProductsIds: string[];
}> = ({ products, favoriteProductsIds }) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full  max-h-[1200px]"
    >
      <CarouselPrevious className="hidden lg:flex w-12 h-12 [&_svg]:size-8" />
      <CarouselContent className="flex grow">
        {products.map((item, index) => (
          <CarouselItem
            key={item.id}
            className="basis-full h-full lg:basis-1/3 "
          >
            <Link href={`/product/${item.id}`}>
              <ProductCard
                onBtnClick={() => {}}
                item={item}
                index={index}
                showDescription={false}
                isProductFavorite={favoriteProductsIds.includes(item.id)}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselNext className="hidden lg:flex w-12 h-12 [&_svg]:size-8 " />
    </Carousel>
  );
};
