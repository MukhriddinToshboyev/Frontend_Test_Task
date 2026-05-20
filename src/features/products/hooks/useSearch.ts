import { useQuery } from "@tanstack/react-query"
import { getSearchService } from "../services"


    export const useSearchProducts = (searchTerm: string)=>{
        return useQuery({
            queryKey: ["Search_product", searchTerm],
            queryFn: ()=> getSearchService(searchTerm),
            enabled: !!searchTerm,
        })
    }
