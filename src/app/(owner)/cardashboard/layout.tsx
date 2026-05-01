'use client'

import AuthStore from '@/store/AuthStore'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const token = AuthStore(state => state.accessToken)

  const [allowed, setAllowed] = useState<boolean | null>(null)

  useEffect(() => {
    if (!token) {
      router.replace("/login")
      return
    }

    try {
      const decoded: any = jwtDecode(token)
      const roles = decoded.roles

      if (!roles || !roles.includes("CAR_OWNER")) {
        router.replace("/")
      } else {
        setAllowed(true)
      }
    } catch (err) {
      router.replace("/login")
    }
  }, [token, router])

  // ⛔ prevent UI flicker
  if (allowed === null) return null

  return <main>{children}</main>
}

export default Layout