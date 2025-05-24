"use client";

import { useFavorites } from "@/hooks/use-favorites";
import { useSession } from "next-auth/react";
import { ProductCard } from "./product-card";

export const FavoriteProducts = () => {
  const { data: session } = useSession();
  const { items } = useFavorites();

  if (!session) {
    return (
      <div>Ви повинні бути авторизовані, щоб переглядати улюблені товари.</div>
    );
  }

  return (
    <>
      {items.length === 0 ? (
        <div>У вас немає улюблених товарів.</div>
      ) : (
        <div className="w-full flex flex-wrap gap-3 lg:gap-20 my-10">
          {items.map((item, index) => (
            <div key={item.id} className="rounded-md max-w-[530px]">
              <ProductCard
                className="lg:h-[905px]"
                item={item.product}
                index={index}
                showDescription={true}
                onBtnClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
