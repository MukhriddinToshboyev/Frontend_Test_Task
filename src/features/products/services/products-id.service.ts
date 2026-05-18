import api from "@/src/lib/axios";
import { Product } from "../types";


export const getProductsServiceById = async (id: number): Promise<Product> =>{
    const responce  = await api.get<Product>(`/products/${id}`);
    return responce as unknown as Product;
}