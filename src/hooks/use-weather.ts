import type { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";




export const  WEATHER_KEYS={
    weather: (coords:Coordinates) => ['weather',coords] as const,
    forecast: (coords: Coordinates)=> ['forecast',coords] as const,
    location: (coords: Coordinates) => ['location',coords] as const,
    search: (query : string) => ['location-search',query] as const
} as const ;



export function useWeatherQuery(coordinates: Coordinates | null){

   return useQuery({
       queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),  //If coordinates is null or undefined, use the default value { lat: 0, lon: 0 }.
       queryFn: () =>(
         coordinates ? weatherAPI.getCurrentWeather(coordinates) : null 
       ),

       enabled: !!coordinates   //// coordinates are available, so the query runs,if its null or undefined this doesnt works
   });

};



export function useForecastQuery(coordinates: Coordinates | null){
    return useQuery({
        queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: ()=> (
              coordinates ? weatherAPI.getForecast(coordinates) : null 
        ),
        enabled: !!coordinates
    })
};



export function useReverseGeoQuery(coordinates: Coordinates | null){
    return useQuery({
        queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: ()=> (
              coordinates ? weatherAPI.reverseGeocode(coordinates) : null 
        ),
        enabled: !!coordinates
    })
};



export function useLocationSearch(query: string) {
    return useQuery({
      queryKey: WEATHER_KEYS.search(query),
      queryFn: () => weatherAPI.searchLocations(query),
      enabled: query.length >= 3, //// Only run the query if the query length is 3 or more
    });
  }