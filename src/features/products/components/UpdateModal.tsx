// components/UpdateProductModal.tsx
"use client"

import { useState } from "react";
import { X } from "lucide-react";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import { Product } from "../types";

interface Props {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export const UpdateProductModal = ({ product, isOpen, onClose }: Props) => {
    const { updateProduct, isPending } = useUpdateProduct();

    const [form, setForm] = useState({
        title: product?.title || "",
        price: product?.price || 0,
        description: product?.description || "",
        stock: product?.stock || 0,
    });

    if (!isOpen || !product) return null;

    const handleSubmit = () => {
        updateProduct(
            { id: product.id, data: form },
            { onSuccess: () => onClose() } 
        );
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-mono"
            onClick={onClose}
        >
            <div
                className="bg-white border border-black w-full max-w-md rounded p-5 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-1.5 hover:bg-neutral-100 rounded"
                >
                    <X size={16} />
                </button>

                <h2 className="text-sm font-black uppercase mb-4">Mahsulotni tahrirlash</h2>

                <div className="space-y-3">
                    {/* Title */}
                    <div>
                        <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">Nomi</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full border border-neutral-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-black"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">Narx ($)</label>
                        <input
                            type="number"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                            className="w-full border border-neutral-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-black"
                        />
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">Omborda (ta)</label>
                        <input
                            type="number"
                            value={form.stock}
                            onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                            className="w-full border border-neutral-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-black"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">Tavsif</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            rows={3}
                            className="w-full border border-neutral-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-black resize-none"
                        />
                    </div>
                </div>

                {/* Tugmalar */}
                <div className="flex gap-2 mt-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 border border-neutral-200 text-xs font-bold uppercase hover:border-black transition-all"
                    >
                        Bekor qilish
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isPending}
                        className="flex-1 py-2 bg-black text-white text-xs font-bold uppercase hover:bg-neutral-800 transition-all disabled:opacity-50"
                    >
                        {isPending ? "Saqlanmoqda..." : "Saqlash"}
                    </button>
                </div>
            </div>
        </div>
    );
}
