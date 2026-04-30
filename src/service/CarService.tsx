import apiclient from "@/config/ApiClient"

export const fetchAllCars=async()=>{
  const response=await apiclient.get("/cars/getAll")
  return response.data
}

export const fetchCarById=async(carId:any)=>{
  const response=await apiclient.get(`/cars/id/${carId}`)
  return response.data
}

export const createCar=async(request:any,image:File)=>{
     const fromdata=new FormData()
     fromdata.append("request",JSON.stringify(request))
     fromdata.append("image",image)
    const response=await apiclient.post("/cars",fromdata,{headers:{
        "Content-Type":"multipart/form-data"
    }})
    return response.data
  }


export const deleteCar=async(carId:any)=>{
  const response=await apiclient.delete(`/cars/delete/${carId}`)
  return response.data
}

export const updateAvailable=async(carId:any,available:Boolean)=>{
  const response =await apiclient.put(`/cars/available/${carId}`,available);
  return response.data
}