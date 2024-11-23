import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";





interface SearchHistoryItem {
    id: string;
    query: string;
    lat: number;
    lon: number;
    name: string;
    country: string;
    state?: string;
    searchedAt: number;
  }
  


export function useSearchHistory(){

   const [history,setHistory]=useLocalStorage<SearchHistoryItem[]>('search-history', []);

   const queryclient=useQueryClient()
 

     const historyQuery = useQuery({
        queryKey:['search-history'],
        queryFn: ()=> history,
        initialData: history,
      });


      const addToHistory =useMutation({

        mutationFn: async( search: Omit<SearchHistoryItem, "id" | "searchedAt">)=>{   //here in SearchHistoryItem's id and searchAt removes and creates new SearchHistoryItem
         
            const newSearch: SearchHistoryItem ={
                ...search,
                id: `${search.lat}-${search.lon}-${Date.now()}`,
                searchedAt: Date.now()
            };
           
           // Remove duplicates and keep only last 10 searches
            const filteredHistory= history.filter((item)=> (
                !(item.lat === search.lat && item.lon === search.lon)
            ));

            const newHistory= [newSearch, ...filteredHistory].slice(0, 10);

            setHistory(newHistory)
        },
        onSuccess: (newHistory)=>{
             queryclient.setQueryData(['search-history'], newHistory)  //updates the cached data directly for a query key.
        }

      });




      
     const clearHistory = useMutation({
    mutationFn: async () => {
      setHistory([]);
      return [];
     },
    onSuccess: () => {
        queryclient.setQueryData(["search-history"], []);
    },
    });



  return {
    history: historyQuery.data ?? [] ,
    addToHistory,
    clearHistory
  };


}