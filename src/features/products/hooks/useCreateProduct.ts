import { useMutation } from "@tanstack/react-query";
import { productStore } from "../store/product.store";
import { createProductService } from "../services";
import { CreateProductRequest } from "../types";



export const useCreateProduct = () => {
    const { products, setProducts, setTotal, total } = productStore();

    const { mutate: createProduct, isPending } = useMutation({
        mutationFn: (data: CreateProductRequest) => createProductService(data),

        onSuccess: (newProduct) => {
            //  Store ga yangi product qo'shamiz
            setProducts([newProduct, ...products]);
            setTotal(total + 1);
            console.log("Yaratildi:", newProduct);
        },

        onError: (error) => {
            console.log("Yaratishda xatolik:", error);
        }
    });

    return { createProduct, isPending };
}