import { useMutation } from "@tanstack/react-query";
import { productStore } from "../store/product.store";
import { deleteProductService } from "../services";


export const useDeleteProduct = () => {
    const { products, setProducts, setTotal, total } = productStore();

    const { mutate: deleteProduct, isPending } = useMutation({
        mutationFn: (id: number) => deleteProductService(id),

        onMutate: (id) => {
            console.log("O'chirilmoqda:", id);
        },

        onSuccess: (_, id) => {
            // Store dan ham o'chiramiz
            const updated = products.filter((item) => item.id !== id);
            setProducts(updated);
            setTotal(total - 1);
            console.log("O'chirildi:", id);
        },

        onError: (error) => {
            console.log("O'chirishda xatolik:", error);
        }
    });

    return { deleteProduct, isPending };
}