
"use client"

import { useQuery } from "@tanstack/react-query";
import { getCartsService } from "../services";
import { useAuthStore } from "../../auth/store";
import { CartsResponse } from "../types";


export const useGetCarts = () => {
    const user = useAuthStore((state) => state.user);
    return useQuery<CartsResponse>({
        queryKey: ["carts", user?.id],
        queryFn: () => getCartsService(user!.id),
        enabled: !!user?.id,
    });
}