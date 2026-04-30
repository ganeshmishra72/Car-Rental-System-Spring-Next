 
import { createBooking } from "@/service/BookingService"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"

export const useBooking=()=>{
    return useMutation({
        mutationFn:createBooking,
        onSuccess:(value)=>{
            toast.success("Booking Succesfully ")
            console.log(value);
            
        },
       onError:(error)=>{
            if(axios.isAxiosError(error)){
              const message=  error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Booking  Failed Or Network Down";
            toast.error(message)
            }
        }
    })
}