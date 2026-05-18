"use client"

import { Store, Trash2 } from "lucide-react";
import { OrderStore } from "../store/orders.store";

export const Orders = () =>{
    const { orders, removeOrder, clearOrders } = OrderStore();

    if (!orders || orders.length === 0) {
        return (
            <div className="text-center py-20 text-gray-500 font-mono">
                <p className="text-2xl mb-2">
                    <Store/>
                </p>
                <p className="uppercase text-sm font-bold">Buyurtmalar yo'q</p>
            </div>
        );
    }

    const totalPrice = orders.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return(
        <div className="space-y-6 font-mono text-black">
            <div className="border-b border-neutral-200 pb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold uppercase tracking-wider">Buyurtmalar</h2>
                    <p className="text-[11px] text-neutral-500 uppercase mt-0.5">Jami: {orders.length} ta</p>
                </div>
                <button
                    onClick={clearOrders}
                    className="flex items-center gap-2 px-3 py-1.5 border border-red-500 text-red-500 hover:bg-red-50 text-xs font-bold uppercase rounded"
                >
                    <Trash2 size={14} />
                    Hammasini o'chirish
                </button>
            </div>

            <div className="space-y-3">
                {orders.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-neutral-200 rounded hover:border-black transition-all">
                        <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-contain border border-neutral-100 rounded p-1"/>
                        <div className="flex-1">
                            <p className="text-xs font-bold uppercase">{item.title}</p>
                            <p className="text-[11px] text-neutral-400 uppercase mt-0.5">{item.category}</p>
                        </div>
                        <div className="text-sm font-black">${(item.price * item.quantity).toLocaleString()}</div>
                        <button onClick={() => removeOrder(item.id)} className="p-2 text-gray-400 hover:text-red-500 rounded">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="border-t border-neutral-200 pt-4 flex justify-end">
                <div className="text-right">
                    <p className="text-xs text-neutral-500 uppercase">Jami narx</p>
                    <p className="text-xl font-black">${totalPrice.toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}