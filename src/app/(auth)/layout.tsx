  
import { Spinner } from '@/components/ui/spinner'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
 
 
const layout = async ({children}:{children:React.ReactNode}) => {
   const  cookiestore= await cookies()
     const token =cookiestore.get("accessToken")?.value
    
    if(token){
       <div className='w-full flex items-center justify-center'>
        <Spinner/>
       </div>
      return redirect("/")
    }
  return (

    <main>{children}</main>
  )
}

export default layout
