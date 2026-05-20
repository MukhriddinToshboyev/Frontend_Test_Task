"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Heart, Minus, Pencil, Plus, Trash2, X } from "lucide-react";
import { useAuthStore } from "../../auth/store/auth.store";
import { cartStore } from "../../card/store/Cart.store";
import { favoritesStore } from "../../favorites/store";
import { useProducts } from "../hooks/useProducts";
import { useProductsDetailes } from "../hooks/useProductsDetailes";
import { useSearchProducts } from "../hooks/useSearch";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { productStore } from "../store/product.store";
import { Product } from "../types";
import ProductModal from "./ProductModal";
import { UpdateProductModal } from "./UpdateModal";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [updateProduct, setUpdateProduct] = useState<Product | null>(null);

  const productsQuery = useProducts(undefined, categoryParam);
  const searchQuery = useSearchProducts(searchTerm);
  const { openModal } = productStore();
  const { deleteProduct } = useDeleteProduct();
  const { isAuthenticated } = useAuthStore();
  const { cartProducts, addToCart, incrementQuantity, decrementQuantity } = cartStore();
  const { toggleFavorite, isFavorite } = favoritesStore();

  useProductsDetailes(activeId);

  const activeData = searchTerm ? searchQuery.data : productsQuery.data;
  const products = activeData?.products ?? [];
  const total = activeData?.total ?? 0;
  const isLoading = searchTerm ? searchQuery.isLoading : productsQuery.isLoading;

  const handleCardClick = (id: number) => {
    setActiveId(id);
    setTimeout(() => openModal(), 0);
  };

  const handleCategory = (cat: string) => {
    if (cat === "All") {
      router.push("/home/products");
      return;
    }

    router.push(`/home/products?category=${cat}`);
  };

  return (
    <div className="flex gap-6 font-mono text-black p-6">
      <aside className="w-48 shrink-0 hidden md:block">
        <p className="text-xl font-black uppercase text-neutral-950 mb-3 tracking-widest">
          Products
        </p>
        <div className="flex flex-col gap-0.5">
          {CATEGORIES.map((cat) => {
            const isActive = cat === "All" ? !categoryParam : categoryParam === cat;

            return (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`text-left px-3 py-2 text-[11px] font-bold uppercase rounded transition-all ${
                  isActive
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
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-5">
          <div>
            <h2 className="text-lg font-black uppercase tracking-wider">
              {categoryParam || "Barcha mahsulotlar"}
            </h2>
            <p className="text-[11px] text-neutral-400 uppercase mt-0.5">
              {total} ta mahsulot
            </p>
          </div>

          <div className="relative flex items-center w-full md:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Mahsulot qidirish..."
              className="w-full md:w-72 h-10 pl-10 pr-10 border border-neutral-200 rounded-lg text-[12px] font-mono focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-white placeholder:text-neutral-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2 p-1.5 text-neutral-300 hover:text-neutral-600 transition-all rounded"
                aria-label="Qidiruvni tozalash"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-xs font-bold uppercase text-neutral-400">
            Yuklanmoqda...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((item) => {
              const cartProduct = cartProducts.find((product) => product.id === item.id);
              const favorite = isFavorite(item.id);

              return (
                <div
                  key={item.id}
                  className="group relative border border-neutral-200 bg-white p-4 flex flex-col justify-between hover:border-black transition-colors duration-200 rounded"
                >
                  <button
                    onClick={() =>
                      toggleFavorite({
                        id: item.id,
                        title: item.title,
                        price: item.price,
                        thumbnail: item.thumbnail,
                        category: item.category,
                      })
                    }
                    className={`absolute top-2 right-2 z-20 p-2 border rounded bg-white transition-all ${
                      favorite
                        ? "border-red-500 text-red-500"
                        : "border-neutral-200 text-white [filter:drop-shadow(0_0_1px_black)] hover:text-red-500"
                    }`}
                    aria-label="Favorites"
                  >
                    <Heart size={15} fill={favorite ? "currentColor" : "white"} />
                  </button>

                  <div onClick={() => handleCardClick(item.id)} className="cursor-pointer">
                    {isAuthenticated && (
                      <div className="absolute top-2 left-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setUpdateProduct(item);
                          }}
                          className="p-1.5 bg-white border border-neutral-200 rounded hover:border-blue-500 hover:text-blue-500 text-neutral-400 transition-all"
                          aria-label="Tahrirlash"
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProduct(item.id);
                          }}
                          className="p-1.5 bg-white border border-neutral-200 rounded hover:border-red-500 hover:text-red-500 text-neutral-400 transition-all"
                          aria-label="Ochirish"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    )}

                    <div className="relative aspect-square w-full bg-neutral-50 border border-neutral-100 overflow-hidden rounded mb-4 flex items-center justify-center">
                      <img
                        src={item.thumbnail || "/placeholder.jpg"}
                        alt={item.title}
                        className="object-contain max-h-full max-w-full p-2 transition-all duration-300"
                        loading="lazy"
                      />
                      <div className="absolute bottom-2 right-2 border border-neutral-200 bg-white px-1.5 py-0.5 text-[10px] font-bold">
                        {item.rating?.toFixed(1)}
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
                    {cartProduct ? (
                      <div className="flex items-center border border-black rounded overflow-hidden">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="h-8 w-8 flex items-center justify-center hover:bg-neutral-100"
                          aria-label="Kamaytirish"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="h-8 min-w-8 px-2 flex items-center justify-center text-[11px] font-black border-x border-black">
                          {cartProduct.quantity}
                        </span>
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="h-8 w-8 flex items-center justify-center hover:bg-neutral-100"
                          aria-label="Oshirish"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          addToCart({
                            id: item.id,
                            title: item.title,
                            price: item.price,
                            quantity: 1,
                            thumbnail: item.thumbnail,
                          })
                        }
                        className="text-[10px] font-bold uppercase tracking-wider border border-black bg-black text-white px-3 py-1.5 transition-colors duration-200 hover:bg-white hover:text-black"
                      >
                        Qoshish
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
