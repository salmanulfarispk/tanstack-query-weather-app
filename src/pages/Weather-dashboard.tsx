import { Button } from "@/components/ui/button"
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"
import { useGeolocation } from "@/hooks/use-geolocation"
import { WeatherSkeleton } from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const WeatherDashboard = () => {

   const {coordinates,error:locationerror,isLoading:locationLoading,getLocation}=useGeolocation();

   
   
   const handleRefresh=()=>{
      getLocation();

      if(coordinates){
        //reload weather data
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
  




    
  return (
    <div className="space-y-4">
       {/**Favorite cities */}


        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">My Location</h1>
          <Button variant={'outline'} size={'icon'}
           onClick={handleRefresh}
          //disabled={}
           >
             <RefreshCw className="h-4 w-4"/>
          </Button>
        </div>


        {/**Current and Hourly weather */}       

    </div>
  )
}

export default WeatherDashboard