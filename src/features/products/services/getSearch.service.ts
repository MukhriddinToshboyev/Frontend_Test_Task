import api from "@/src/lib/axios"
import { ProductResponse } from "../types";


 export const getSearchService = async (searchTerm: string) =>{
    const response = await api.get(`/products/search?q=${searchTerm}`);
    return response as unknown as ProductResponse;
 }