import { Product } from "../../products/types";


export interface DeleteCartResponse {
    id: number;
    total: number;
    userId: number;
    products: Product[];
}