import apiclient from "@/config/ApiClient"

export const fetchProfile=async()=>{
    const response=await apiclient.get("/users/profile")
    return response.data;
}

export const updateuser=async({userId,data}:any)=>{
    const response=await apiclient.put(`/users/update/${userId}`,data);
    return response.data;

}

export const uplaodImage=async(userId:any,file:File)=>{
    const formData = new FormData();
  formData.append("file", file); // must match @RequestParam("file")
  
  const response = await apiclient.post(`/users/uplaodimage/${userId}`, formData,{
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data;
}

export const deleteuser=async(userId:any)=>{
    const response= await apiclient.delete(`/users/delete/${userId}`)
    return response.data;
}