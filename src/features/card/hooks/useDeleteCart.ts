"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartService } from "../services";
import { Product } from "../../products/types";

interface CartResponse {
    products: Product[];
}

export const useDeleteCart = () => {
    const queryClient = useQueryClient();

    const { mutate: deleteCart, isPending: isDeleting } = useMutation({
        mutationFn: (cartId: number) => deleteCartService(cartId),
        onSuccess: () => {
            queryClient.setQueryData<CartResponse>(["carts"], (oldData) => {
                if (!oldData) return oldData;

                return {
                    ...oldData,
                    products: [],
                };
            });
        },
    });

    return { deleteCart, isDeleting };
};
