import { createCar, deleteCar, fetchAllCars, updateAvailable } from "@/service/CarService"
import AuthStore from "@/store/AuthStore"
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export const useCars=()=>{
     const token: any = AuthStore(sta => sta.refreshToken)
 const {data,isError,error}=useQuery({
  queryKey:['cars'],
  queryFn:fetchAllCars,
   enabled: !!token,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 1,
 })
      return{
        data,
        isError,
        error
      }
}


export const useCarService=()=>{
    const router=useRouter()
    return useMutation({
        mutationFn:({request,image}:{request:any,image:File})=>createCar(request,image),
        onSuccess:(value)=>{
            toast.success("Successfully Create")
            console.log(value);
            router.refresh()
        },
        onError:(error)=>{
            if(axios.isAxiosError(error)){
              const message=  error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Update  Failed Or Network Down";
            toast.error(message)
            }
        }
    })
}

export const useCarDelete=()=>{
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:({carId}:{carId:any})=>deleteCar(carId),
         onSuccess:()=>{
            toast.success("Successfully Deleted Car")
            
            queryClient.invalidateQueries({ queryKey: ['cars'] })
        },
        onError:(error)=>{
            if(axios.isAxiosError(error)){
              const message=  error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Delete  Failed Or Network Down";
            toast.error(message)
            }
        }
    })
}

export const useAvailableChange = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ carId, available }: { carId: any; available: boolean }) =>
      updateAvailable(carId, available),

    onSuccess: () => {
      toast.success("Availability Updated ✅")

      queryClient.invalidateQueries({ queryKey: ['cars'] })
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Update Failed";

        toast.error(message)
      }
    }
  })
}