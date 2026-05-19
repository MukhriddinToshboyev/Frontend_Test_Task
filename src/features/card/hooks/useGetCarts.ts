
"use client"

import { useQuery } from "@tanstack/react-query";
import { getCartsService } from "../services/getCarts.service";

export const useGetCarts = () => {
    return useQuery({
        queryKey: ["carts"],
        queryFn: () => getCartsService(),
    });
}