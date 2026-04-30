import { refresh } from "@/service/AuthService";
import AuthStore from "@/store/AuthStore";
import axios from "axios"

const apiclient=axios.create({
    baseURL:`https://backend-crs.onrender.com/api/v1`,
    headers:{
        'Content-Type':"application/json"
    },
    withCredentials:true,
    timeout:10000
})

export default apiclient;


// interceptors
apiclient.interceptors.request.use(config=>{

  const access=AuthStore.getState().accessToken
    if(access){
      config.headers.Authorization=`Bearer ${access}`;
    }
  return config;
})


let isRefresh=false
let pending : any[]=[];
// response interceptors


function queueRequest(cd:any){
  pending.push(cd);
}

function resolveQueue(newToken:string | null){
  pending.forEach((cb)=>cb(newToken));
  pending=[];
}

apiclient.interceptors.response.use(
  // success
  (response)=>response,
  // error 
  async(error)=>{
   
    
const is401 = error?.response?.status === 401;
 const original=error.config
      
//  if (original.url?.includes("/refresh")) {
//   return Promise.reject(error);
// }
 if(!is401  || original._retry){
  // message
  return Promise.reject(error)
 }

//   we will try to refresh token
original._retry = true;
  if(isRefresh){
     return new Promise((resolve, reject) => {
        queueRequest((newToken: string) => {
          if (!newToken) return reject();
          original.headers = original.headers || {};
          original.headers.Authorization = `Bearer ${newToken}`;
          resolve(apiclient(original));
        });
      });
  }

  isRefresh=true
  try {
      console.log("start refreshing...");
    const response =await refresh()
    const newToken=response .accessToken
    if(!newToken){
      throw new Error("no access token recived!!")
    }
    AuthStore.getState().changeLocalLogin(response .accessToken,response .user,true,false);

    resolveQueue(newToken)
     original.headers = original.headers || {};
    original.headers.Authorization=`Bearer ${newToken}`;
    return apiclient(original);
  } catch (error) {
     resolveQueue(null);
     AuthStore.getState().logout();
     return Promise.reject(error)
  }
  finally{
    isRefresh=false
  }
 
})
 