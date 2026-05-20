// components/CreateProductModal.tsx
"use client"

import { useState } from "react";
import { X } from "lucide-react";
import { useCreateProduct } from "../hooks/useCreateProduct";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const INITIAL_FORM = {
    title: "",
    price: 0,
    description: "",
    category: "",
    stock: 0,
};

export const CreateProductModal = ({ isOpen, onClose }: Props) => {
    const { createProduct, isPending } = useCreateProduct();
    const [form, setForm] = useState(INITIAL_FORM);

    if (!isOpen) return null;

    const handleSubmit = () => {
        
        if (!form.title || !form.price || !form.category) {
            alert("Barcha maydonlarni to'ldiring!");
            return;
        }

        createProduct(form, {
            onSuccess: () => {
                setForm(INITIAL_FORM); 
                onClose();
            }
        });
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
                {/* Yopish */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-1.5 hover:bg-neutral-100 rounded"
                >
                    <X size={16} />
                </button>

                <h2 className="text-sm font-black uppercase mb-4">Yangi mahsulot qo&apos;shish</h2>

                <div className="space-y-3">
                    {/* Image */}
                    <div>   
                        
                    </div>
                    {/* Title */}
                    <div>
                        <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">Nomi *</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="Mahsulot nomi"
                            className="w-full border border-neutral-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-black"
                        />
                    </div>

                    {/* Price + Stock */}
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">Narx ($) *</label>
                            <input
                                type="number"
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                                placeholder="0"
                                className="w-full border border-neutral-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-black"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">Omborda (ta)</label>
                            <input
                                type="number"
                                value={form.stock}
                                onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                                placeholder="0"
                                className="w-full border border-neutral-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-black"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">Kategoriya *</label>
                        <input
                            type="text"
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            placeholder="beauty, smartphones..."
                            className="w-full border border-neutral-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-black"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">Tavsif</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            placeholder="Mahsulot haqida..."
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
                        {isPending ? "Saqlanmoqda..." : "+ Qo'shish"}
                    </button>
                </div>
            </div>
        </div>
    );
}
