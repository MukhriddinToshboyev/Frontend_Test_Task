import api from "@/src/lib/axios";
import { ProductResponse } from "../../products/types";


export const getCartsService = async () => {
    const response = await api.get(`/carts/1`);
    return response as unknown as ProductResponse;
}