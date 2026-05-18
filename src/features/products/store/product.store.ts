import { persist } from "zustand/middleware";
import { Product } from "../types";
import { create } from "zustand";

interface ProductState {
    products: Product[];
    total: number;
    isLoading: boolean;
    error: string | null;

    // Modal uchun holatlar 
    isModalOpen: boolean;
    selectedProduct: Product | null;
    isModalLoading: boolean;

    setProducts: (products: Product[]) => void;
    setTotal: (total: number) => void;
    setIsloading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;

     // Modal uchun funksiyalar 
    openModal: () => void;
    closeModal: () => void;
    setSelectProduct: (product: Product) => void;
    setModalLoading: (isLoading: boolean) => void;
}

export const productStore = create<ProductState>()(
    persist(
        (set) => ({
            products: [],
            total: 0,
            currentPage: 1,
            itemsPerPage: 12,
            isLoading: false,
            error: null,

            // modal qiymatlari
            isModalOpen: false,
            selectedProduct: null,
            isModalLoading: false,



            setProducts: (products) => set({ products }),
            setTotal: (total) => set({ total }),
            setIsloading: (isLoading) => set({ isLoading }),
            setError: (error) => set({ error }),


            // modal funksiyalari
            openModal: () => set({isModalOpen: true}),
            closeModal: () => set({isModalOpen: false, selectedProduct: null}),
            setSelectProduct: (product) => set({selectedProduct: product}),
            setModalLoading: (isLoading) => set({isModalLoading: isLoading}),
            
        }),
        {
            name: "products-store",
        }
    )
);