import Profile from '@/components/Profile/profile'
import { Spinner } from '@/components/ui/spinner'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {
   const  cookiestore= await cookies()
     const token =cookiestore.get("accessToken")?.value
    
    if(!token){
       <div className='w-full flex items-center justify-center'>
        <Spinner/>
       </div>
      return redirect("/")
    }
  return (
    <Profile/>
  )
}

export default page
