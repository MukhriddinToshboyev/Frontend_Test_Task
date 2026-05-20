import api from "@/src/lib/axios";


export const deleteCartService = async () => {
    const response = await api.delete(`/carts/1`);
    return response;
}