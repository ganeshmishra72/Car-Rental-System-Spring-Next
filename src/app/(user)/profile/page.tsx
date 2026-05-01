'use client'
import Profile from '@/components/Profile/profile'
import { Spinner } from '@/components/ui/spinner'
import AuthStore from '@/store/AuthStore'
 
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
   const router = useRouter()
     const token = AuthStore(state => state.accessToken)

  useEffect(() => {
    if (!token) {
      router.push("/")
    }
  }, [token])
  return (
    <Profile/>
  )
}

export default page
