import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductService } from "../services";
import { CreateProductRequest } from "../types";

export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    const { mutate: createProduct, isPending } = useMutation({
        mutationFn: (data: CreateProductRequest) => createProductService(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["Search_product"] });
        },
    });

    return { createProduct, isPending };
};
