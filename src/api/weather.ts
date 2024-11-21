import { API_CONFIG } from "./config";
import { Coordinates, ForecastData, WeatherData } from "./types";



class WeatherAPI {

    private createUrl(endpoint: string, params: Record<string, string | number >){ // here params as object ,objects keys as string and values as string or number
        const searchParams = new URLSearchParams({
            appid: API_CONFIG.API_KEY,
            ...params,  
        });

        return `${endpoint}?${searchParams.toString()}`;

    }

    private async fetchData<T>(url:string):Promise<T>{
      const response=await fetch(url)
      if(!response.ok){
        throw new Error(`Weather API error : ${response.statusText}`);
      }

      return response.json();
    }


    async getCurrentWeather({ lat,lon }: Coordinates):Promise<WeatherData>{
       const url= this.createUrl(`${API_CONFIG.BASE_URL}/weather`,{
         lat:lat.toString(),
         lon:lon.toString(),
         units:'metric',
       });
       return this.fetchData<WeatherData>(url)
    }


    async getForecast({ lat,lon}: Coordinates): Promise<ForecastData>{
        const url= this.createUrl(`${API_CONFIG.BASE_URL}/forecast`,{
            lat:lat.toString(),
            lon:lon.toString(),
            units:'metric',
          });

          return this.fetchData<ForecastData>(url)
    }

    async reverseGeocode(){

    }


}