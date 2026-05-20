import api from "@/src/lib/axios";

export interface AddCartProductRequest {
    id: number;
    quantity: number;
}

export const addCartService = async (products: AddCartProductRequest[]) => {
    const response = await api.post("/carts/add", {
        userId: 1,
        products,
    });
    return response;
};
