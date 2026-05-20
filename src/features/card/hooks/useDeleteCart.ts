"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartService } from "../services";
import { Product } from "../../products/types";

export const useDeleteCart = () => {
    const queryClient = useQueryClient();

    const { mutate: deleteCart, isPending: isDeleting } = useMutation({
        mutationFn: (cartId: number) => deleteCartService(cartId),

        onSuccess: () => {
            queryClient.setQueryData(["carts"], (oldData: Product) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    products: [],
                };
            });
        },

        onError: (error) => {
            console.log("O'chirishda xatolik:", error);
        }
    });

    return { deleteCart, isDeleting };
}