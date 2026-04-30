import { deleteuser, fetchProfile, updateuser, uplaodImage } from "@/service/UserServices";
import AuthStore from "@/store/AuthStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function delteUserData(){
    return useMutation({
        mutationFn:deleteuser,
        onError:(error)=>{
            if(axios.isAxiosError(error)){
              const message=  error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Delted  Failed Or Network Down";
            toast.error(message)
            }
        }
    })
}

export function updateuserData(){
    return useMutation({
        mutationFn:updateuser,
        onSuccess:(value)=>{
            console.log(value);
        }
        ,
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

export function uplaodUserimg(){

    return useMutation({
        mutationFn:({ userId, file }: { userId: string; file: File }) => uplaodImage(userId, file),
        onSuccess:(value)=>{
            console.log(value);
            
            
        },
        onError:(error)=>{
            if(axios.isAxiosError(error)){
                const message=  error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Update  Failed Or Network Down";
            console.log(message);
            
            toast.error(message)
            }
        }
    })

}

export function useProfile(){
      const token: any = AuthStore(sta => sta.accessToken)

     const { data ,isError,error,isLoading } = useQuery({
          queryKey: ["profile"],
          queryFn: fetchProfile,
          enabled: !!token,
          staleTime: 1000 * 60 * 5,
          refetchOnWindowFocus: false,
          refetchOnMount: true,
          retry: 1,
       })

 return{
    isError,
    data,isLoading,error
 
      
}}