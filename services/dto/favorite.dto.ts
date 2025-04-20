import { FavoriteItem, Product, Favorite } from "@prisma/client";

export type FavoriteItemDTO = FavoriteItem & {
  product: Product;
};

export interface FavoriteDTO extends Favorite {
  items: FavoriteItemDTO[];
}
