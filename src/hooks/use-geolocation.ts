import type { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";





interface GeolocationState{
    coordinates: Coordinates | null;
    error: string | null;
    isLoading: boolean;
}


export function useGeolocation(){

    const [locationData,setLocationData]=useState<GeolocationState>({
        coordinates:null,
        error: null,
        isLoading: true,
    });

    const getLocation=()=>{

        setLocationData((prev)=> ({...prev,isLoading: true,error:null}));

        if(!navigator.geolocation){
            setLocationData({
                coordinates: null,
                error: "Geolocation is not supported by your browser",
                isLoading: false,
              });
              return;
        }    
                                                    //navigator are builtin js object for provides information about window or our device,
        navigator.geolocation.getCurrentPosition(   //navigator.geolocation,it Provides access to the user's geographical location from our window or device.
          (position)=> {
             setLocationData({
                coordinates: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude  
                },
                error: null,
                isLoading: false,
             });
          },
          (error)=>{

            let errorMessage: string;
            switch(error.code){

                case error.PERMISSION_DENIED:
                    errorMessage="Location permission denied. Please enable location access."
                    break;

                case error.POSITION_UNAVAILABLE:
                    errorMessage='Location information is unavailable.'
                    break;
                
                case error.TIMEOUT:
                    errorMessage='Location request timed out.'
                    break;
                default :
                errorMessage="An unknown error occurred.";
            };


             setLocationData({
                coordinates:null,
                error: errorMessage,
                isLoading: false
             });

          },
          {
            enableHighAccuracy: true,   // Use GPS or high-precision methods in our device for users location.
            timeout: 5000,              // Give up after 5 seconds if location isn't determined.
            maximumAge:0,                // Do not use cached data; get fresh data only. if set 300000 it caches values as 5 min,so here 0 and no caches ,gets fresh data
          }
          
        );


    };



    useEffect(()=>{
       getLocation();
    },[])


  return {
    ...locationData,
    getLocation
  };

}