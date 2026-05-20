"use client";

import { Trash2, ShoppingCart } from "lucide-react";
import { useGetCarts } from "../hooks/useGetCarts";
import { useDeleteCart } from "../hooks/useDeleteCart";
import { Cart } from "../types";

export const Orders = () => {
  const { data, isLoading, isError } = useGetCarts();
  const { deleteCart, isDeleting } = useDeleteCart();

  const carts: Cart[] = data?.carts ?? [];

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

  if (carts.length === 0) {
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
    <div className="space-y-8 font-mono text-black max-w-2xl mx-auto">

      {/* Header */}
      <div className="border-b border-neutral-200 pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-neutral-800">
            Buyurtmalar tarixi
          </h2>
          <p className="text-[10px] text-neutral-400 uppercase mt-0.5 font-bold">
            Jami: {carts.length} ta buyurtma
          </p>
        </div>
        <span className="text-[10px] bg-black text-white px-2 py-0.5 font-bold uppercase rounded-sm">
          Aktiv
        </span>
      </div>

      {/* Cartlar */}
      {carts.map((cart) => (
        <div key={cart.id} className="border border-neutral-200 rounded overflow-hidden">

          {/* Cart header */}
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 border-b border-neutral-200">
            <span className="text-[11px] font-black uppercase">
              Buyurtma #{cart.id}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-black">${cart.total.toFixed(2)}</span>
              <button
                onClick={() => deleteCart(cart.id)}
                disabled={isDeleting}
                className="p-1.5 border border-neutral-200 rounded hover:border-red-500 hover:text-red-500 text-neutral-400 transition-all disabled:opacity-50"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>

          {/* Productlar */}
          <div className="divide-y divide-neutral-100">
            {cart.products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3 bg-white hover:bg-neutral-50 transition-all group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-neutral-50 border border-neutral-100 rounded p-1 shrink-0">
                  <img
                    src={product.thumbnail || "/placeholder.jpg"}
                    alt={product.title}
                    className="object-contain w-full h-full"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase text-neutral-800 truncate">
                    {product.title}
                  </p>
                  <p className="text-[11px] text-neutral-400 font-bold">
                    ${product.price.toLocaleString()} × {product.quantity} ta
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-xs font-black">${product.total.toFixed(2)}</p>
                  <p className="text-[10px] text-green-600 font-bold">
                    ${product.discountedTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Cart footer */}
          <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200 flex justify-between items-center">
            <span className="text-[10px] uppercase text-neutral-400 font-bold">
              Chegirmali narx
            </span>
            <span className="text-sm font-black text-green-600">
              ${cart.discountedTotal.toFixed(2)}
            </span>
          </div>

        </div>
      ))}

    </div>
  );
};