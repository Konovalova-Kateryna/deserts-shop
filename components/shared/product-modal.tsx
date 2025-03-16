import Image from "next/image";
import { Button } from "@/components/ui";
import { Heart } from "lucide-react";
import { TitleComponent } from "./title";
import { Product } from "@prisma/client";
import React from "react";
import { notFound } from "next/navigation";
import { Loader } from "./loader/loader";

interface Props {
  product: Product;
  onBtnClick?: () => void;
  loading?: boolean;
  onFavoriteBtn?: () => void;
}

export const ProductModal: React.FC<Props> = ({
  product,
  onBtnClick,
  loading,
  onFavoriteBtn,
}) => {
  if (!product) {
    return notFound();
  }
  return (
    <div className="relative">
      {loading ? (
        <div className="absolute top-1/2 left-12 lg:left-1/2 transform lg:-translate-x-1/2 -translate-y-1/2 z-50">
          <Loader />
        </div>
      ) : (
        <section className={`mx-auto z-30 ${loading ? "opacity-50" : ""}`}>
          <TitleComponent className="mb-0 p-0 lg:mb-0 bg-transparent text-black lg:leading-[60px]">
            {product.titleUa}
          </TitleComponent>
          <div className="lg:flex flex-row gap-[200px] justify-center mt-5 ">
            <div className="relative">
              <Image
                src={product.imageUrl || "/NoPhoto.png"}
                alt={product.titleUa}
                width={320}
                height={320}
                className="w-auto h-[210px] mx-auto lg:w-[330px] lg:h-[390px] z-20 relative"
              />
              <Image
                src="/shadow.png"
                alt="shadow"
                width={320}
                height={30}
                className="absolute z-20 bottom-[-25px] left-4 w-[260px] h-auto"
              />
            </div>
            <div className="lg:w-[433px] gap-[70px]">
              <p className="text-xl font-normal mt-3 col-start-1">
                {product.description}
              </p>
              <div className="grid grid-cols-2 gap-[45px] lg:gap-12 justify-between items-end mt-11">
                <div className="price-with-line  lg:text-2xl font-segoe font-bold text-xl py-3 col-start-1 lg:row-start-1">
                  {product.price}грн
                </div>
                <button
                  className="w-12 h-12  transition-all col-start-2 row-start-1 lg:row-start-2 self-end justify-self-end"
                  aria-label="Add to favorites"
                  onClick={() => onFavoriteBtn?.()}
                >
                  <Heart
                    className=" hover:text-red-500 w-full h-full hover:stroke-2 "
                    strokeWidth={1}
                  />
                </button>

                <Button
                  onClick={onBtnClick}
                  className="lg:w-[214px] col-start-1 row-start-2"
                >
                  В кошик
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
