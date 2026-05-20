import api from "@/src/lib/axios";
import { UpdateProductRequest } from "../types/update-product.types";
import { Product } from "../types";


export const updateProductService = async (id: number, data: UpdateProductRequest): Promise<Product> => {
    const response = await api.put<Product>(`/products/${id}`, data);
    return response as unknown as Product;
}