import { useQuery } from "@tanstack/react-query"
import { productStore } from "../store/product.store"
import { getProductsServiceById } from "../services/products-id.service"
import { useEffect } from "react"



export const useProductsDetailes = ( id: number | null) =>{

    const { setSelectProduct, setModalLoading } = productStore()

    const query = useQuery({
        queryKey: ["product-detailes", id],
        queryFn: ()=> getProductsServiceById(id!),
        enabled: !!id,
    });

    console.log ("query", query)

    useEffect(()=>{
        setModalLoading(query.isLoading);

        if (query.data) {
            setSelectProduct(query.data);
            console.log("images:", query.data.images);
        }
    }, [query.data, query.isLoading, setSelectProduct, setModalLoading]);
    
    return query;

}