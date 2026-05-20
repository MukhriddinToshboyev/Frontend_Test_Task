"use client";

import { useRouter } from "next/navigation";
import { productStore } from "../products/store/product.store"; 
import Image from "next/image";


export const  Dashboard =() => {
  const router = useRouter();
  const { products } = productStore();
  
  const heroProduct = products?.[0];

  return (
    <div className="space-y-12 font-mono text-black p-4">
      <div className="border border-black bg-neutral-50 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 rounded">
        <div className="space-y-4 max-w-xl">
          <span className="text-[10px] bg-black text-white px-2 py-0.5 font-bold uppercase tracking-widest">
            Yangi Kolleksiya
          </span>
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-none">
            Sifatli va hamyonbop mahsulotlar faqat bizda
          </h1>
          <p className="text-xs text-neutral-500 uppercase leading-relaxed">
            DummyJSON bazasidagi eng sara, yuqori reytingga ega bolgan mahsulotlarni qulay interfeys orqali sotib oling.
          </p>
          <button
            onClick={() => router.push("/dashboard/products")}
            className="inline-block border border-black bg-black text-white text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-white hover:text-black transition-colors"
          >
            Xaridni boshlash 
          </button>
        </div>

        {heroProduct && (
          <div className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center bg-white border border-neutral-200 p-4 rounded shadow-sm">
            <Image
              src={heroProduct.thumbnail}
              alt={heroProduct.title}
              className="w-72 h-72 object-contain"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="border-b border-neutral-200 pb-2 flex justify-between items-end">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Tavsiya etilgan mahsulotlar
          </h3>
          <button
            onClick={() => router.push("/dashboard/products")}
            className="text-[10px] font-bold uppercase underline hover:text-neutral-500"
          >
            Hammasini korish
          </button>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => router.push("/dashboard/products")}
                className="group border border-neutral-200 p-4 flex flex-col justify-between hover:border-black transition-colors cursor-pointer rounded bg-white"
              >
                <div>
                  <div className="aspect-square w-full bg-neutral-50 border overflow-hidden rounded mb-3 flex items-center justify-center p-2">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      className="object-contain max-h-full max-w-full"
                    />
                  </div>
                  <span className="text-[9px] font-bold text-neutral-400 uppercase block mb-0.5">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-bold uppercase tracking-tight truncate group-hover:underline">
                    {item.title}
                  </h4>
                </div>
                <div className="text-xs font-black mt-3 border-t pt-2 border-neutral-100">
                  ${item.price}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border border-dashed border-neutral-200 text-xs text-neutral-400 uppercase">
            Vitrina yuklanmoqda... `Products` bolimiga otib malumotlarni faollashtiring.
          </div>
        )}
      </div>

    </div>
  );
}