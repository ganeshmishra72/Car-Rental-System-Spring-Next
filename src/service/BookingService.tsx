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
 
