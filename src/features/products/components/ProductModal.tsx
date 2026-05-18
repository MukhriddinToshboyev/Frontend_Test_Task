"use client";

import React, { useState } from "react";
import { productStore } from "../store/product.store";
import { X, Star, Package, Tag, Percent, ShoppingCart } from "lucide-react";

export default function ProductModal() {
    const { isModalOpen, closeModal, selectedProduct, isModalLoading } = productStore();
    const [activeImg, setActiveImg] = useState(0);

    if (!isModalOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-mono"
            onClick={closeModal}
        >
            <div
                className="bg-white border border-black w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Yopish tugmasi */}
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 z-10 p-1.5 hover:bg-neutral-100 rounded transition-all"
                >
                    <X size={16} />
                </button>

                {isModalLoading ? (
                    <div className="flex items-center justify-center py-20 text-xs font-bold uppercase text-neutral-400">
                        Yuklanmoqda...
                    </div>

                ) : selectedProduct ? (
                    <div>
                        {/* Asosiy katta rasm */}
                        <div className="w-full h-72 bg-neutral-50 border-b border-neutral-200 flex items-center justify-center p-4">
                            <img
                                src={selectedProduct.images?.[activeImg] || selectedProduct.thumbnail}
                                alt={selectedProduct.title}
                                className="h-full object-contain"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-4">

                            {/* Category + Brand */}
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">
                                    {selectedProduct.category}
                                </span>
                                {selectedProduct.brand && (
                                    <>
                                        <span className="text-neutral-300">|</span>
                                        <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">
                                            {selectedProduct.brand}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Title */}
                            <h2 className="text-base font-black uppercase leading-tight">
                                {selectedProduct.title}
                            </h2>

                            {/* Description */}
                            <p className="text-[11px] text-neutral-500 leading-relaxed">
                                {selectedProduct.description}
                            </p>

                            {/* Price + Discount */}
                            <div className="flex items-center gap-3 py-3 border-t border-b border-neutral-100">
                                <span className="text-2xl font-black">
                                    ${selectedProduct.price.toLocaleString()}
                                </span>
                                {selectedProduct.discountPercentage > 0 && (
                                    <span className="flex items-center gap-1 text-[11px] font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded">
                                        <Percent size={11} />
                                        {selectedProduct.discountPercentage}% chegirma
                                    </span>
                                )}
                                {selectedProduct.discountPercentage > 0 && (
                                    <span className="text-xs text-neutral-400 line-through">
                                        ${(selectedProduct.price / (1 - selectedProduct.discountPercentage / 100)).toFixed(2)}
                                    </span>
                                )}
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2 p-3 border border-neutral-100 rounded bg-neutral-50">
                                    <Star size={14} className="text-yellow-500 fill-yellow-500 shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-neutral-400 uppercase">Reyting</p>
                                        <p className="text-sm font-black">{selectedProduct.rating} / 5</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 p-3 border border-neutral-100 rounded bg-neutral-50">
                                    <Package size={14} className="text-blue-500 shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-neutral-400 uppercase">Omborda</p>
                                        <p className="text-sm font-black">{selectedProduct.stock} ta</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 p-3 border border-neutral-100 rounded bg-neutral-50">
                                    <Tag size={14} className="text-purple-500 shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-neutral-400 uppercase">Brend</p>
                                        <p className="text-sm font-black">{selectedProduct.brand || "—"}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 p-3 border border-neutral-100 rounded bg-neutral-50">
                                    <ShoppingCart size={14} className="text-orange-500 shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-neutral-400 uppercase">Kategoriya</p>
                                        <p className="text-sm font-black capitalize">{selectedProduct.category}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Orqaga tugmasi */}
                            <button
                                onClick={closeModal}
                                className="w-full py-2.5 border border-black text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-200"
                            >
                                ← Orqaga
                            </button>
                        </div>
                    </div>

                ) : (
                    <div className="flex items-center justify-center py-20 text-xs text-red-500 font-bold uppercase">
                        Xatolik yuz berdi!
                    </div>
                )}
            </div>
        </div>
    );
}