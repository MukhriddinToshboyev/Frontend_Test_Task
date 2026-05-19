// store/cart.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartProduct {
    id: number;
    title: string;
    price: number;
    quantity: number;
    thumbnail: string;
}

interface CartState {
    cartProducts: CartProduct[];
    addToCart: (product: CartProduct) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

export const cartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cartProducts: [],

            addToCart: (product) => {
                const existing = get().cartProducts;
                const alreadyExists = existing.find((p) => p.id === product.id);
                if (!alreadyExists) {
                    set({ cartProducts: [...existing, product] });
                }
            },


            removeFromCart: (id) => {
                set({ cartProducts: get().cartProducts.filter((p) => p.id !== id) });
            },


            clearCart: () => set({ cartProducts: [] }),
        }),
        { name: "cart-store" }
    )
);