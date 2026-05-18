"use client"

import { useQuery } from "@tanstack/react-query";
import { ProductRequest } from "../types";
import { productStore } from "../store/product.store";
import { useEffect } from "react";
import { getProductsService } from "../services/products.service";


export const useProducts = (params?: ProductRequest) =>{
    
    const {setProducts, setTotal, setIsloading, setError} = productStore()

    const query = useQuery({
        queryKey: ["products", params],
        queryFn: ()=> getProductsService(params),
    })

    useEffect(()=>{
        // Har doim hozirgi yuklanish holatini store'ga o'tkazib turadi (true yoki false)
        setIsloading(query.isLoading);

        if (query.data) {
            setProducts(query.data.products || []);
            setTotal(query.data.total || 0);
        }
        
        if (query.error) {
            setError(query.error.message || "Xatolik yuz berdi");
        } else {
            setError(null);
        }
    }, [query.data, query.error, query.isLoading, setProducts, setTotal, setIsloading, setError] )
    return query;
}