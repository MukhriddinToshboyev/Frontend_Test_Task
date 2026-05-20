import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductService } from "../services";
import { UpdateProductRequest } from "../types";

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    const { mutate: updateProduct, isPending } = useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateProductRequest }) =>
            updateProductService(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["Search_product"] });
        },
    });

    return { updateProduct, isPending };
};
