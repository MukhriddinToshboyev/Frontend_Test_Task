"use client";

import { useProducts } from "../hooks/useProducts";
import { productStore } from "../store/product.store";
import { useState } from "react";
import { useProductsDetailes } from "../hooks/useProductsDetailes";
import ProductModal from "./ProductModal";
import { useSearchProducts } from "../hooks/useSearch";
import { Pencil, Search, Trash2, X } from "lucide-react";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { UpdateProductModal } from "./UpdateModal";
import { Product } from "../types";
import { useSearchParams, useRouter } from "next/navigation";
import { cartStore } from "../../card/store/Cart.store";

const CATEGORIES = [
    "All",
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
];

export const Products = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const categoryParam = searchParams.get("category") || "";
    const [activeId, setActiveId] = useState<number | null>(null);
    const [searchTeam, setSearchTeam] = useState("");
    const [updateProduct, setUpdateProduct] = useState<Product | null>(null);

    useProducts( undefined, categoryParam);
    useSearchProducts(searchTeam);

    const { products, total, openModal } = productStore();
    const { deleteProduct } = useDeleteProduct();
    const { cartProducts, addToCart } = cartStore();

    useProductsDetailes(activeId);

    const handleCardClick = (id: number) => {
        setActiveId(id);
        setTimeout(() => openModal(), 0);
    };

    const handleAddToCart = (item: Product) => {
        addToCart({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: 1,
            thumbnail: item.thumbnail,
        });
    };

    const handleCategory = (cat: string) => {
        if (cat === "All") {
            router.push("/dashboard/products");
        } else {
            router.push(`/dashboard/products?category=${cat}`);
        }
    };

    return (
        <div className="flex gap-6 font-mono text-black">

            {/* Chap: Kategoriyalar */}
            <aside className="w-48 shrink-0">
                <p className="text-xl font-black uppercase text-neutral-950 mb-3 tracking-widest">
                    Products
                </p>
                <div className="flex flex-col gap-0.5">
                    {CATEGORIES.map((cat) => {
                        const isActive = cat === "All"
                            ? !categoryParam
                            : categoryParam === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => handleCategory(cat)}
                                className={`text-left px-3 py-2 text-[11px] font-bold uppercase rounded transition-all
                                    ${isActive
                                        ? "bg-black text-white"
                                        : "text-neutral-500 hover:bg-neutral-100 hover:text-black"
                                    }`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>
            </aside>

            <div className="flex-1 min-w-0">

                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-wider">
                            {categoryParam || "Barcha mahsulotlar"}
                        </h2>
                        <p className="text-[11px] text-neutral-400 uppercase mt-0.5">
                            {total} ta mahsulot
                        </p>
                    </div>

                   <div className="relative flex items-center">

                    <input
                        type="text"
                        value={searchTeam}
                        onChange={(e) => setSearchTeam(e.target.value)}
                        placeholder="Mahsulot qidirish..."
                        className="w-72 h-10 pl-10 pr-24 border border-neutral-200 rounded-lg text-[12px] font-mono focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-white placeholder:text-neutral-300"
                    />

                    <div className="absolute right-1 flex items-center gap-1">
                        {searchTeam && (
                            <button
                                onClick={() => setSearchTeam("")}
                                className="p-1.5 text-neutral-300 hover:text-neutral-600 transition-all rounded"
                            >
                                <X size={13} />
                            </button>
                        )}
                        <button
                            className="h-8 px-3 bg-black text-white text-[11px] font-black uppercase rounded-md hover:bg-neutral-800 transition-all tracking-wider"
                        >
                            Izlash
                        </button>
                    </div>
                </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products?.map((item) => {
                        const isInCart = cartProducts.some((p) => p.id === item.id);
                        return (
                            <div
                                key={item.id}
                                className="group relative border border-neutral-200 bg-white p-4 flex flex-col justify-between hover:border-black transition-colors duration-200 rounded"
                            >
                                <div onClick={() => handleCardClick(item.id)}>
                                    {/* Action buttons */}
                                    <div className="absolute top-2 left-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setUpdateProduct(item); }}
                                            className="p-1.5 bg-white border border-neutral-200 rounded hover:border-blue-500 hover:text-blue-500 text-neutral-400 transition-all"
                                        >
                                            <Pencil size={12} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); deleteProduct(item.id); }}
                                            className="p-1.5 bg-white border border-neutral-200 rounded hover:border-red-500 hover:text-red-500 text-neutral-400 transition-all"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>

                                    {/* Image */}
                                    <div className="relative aspect-square w-full bg-neutral-50 border border-neutral-100 overflow-hidden rounded mb-4 flex items-center justify-center">
                                        <img
                                            src={item.thumbnail || "/placeholder.jpg"}
                                            alt={item.title}
                                            className="object-contain max-h-full max-w-full p-2 transition-all duration-300"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-2 right-2 border border-neutral-200 bg-white px-1.5 py-0.5 text-[10px] font-bold">
                                            ★ {item.rating?.toFixed(1)}
                                        </div>
                                    </div>

                                    <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider block mb-1">
                                        {item.category}
                                    </span>
                                    <h3 className="text-xs font-bold uppercase tracking-tight text-black line-clamp-2 mb-2 group-hover:underline">
                                        {item.title}
                                    </h3>
                                </div>

                                <div className="pt-4 border-t border-neutral-100 mt-4 flex items-center justify-between">
                                    <div className="text-sm font-black">${item.price.toLocaleString()}</div>
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className={`text-[10px] font-bold uppercase tracking-wider border px-3 py-1.5 transition-colors duration-200
                                            ${isInCart
                                                ? "border-green-600 bg-green-600 text-white"
                                                : "border-black bg-black text-white hover:bg-white hover:text-black"
                                            }`}
                                    >
                                        {isInCart ? "✓ Qo'shilgan" : "Qo'shish"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <ProductModal />
            <UpdateProductModal
                product={updateProduct}
                isOpen={!!updateProduct}
                onClose={() => setUpdateProduct(null)}
            />
        </div>
    );
};