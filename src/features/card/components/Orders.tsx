"use client";

import { Trash2, ShoppingCart } from "lucide-react";
import { useGetCarts } from "../hooks/useGetCarts";
import { useDeleteCart } from "../hooks";
import { Product } from "../../products/types";
import Image from "next/image";

export const Orders = () => {
  const { data, isLoading, isError } = useGetCarts();
  const { deleteCart, isDeleting } = useDeleteCart();
  const products = data?.products ?? [];

    const total = products.reduce(
    (sum: number, product: Product) => sum + product.price * product.quantity, 0 );

  if (isLoading) {
    return (
      <div className="text-center py-20 text-xs font-mono uppercase tracking-widest text-neutral-400 animate-pulse">
        Yuklanmoqda...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-xs text-red-500 font-mono uppercase font-bold border border-red-200 bg-red-50/50 rounded">
        Xatolik yuz berdi!
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-28 text-neutral-400 font-mono gap-3">
        <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-full text-neutral-300">
          <ShoppingCart size={32} strokeWidth={1.5} />
        </div>
        <p className="uppercase text-xs font-bold tracking-wider mt-1">Buyurtmalar bosh</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-mono text-black max-w-md mx-auto">
      <div className="border-b border-neutral-200 pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-neutral-800">Buyurtmalar tarixi</h2>
          <p className="text-[10px] text-neutral-400 uppercase mt-0.5 font-bold">
            Tanlangan: {products.length} xil mahsulot
          </p>
        </div>
        <span className="text-[10px] bg-black text-white px-2 py-0.5 font-bold uppercase rounded-sm">
          Aktiv
        </span>
      </div>

      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-4 p-3 bg-white border border-neutral-200 hover:border-black rounded transition-all duration-200 group"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-neutral-50 border border-neutral-100 rounded p-1 shrink-0">
              <Image
                src={product.thumbnail || "/placeholder.jpg"}
                alt={product.title}
                className="object-cover w-72 h-72"
              />
            </div>

            <div className="flex-1 min-w-0 space-y-0.5">
              <p className="text-xs font-bold uppercase text-neutral-800 truncate group-hover:text-black">
                {product.title}
              </p>
              <p className="text-[11px] text-neutral-400 font-bold">
                ${product.price.toLocaleString()} <span className="font-normal text-[10px] text-neutral-300">×</span> {product.quantity} ta
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-black text-neutral-900">
                ${(product.price * product.quantity).toLocaleString()}
              </span>
              <button
                onClick={() => deleteCart(product.id)}
                disabled={isDeleting}
                title="Mahsulotni o'chirish"
                className="p-2 text-neutral-300 hover:text-red-500 border border-transparent hover:border-red-100 hover:bg-red-50/50 rounded transition-all duration-150 disabled:opacity-40 shrink-0"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-dashed border-neutral-200 pt-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
            Jami summa:
          </span>
          <span className="text-lg font-black text-black">
            ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
};