import api from "@/src/lib/axios";



export const addCartService = async (products: { id: number; quantity: number }[]) => {
    const response = await api.post(`/carts/add`, {
        userId: 1,
        products,
    });
    return response;
}