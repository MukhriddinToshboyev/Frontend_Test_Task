
"use client"

import { useQuery } from "@tanstack/react-query";
import { getCartsService } from "../services";

export const useGetCarts = () => {
    return useQuery({
        queryKey: ["carts"],
        queryFn: () => getCartsService(),
    });
}