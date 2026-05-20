import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartProduct {
    id: number;
    title: string;
    price: number;
    quantity: number;
    thumbnail: string;
}

interface CartState {
    cartProducts: CartProduct[];
    addToCart: (product: CartProduct) => void;
    incrementQuantity: (id: number) => void;
    decrementQuantity: (id: number) => void;
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
                    return;
                }
                set({
                    cartProducts: existing.map((p) =>
                        p.id === product.id ? { ...p, quantity: p.quantity + product.quantity } : p
                    ),
                });
            },

            incrementQuantity: (id) => {
                set({
                    cartProducts: get().cartProducts.map((p) =>
                        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
                    ),
                });
            },

            decrementQuantity: (id) => {
                set({
                    cartProducts: get()
                        .cartProducts.map((p) =>
                            p.id === id ? { ...p, quantity: p.quantity - 1 } : p
                        )
                        .filter((p) => p.quantity > 0),
                });
            },

            removeFromCart: (id) => {
                set({ cartProducts: get().cartProducts.filter((p) => p.id !== id) });
            },


            clearCart: () => set({ cartProducts: [] }),
        }),
        { name: "cart-store" }
    )
);
