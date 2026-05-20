"use client";

import { Trash2, ShoppingCart } from "lucide-react";
import { useAddCart } from "../hooks/useAddCart";
import { cartStore } from "../store/Cart.store";
import Image from "next/image";

export const CartDrawer = () => {

  const { cartProducts, removeFromCart, clearCart } = cartStore();
  const { addCart, isAdding } = useAddCart();
  const products = cartProducts ?? [];


  const total = products.reduce(
    (sum: number, product) => sum + product.price * product.quantity,
    0
  );


  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-28 text-neutral-400 font-mono gap-3">
        <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-full text-neutral-300">
          <ShoppingCart size={32} strokeWidth={1.5} />
        </div>
        <p className="uppercase text-xs font-bold tracking-wider mt-1">Savat bosh</p>
      </div>
    );
  }

 const handleSubmit = () => {
        if (cartProducts.length === 0) return;
        const products = cartProducts.map((q) => ({
            id: q.id,
            quantity: q.quantity,
            title: q.title,
            price: q.price,
            thumbnail: q.thumbnail,
        }));
        addCart(products);
    };

  return (
    <div className="space-y-6 font-mono text-black max-w-md mx-auto">
      <div className="border-b border-neutral-200 pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-neutral-800">Savat (Cart)</h2>
          <p className="text-[10px] text-neutral-400 uppercase mt-0.5 font-bold">
            Tanlangan: {products.length} xil mahsulot
          </p>
        </div>

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
                className="w-72 h-72 object-cover"
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
                onClick={() => removeFromCart(product.id)}
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

        <button
            onClick={clearCart}
            className="text-[10px] text-red-500 border border-red-500 px-3 py-1.5 hover:bg-red-50 uppercase font-bold transition-all"
            >
            Hammasini tozalash
        </button>

        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
            Jami summa:
          </span>
          <span className="text-lg font-black text-black">
            ${total.toLocaleString()}
          </span>
        </div>
         <button
          onClick={handleSubmit}
          disabled={isAdding}
          className="w-full text-center bg-black text-white py-3 text-xs font-bold uppercase tracking-widest border border-black hover:bg-white hover:text-black transition-colors duration-200 rounded-sm"
            >
            {isAdding ? "Yuborilmoqda..." : "Buyurtma berish"}
         </button>
      </div>
    </div>
  );
};
