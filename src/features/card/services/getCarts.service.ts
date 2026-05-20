import api from "@/src/lib/axios";
import { CartsResponse } from "../types";

export const getCartsService = async (userId: number): Promise<CartsResponse> => {
    const response = await api.get(`/users/${userId}/carts`);
    return response as unknown as CartsResponse;
}