import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FavoriteProduct } from "../types";

interface FavoritesState {
  favorites: FavoriteProduct[];
  toggleFavorite: (product: FavoriteProduct) => void;
  isFavorite: (id: number) => boolean;
  removeFavorite: (id: number) => void;
}

export const favoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (product) => {
        const exists = get().favorites.some((item) => item.id === product.id);

        if (exists) {
          set({ favorites: get().favorites.filter((item) => item.id !== product.id) });
          return;
        }

        set({ favorites: [...get().favorites, product] });
      },
      isFavorite: (id) => get().favorites.some((item) => item.id === id),
      removeFavorite: (id) => {
        set({ favorites: get().favorites.filter((item) => item.id !== id) });
      },
    }),
    { name: "favorites-store" }
  )
);
