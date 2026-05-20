import { useQuery } from "@tanstack/react-query"
import { productStore } from "../store/product.store"
import { getProductsServiceById } from "../services"
import { useEffect } from "react"



export const useProductsDetailes = ( id: number | null) =>{

    const { setSelectProduct, setModalLoading } = productStore()

    const query = useQuery({
        queryKey: ["product-detailes", id],
        queryFn: ()=> getProductsServiceById(id!),
        enabled: !!id,
    });

    useEffect(()=>{
        setModalLoading(query.isLoading);

        if (query.data) {
            setSelectProduct(query.data);
        }
    }, [query.data, query.isLoading, setSelectProduct, setModalLoading]);
    
    return query;

}
