import { IFavorite } from "@/hooks/use-favorites";
import { Api } from "@/services/api-client";

import { create } from "zustand";

export interface FavoriteState {
  loading: boolean;
  error: boolean;
  items: IFavorite[];

  fetchFavoriteItems: () => Promise<void>; //Отримання улюблених товарів
  addFavoriteItem: (id: string) => Promise<void>; // Запит на додавання товару в улюблені
}

export const useFavoriteStore = create<FavoriteState>((set) => ({
  items: [],
  error: false,
  loading: true,

  fetchFavoriteItems: async () => {
    try {
      set({ loading: true, error: false });

      const data = await Api.favorites.getFavorites();

      set(data);
    } catch (error) {
      console.error(error);
      set({ error: true, loading: false });
    } finally {
      set({ loading: false });
    }
  },

  addFavoriteItem: async (id: string) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.favorites.addFavoriteItem(id);

      set(data);
    } catch (error) {
      console.error(error);
      set({ error: true, loading: false });
    } finally {
      set({ loading: false });
    }
  },
}));
