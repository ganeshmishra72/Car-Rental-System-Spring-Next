 
import { createBooking, updateBookingStatus } from "@/service/BookingService"
import { useMutation, useQueryClient } from "@tanstack/react-query"
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


type BookingStatus = "CONFIRMED" | "PENDING" | "CANCELLED";
export const useStatusChange = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ bookingId, status }: { bookingId: any; status: BookingStatus }) =>
      updateBookingStatus(bookingId, status),

    onSuccess: () => {
      toast.success("Status Updated ✅")

      queryClient.invalidateQueries({ queryKey: ['bookings'] })
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