"use client"

import { useProducts } from "../hooks/useProducts"
import { productStore } from "../store/product.store";
import { OrderStore } from "../../card/store/orders.store";
import { useState } from "react";
import { useProductsDetailes } from "../hooks/useProductsDetailes";
import ProductModal from "./ProductModal";

export const Products = () =>{
    useProducts(); // API dan ma'lumot olish

    const { products, total, openModal } = productStore();
    const { addOrder, orders } = OrderStore();

    // tanlangan cardni ai sini saqlash 
    const [activeId, setActiveId] = useState<number | null>(null);

    // active id tanlanganda api ga sorov yuborish
    useProductsDetailes(activeId);

    const handleCardClick = (id: number) =>{
      setActiveId(id);
      setTimeout(()=> openModal(), 0) 
    } 

    const handleAddOrder = (item: any) => {
        addOrder(item);
        // alert(`${item.title} buyurtmaga qo'shildi!`); // yoki toast ishlatsa bo'ladi
    };

    return(
        <div className="space-y-6 font-mono text-black">
            <div className="border-b border-neutral-200 pb-4">
                <h2 className="text-lg font-bold uppercase tracking-wider">Products bo'limi</h2>
                <p className="text-[11px] text-neutral-500 uppercase mt-0.5">
                    Tizimdagi barcha faol maxsulotlar kartalari ({total} ta)
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products?.map((item) => {
                    const isOrdered = orders.some((order) => order.id === item.id);

                    return (
                        <div
                         key={item.id}
                         onClick={() => handleCardClick(item.id)}
                         className="group relative border border-neutral-200 bg-white p-4 flex flex-col justify-between hover:border-black transition-colors duration-200 rounded">
                            <div>
                                <div className="relative aspect-square w-full bg-neutral-50 border border-neutral-100 overflow-hidden rounded mb-4 flex items-center justify-center">
                                    <img
                                        src={item.thumbnail || "/placeholder.jpg"} 
                                        alt={item.title}
                                        className="object-contain max-h-full max-w-full p-2 transition-all duration-300"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-2 right-2 border border-neutral-200 bg-white px-1.5 py-0.5 text-[10px] font-bold">
                                        ★ {item.rating.toFixed(1)}
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
                                
                                {/* qoshish tugmasi */}
                                <button
                                    onClick={() => handleAddOrder(item)}
                                    className={`text-[10px] font-bold uppercase tracking-wider border px-3 py-1.5 transition-colors duration-200
                                        ${isOrdered
                                            ? "border-green-600 bg-green-600 text-white"
                                            : "border-black bg-black text-white hover:bg-white hover:text-black"
                                        }
                                    `}
                                >
                                    {isOrdered ? "✓ Qo'shilgan" : "Qo'shish"}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

                <ProductModal/>

        </div>
    )
}