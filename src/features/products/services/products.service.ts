import api from "@/src/lib/axios";
import { ProductRequest, ProductResponse } from "../types";


export const getProductsService = async (params?: ProductRequest): Promise<ProductResponse>  =>{

    const response = await api.get<ProductResponse>("/auth/products",{
        params:{
            limit: params?.limit || 10,
            skip: params?.skip || 0,
            select: params?.select,
        },
    });
    return response as unknown as ProductResponse;
} 