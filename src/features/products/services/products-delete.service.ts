import api from "@/src/lib/axios";

interface deleteProductRequest {
    id: number;
}

export const deleteProductService = async (id: number): Promise<deleteProductRequest> => {
    const response = await api.delete(`/products/${id}`);
    return response as unknown as deleteProductRequest;
}