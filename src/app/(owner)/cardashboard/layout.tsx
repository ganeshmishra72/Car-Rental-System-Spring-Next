import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

const layout = async({children}:{children:React.ReactNode}) => {
  
    const  cookiestore= await cookies()
       const token:any =cookiestore.get("accessToken")?.value

         if (!token) {
    redirect("/login")
  }
       const decoded:any=jwtDecode(token)

       const roles=decoded.roles
       
       if(!roles || !roles.includes("CAR_OWNER")){
redirect("/")
       }
  return (
    
    <main>{children}</main>
  )
}

export default layout
