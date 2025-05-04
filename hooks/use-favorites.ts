import { useFavoriteStore } from "@/store";
import { Product } from "@prisma/client";

import React from "react";

export interface IFavorite {
  id: string;
  userId: string;
  product: Product;
  titleUa: string;
  imageUrl: string;
  price: number;
}

type ReturnProps = {
  loading: boolean;
  error: boolean;
  items: IFavorite[];
  //   fetchFavoriteItems: () => Promise<void>;
  addFavoriteItem: (id: string) => Promise<void>;
};

export const useFavorites = (): ReturnProps => {
  const favoritesState = useFavoriteStore((state) => state);

  React.useEffect(() => {
    favoritesState.fetchFavoriteItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return favoritesState;
};
