import { create } from "zustand";
import { Product } from "../../products/types";
import { persist } from "zustand/middleware";


interface OrderItem  extends Product{
    quantity: number;
}

interface OrderState { 
    orders: OrderItem[];
    addOrder: (order: OrderItem) => void;
    removeOrder: (id: number) => void;
    clearOrders: () => void;
}

export const OrderStore = create<OrderState>()(
    persist(
        (set, get) =>({
            orders: [],


            addOrder: (product) => {
                const existingOrders = get().orders;
                const alreadyExists = existingOrders.find((order) => order.id === product.id);

                if(alreadyExists){
                    set({
                        orders: existingOrders.map((item) =>
                            item.id === product.id
                            ? {...item, quantity: item.quantity +1}
                            : item
                          ),
                     });
                } else{
                    set({
                        orders: [...existingOrders, {...product, quantity: 1}],});
                }
            },

            removeOrder: (id) => {
                set({
                    orders: get().orders.filter((order) => order.id !== id)
                });
            },

             clearOrders: () => set({ orders: [] }),
        }),
        {
            name: `order store`,
        }
    )
);      
        
                