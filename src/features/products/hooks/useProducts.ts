"use client"

import { useQuery } from "@tanstack/react-query";
import { ProductRequest } from "../types";
import { getProductsService } from "../services";


export const useProducts = (params?: ProductRequest, category?: string) =>{
    return useQuery({
        queryKey: ["products", params, category],
        queryFn: ()=> getProductsService(params, category),
    });
}
