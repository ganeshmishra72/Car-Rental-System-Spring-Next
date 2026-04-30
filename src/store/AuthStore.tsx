import LoginResponseData from "@/model/LoginResponseData"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type AuthService={
     accessToken: string | null,
  username: string | null,
    user:any |null
  email: string | null,
  fullName: string | null,
  refreshToken:string |null,
  role:string| null,
  login: (logindata: LoginResponseData) => void,
  logout:(slient?:boolean)=>void

  changeLocalLogin:(accessToken:string,user:any,authStatus:boolean,authLoading:boolean)=>void
}

const AuthStore = create<AuthService>()(persist((set) => ({
  accessToken: null,
  username: null,
  email: null,
  fullName: null,
  refreshToken:null,
  user:null,
  role:null,
  login: (logindata) => {
    set({
      accessToken: logindata.accessToken,
      username: logindata.username,
      email: logindata.email,
      fullName: logindata.fullName,
      refreshToken:logindata.refreshToken,
      role:logindata.role,
       user: logindata.user   
    })
  },
  logout:(slient=false)=>{
    set({accessToken:null,username:null,email:null,fullName:null,refreshToken:null,role:null, user:null })
    
  },
  changeLocalLogin(accessToken, user, authStatus, authLoading) {
        set({
          accessToken,
          user
        });
      },
  
}), { name: "auth-storage" }))

export default AuthStore;
