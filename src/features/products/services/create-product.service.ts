import api from "@/src/lib/axios";
import { Product } from "../types";
import { CreateProductRequest } from "../types/create-product.types";


export const createProductService = async (data: CreateProductRequest): Promise<Product> => {
    const response = await api.post(`/products/add`, data);
    return response as unknown as Product;
}