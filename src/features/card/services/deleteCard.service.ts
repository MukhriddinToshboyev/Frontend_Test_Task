import api from "@/src/lib/axios";


export const deleteCartService = async (id: number) => {
    const response = await api.delete(`/carts/${id}`);
    return response;
}