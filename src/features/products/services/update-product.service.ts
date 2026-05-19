import api from "@/src/lib/axios";
import { UpdateProductRequest } from "../types/update-product";
import { Product } from "../types";


export const updateProductService = async (id: number, data: UpdateProductRequest): Promise<Product> => {
    const response = await api.put(`/products/${id}`, data);
    return response as unknown as Product;
}