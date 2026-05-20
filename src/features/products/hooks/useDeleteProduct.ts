import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductService } from "../services";

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    const { mutate: deleteProduct, isPending } = useMutation({
        mutationFn: (id: number) => deleteProductService(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["Search_product"] });
        },
    });

    return { deleteProduct, isPending };
};
