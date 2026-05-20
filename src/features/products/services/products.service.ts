import api from "@/src/lib/axios";
import { ProductRequest, ProductResponse } from "../types";


export const getProductsService = async (params?: ProductRequest, category?: string): Promise<ProductResponse>  =>{

    const url = category
    ? `/products/category/${category}`
    : `/products`;

    const response = await api.get<ProductResponse>(url,{
        params:{
            limit: params?.limit || 0,
            skip: params?.skip || 0,
            select: params?.select,
        },
    });
    return response as unknown as ProductResponse;
} 