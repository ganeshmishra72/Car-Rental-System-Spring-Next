'use client'
import { login, logout, signup } from "@/service/AuthService"
import AuthStore from "@/store/AuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import { useRouter } from "next/navigation";
 
 
import toast from "react-hot-toast";

export const useLogin = () => {
    const loginStore = AuthStore((state) => state.login);
    
   
    return useMutation({
        mutationFn: login,
        onSuccess: (value) => {
            console.log(value);
            
                loginStore({
                accessToken: value.accessToken,
                username: value.user.username,
                email: value.user.email,
                fullName: value.user.name,
                refreshToken:value.refreshToken,
                role:value.user.role,
                user:value.user
            })
           toast.success("SuccessFully Login");
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Login  Failed Or Network Down";
                    toast.error(message)
            }
            

        }
    })
}

export const useLogout = () => {

      const queryClient=useQueryClient()
    const clearAuth = AuthStore(state => state.logout);
    const router = useRouter();
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
           clearAuth();  // clear Zustand store
            queryClient.clear()
            toast.success('Successfully Logout')
            router.push("/")

        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Signup   Failed Or Network Down";
                    console.log(message);
            }
            

        }
    })
}


export const useRegister = () => {

    return useMutation({
        mutationFn: signup,
        onSuccess: (value) => {
            console.log(value);

        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Signup   Failed Or Network Down";
                    console.log(message);
            }
            

        }
    })
}

