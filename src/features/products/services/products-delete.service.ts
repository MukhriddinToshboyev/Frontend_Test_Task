import api from "@/src/lib/axios";


export const deleteProductService = async (id: number): Promise<void> => {
    const response = await api.delete(`/products/${id}`);
    return response as unknown as void;
}