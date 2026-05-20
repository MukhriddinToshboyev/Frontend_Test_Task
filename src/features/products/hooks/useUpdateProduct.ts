import { useMutation } from "@tanstack/react-query";
import { productStore } from "../store/product.store";
import { updateProductService } from "../services";
import { UpdateProductRequest } from "../types";



export const useUpdateProduct = () => {
    const { products, setProducts } = productStore();

    const { mutate: updateProduct, isPending } = useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateProductRequest }) => 
            updateProductService(id, data),

        onSuccess: (updatedProduct) => {
            // Store da ham yangilash 
            const updated = products.map((item) =>
                item.id === updatedProduct.id ? updatedProduct : item
            );
            setProducts(updated);
            console.log("Yangilandi:", updatedProduct);
        },

        onError: (error) => {
            console.log("Yangilashda xatolik:", error);
        }
    });

    return { updateProduct, isPending };
}