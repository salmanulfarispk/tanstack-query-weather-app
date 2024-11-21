import { Skeleton } from "./ui/skeleton"


export const WeatherSkeleton = () => {
  return (
    <div>
        <div className="grid gap-6">
           <Skeleton className="h-[300px] w-full rounded-lg"/>
           <Skeleton className="h-[300px] w-full rounded-lg"/>
           <div className="grid gap-6 md:grid-cols-2">
           <Skeleton className="h-[300px] w-full rounded-lg"/>
           <Skeleton className="h-[300px] w-full rounded-lg"/>
           </div>
        </div>
    </div>
  )
}
