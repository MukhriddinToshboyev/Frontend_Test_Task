import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { productStore } from "../store/product.store"
import { getSearchService } from "../services/getSearch.service"


    export const useSearchProducts = (searchTerm: string)=>{
        
        const {setTotal, setProducts, setIsloading} = productStore()


        const query =  useQuery({
            queryKey: ["Search_product", searchTerm],
            queryFn: ()=> getSearchService(searchTerm),
            enabled: !!searchTerm,
        })

        useEffect(()=>{
            if(query.data){
                setProducts(query.data.products || [])
                setTotal(query.data.total || 0)
            }
            setIsloading(query.isLoading)
        }, [query.data, query.isLoading, setProducts, setTotal, setIsloading]
    )
    }