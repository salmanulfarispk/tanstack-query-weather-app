import { Button } from "@/components/ui/button"
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"
import { useGeolocation } from "@/hooks/use-geolocation"
import { WeatherSkeleton } from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForecastQuery, useReverseGeoQuery, useWeatherQuery } from "@/hooks/use-weather";
import { CurrentWeather } from "@/components/Current-weather";
import { HourlyTemperature } from "@/components/hourly-temp";
import { WeatherDetails } from "@/components/weather-details";
import { WeatherForecast } from "@/components/weather-forcast";
import { FavoriteCities } from "@/components/FavoriteCities";

const WeatherDashboard = () => {

   const { coordinates, error:locationerror, isLoading:locationLoading, getLocation }=useGeolocation();


   const weatherQuery= useWeatherQuery(coordinates)
   const forecastQuery= useForecastQuery(coordinates)
   const locationQuery = useReverseGeoQuery(coordinates)

   
   const handleRefresh=()=>{
      getLocation();

      if(coordinates){
         weatherQuery.refetch();
         forecastQuery.refetch();
         locationQuery.refetch();
      }
   };

      

      if(locationLoading){
         return <WeatherSkeleton />
      };

      if(locationerror){
        return (
        <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
           <p>{locationerror}</p>
           <Button variant='outline' onClick={getLocation} className="w-fit">
             <MapPin className="mr-2 h-4 w-4" />
             Enable Location
           </Button>
        </AlertDescription>
      </Alert>
        )
      };

      if (!coordinates) {
        return (
          <Alert>
            <MapPin className="h-4 w-4" />
            <AlertTitle>Location Required</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
              <p>Please enable location access to see your local weather.</p>
              <Button variant="outline" onClick={getLocation} className="w-fit">
                <MapPin className="mr-2 h-4 w-4" />
                Enable Location
              </Button>
            </AlertDescription>
          </Alert>
        );
      }
  


    if (weatherQuery.error || forecastQuery.error) {
      return (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex flex-col gap-4">
            <p>Failed to fetch weather data. Please try again.</p>
            <Button variant="outline" onClick={handleRefresh} className="w-fit">
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      );
    };

    if(!weatherQuery.data || !forecastQuery.data){
      return <WeatherSkeleton />
    }


    const locationName = locationQuery.data?.[0];


    
  return (
    <div className="space-y-4">
       {/**Favorite cities */}
       <FavoriteCities />

        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">My Location</h1>
          <Button variant={'outline'} size={'icon'}
           onClick={handleRefresh}
           disabled={weatherQuery.isFetching || forecastQuery.isFetching}
           >
             <RefreshCw className={`h-4 w-4 ${ weatherQuery.isFetching ? "animate-spin" : "" }`}/>
          </Button>
        </div>


        {/**Current and Hourly weather */} 

        <div className="grid gap-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <CurrentWeather data={weatherQuery.data}  locationData={locationName}/>
             <HourlyTemperature data={forecastQuery.data} /> 
             </div>  
          
          
             <div className="grid gap-6 md:grid-cols-2 items-start">
              <WeatherDetails data={weatherQuery.data}/>
              <WeatherForecast data={forecastQuery.data} />
             </div>
        </div>      

    </div>
  )
}

export default WeatherDashboard