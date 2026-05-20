// hooks/useAddCart.ts
"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCartService } from "../services";
import { cartStore } from "../store/Cart.store";

export const useAddCart = () => {
    const queryClient = useQueryClient();
    const { clearCart} = cartStore()

    const { mutate: addCart, isPending: isAdding } = useMutation({
        mutationFn: (products: { id: number; quantity: number }[]) =>
            addCartService(products),

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["carts"] });
            clearCart(); 
            console.log("Cart qo'shildi:", data);
        },
        onError: (error) => {
            console.log("Xatolik:", error);
        }
    });

    return { addCart, isAdding };
}