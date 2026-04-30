import apiclient from "@/config/ApiClient"

export const login=async(loginData:any)=>{
    const response=await apiclient.post('/auth/login',loginData);
    return response.data;
}

export const signup=async(SignupData:any)=>{
  const response=await apiclient.post('/auth/register',SignupData);
  return response.data;
}

export const refresh=async()=>{
   const response=await apiclient.post('/auth/refresh');
   return response.data
}

export const logout=async()=>{
  const response=await apiclient.post("/auth/logout");
  return response.data;
}