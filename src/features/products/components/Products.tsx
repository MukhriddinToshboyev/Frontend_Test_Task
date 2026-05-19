"use client"

import { useProducts } from "../hooks/useProducts"
import { productStore } from "../store/product.store";
import { useState } from "react";
import { useProductsDetailes } from "../hooks/useProductsDetailes";
import  ProductModal from "./ProductModal";
import { useSearchProducts } from "../hooks/useSearch";
import { ListOrdered, Pencil, Search, Store, Trash2, X } from "lucide-react";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { UpdateProductModal } from "./UpdateModal";
import { Product } from "../types";
import { useSearchParams, useRouter } from "next/navigation";
import { cartStore } from "../../card/store/Cart.store";

export const Products = () =>{
    const searchParams = useSearchParams(); 
    const router = useRouter(); 
    
    // URL ichidagi ?category=... qiymatini o'qiymiz
    const categoryParam = searchParams.get("category") || "";

    // tanlangan cardni ai sini saqlash 
    const [activeId, setActiveId] = useState<number | null>(null);
    const [searchTeam, setSearchTeam] = useState("");
    const [updateProduct, setUpdateProduct] = useState<Product | null>(null)

    
    useProducts(); // API dan ma'lumot olish
    useSearchProducts(searchTeam); // API dan ma'lumot olish

    const { products, total, openModal } = productStore();
    const { deleteProduct} = useDeleteProduct();


    const { cartProducts, addToCart, } = cartStore();
    useProductsDetailes(activeId);

    const handleCardClick = (id: number) =>{
      setActiveId(id);
      setTimeout(()=> openModal(), 0) 
    } 

    const handleAddToCart = (item: Product) => {
    addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: 1,
        thumbnail: item.thumbnail,
    });
};

    return(
        <div className="space-y-6 font-mono text-black">
            <div className="border-b border-neutral-200 pb-4 flex justify-between items-end">
                <div>

                    <h2 className="text-lg font-bold uppercase tracking-wider">
                        {categoryParam ? `${categoryParam} Bo'limi` : "Products bo'limi"}
                    </h2>
                    <p className="text-[11px] text-neutral-500 uppercase mt-0.5">
                        Tizimdagi barcha faol maxsulotlar kartalari ({total} ta)
                    </p>
                    <button
                    onClick={()=> router.push("/dashboard/card") } 
                    >
                      <span>
                          <Store size={20}/>
                          </span>
                    </button>

                    <button
                    onClick={()=> router.push("/dashboard/orders") }
                    >
                        <ListOrdered/>
                    </button>
                </div>

                {categoryParam && (
                    <button 
                        onClick={() => router.push("/dashboard/products")}
                        className="text-[10px] border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-2 py-1 uppercase font-bold transition-all"
                    >
                        Filtrni tozalash
                    </button>
                )}
            </div>

            {/* Search input */}
            <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                 <input
                    type="text"
                    value={searchTeam}
                    onChange={(e) => setSearchTeam(e.target.value)}
                    placeholder="Mahsulot qidirish..."
                    className="w-full pl-9 pr-9 py-2.5 border border-neutral-200 rounded text-xs font-mono focus:outline-none focus:border-black transition-all"
                />

                   {searchTeam && (
                    <button
                        onClick={() => setSearchTeam("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products?.map((item) => {
                    const isInCart = cartProducts.some((p) => p.id === item.id);

                    return (
                        <div
                         key={item.id}
                         className="group relative border border-neutral-200 bg-white p-4 flex flex-col justify-between hover:border-black transition-colors duration-200 rounded">
                            <div 
                             onClick={() => handleCardClick(item.id)}
                            >
                              <div className="absolute top-2 left-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                {/* Update */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setUpdateProduct(item);
                                    }}
                                    className="p-1.5 bg-white border border-neutral-200 rounded hover:border-blue-500 hover:text-blue-500 text-neutral-400 transition-all"
                                >
                                    <Pencil size={12} />
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteProduct(item.id);
                                    }}
                                    className="p-1.5 bg-white border border-neutral-200 rounded hover:border-red-500 hover:text-red-500 text-neutral-400 transition-all"
                                >
                                    <Trash2 size={12} />
                                </button>
                              </div>

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
                                        }
                                    `}
                                >
                                    {isInCart ? "✓ Qo'shilgan" : "Qo'shish"}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <ProductModal/>

            <UpdateProductModal
                product={updateProduct}
                isOpen={!!updateProduct}
                onClose={() => setUpdateProduct(null)}
            />
        </div>
    )
}