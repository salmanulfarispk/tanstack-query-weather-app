import { WeatherData } from "@/api/types"
import { useFavourites } from "@/hooks/use-favourite";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Star } from "lucide-react";




interface FavoriteBurronProps{
   data: WeatherData
}

export const FavoriteButton = ({ data }:FavoriteBurronProps) => {

    const { addFavorite, removeFavorite, isFavorite } = useFavourites();

    const isCurrentlyfavorite=isFavorite(data.coord.lat, data.coord.lon)

    const handleToggleFavorite =()=> {
        if(isCurrentlyfavorite) {
           removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
           toast.error(`Removed ${data.name} from Favorites`)
        }else{
            addFavorite.mutate({
                name:data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country,
            });
            toast.success(`Added ${data.name} to Favorites`,{
                style: {
                    backgroundColor: "#222831", 
                    color: "white",            
                  },
            })
        }

    };





  return (
    <Button
    variant={isCurrentlyfavorite ? "default" : "outline"}
    size="icon"
    onClick={handleToggleFavorite}
    className={isCurrentlyfavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
  >
    <Star
      className={`h-4 w-4 ${isCurrentlyfavorite ? "fill-current" : ""}`} 
    />
  </Button>
  )
}
