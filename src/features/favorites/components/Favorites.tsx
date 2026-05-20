"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { favoritesStore } from "../store";
import { cartStore } from "../../card/store/Cart.store";

export const Favorites = () => {
  const { favorites, removeFavorite } = favoritesStore();
  const { addToCart } = cartStore();

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-28 text-neutral-400 font-mono gap-3">
        <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-full text-neutral-300">
          <Heart size={32} strokeWidth={1.5} />
        </div>
        <p className="uppercase text-xs font-bold tracking-wider">Favorites bosh</p>
        <Link href="/home/products" className="text-[11px] font-bold uppercase underline text-black">
          Productsga otish
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 font-mono text-black">
      <div className="mb-5 border-b border-neutral-200 pb-3">
        <h1 className="text-lg font-black uppercase tracking-wider">Favorites</h1>
        <p className="text-[11px] text-neutral-400 uppercase">{favorites.length} ta mahsulot</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {favorites.map((product) => (
          <div key={product.id} className="border border-neutral-200 bg-white p-4 rounded">
            <div className="aspect-square bg-neutral-50 border border-neutral-100 rounded flex items-center justify-center p-3 mb-3">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <p className="text-[10px] font-bold uppercase text-neutral-400">{product.category}</p>
            <h2 className="text-xs font-black uppercase line-clamp-2 mt-1">{product.title}</h2>
            <div className="flex items-center justify-between mt-4 border-t border-neutral-100 pt-3">
              <span className="text-sm font-black">${product.price.toLocaleString()}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      quantity: 1,
                      thumbnail: product.thumbnail,
                    })
                  }
                  className="p-2 border border-black bg-black text-white rounded"
                  aria-label="Cartga qoshish"
                >
                  <ShoppingCart size={14} />
                </button>
                <button
                  onClick={() => removeFavorite(product.id)}
                  className="p-2 border border-red-200 text-red-500 hover:bg-red-50 rounded"
                  aria-label="Favoritesdan ochirish"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
