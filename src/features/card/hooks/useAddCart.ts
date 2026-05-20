"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddCartProductRequest, addCartService } from "../services";
import { cartStore } from "../store/Cart.store";

export const useAddCart = () => {
    const queryClient = useQueryClient();
    const { clearCart } = cartStore();

    const { mutate: addCart, isPending: isAdding } = useMutation({
        mutationFn: (products: AddCartProductRequest[]) => addCartService(products),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["carts"] });
            clearCart();
        },
    });

    return { addCart, isAdding };
};
