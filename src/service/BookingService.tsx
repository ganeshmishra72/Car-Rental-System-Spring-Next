import apiclient from "@/config/ApiClient"

export const createBooking=async(request:any)=>{
  const response=await apiclient.post('/bookings',request);
  return response.data;
}

export const fetchBookingByUser=async(userId:any)=>{

    const response=await apiclient.get(`/bookings/user/${userId}`)
    return response.data
}

export const fetchBooking=async()=>{
    const response=await apiclient.get('/bookings/getAll')
    return response.data;
}
type BookingStatus = "CONFIRMED" | "PENDING" | "CANCELLED";

export const updateBookingStatus=async(bookingId:any,status:BookingStatus)=>{
    const response=await apiclient.put(`/bookings/${bookingId}/status`,status)
    return response.data
}
 
