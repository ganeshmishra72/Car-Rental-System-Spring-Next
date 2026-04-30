'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchProfile } from '@/service/UserServices'
import { useProfile } from '@/hooks/UserHooks'
import { useLogout } from '@/hooks/AuthHooks'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
   const [slide,setSlide]=useState(false);
     const { mutate } = useLogout();
      const handelLogout = () => {
       mutate()
       // alert()
     }
  const menu = [
    {
      name: 'Dashboard',
      icon: 'ri-dashboard-line',
      path: '/cardashboard',
    },
    {
      name: 'Add Car',
      icon: 'ri-add-circle-line',
      path: '/cardashboard/addcar',
    },
    {
      name: 'Manage Cars',
      icon: 'ri-car-line',
      path: '/cardashboard/managecar',
    },
    {
      name: 'Manage Bookings',
      icon: 'ri-calendar-check-line',
      path: '/cardashboard/managebooking',
    },
  ]

  const {data}=useProfile()
  // console.log(data);
  
    
  return (
   <>
    <div className="hidden md:flex">

      {/* 🔵 SIDEBAR */}
      <div className="fixed top-0 left-0 h-screen w-[250px] bg-blue-950 border-r border-white/10 flex flex-col items-center py-6 z-50">

        {/* PROFILE */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <img
              src={data? data.image :"/car.jpg"}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
          />
          <h2 className="text-white font-semibold">{data? data.username : "Demo"}</h2>
        </div>

        {/* MENU */}
        <div className="flex flex-col w-full px-4 gap-2">

          {menu.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="flex items-center gap-3 text-gray-300 px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition"
            >
              <i className={`${item.icon} text-lg`}></i>
              {item.name}
            </Link>
          ))}

        </div>

        {/* LOGOUT BUTTON */}
        <div className="mt-auto w-full px-4">
          <button
            onClick={() => {
              // TODO: logout logic
              handelLogout()

              router.push('/login')
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
          >
            <i className="ri-logout-box-line text-lg"></i>
            Logout
          </button>
        </div>

      </div>

      {/* 🟣 MAIN CONTENT */}
      <div className="ml-[250px] w-full min-h-screen bg-blue-950">

        {/* TOP NAV */}
        <nav className="flex justify-between items-center px-8 py-4 sticky top-0 z-40 bg-blue-950 border-b border-white/10">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            RDCAR ADMIN
          </div>
          <p className="text-white">Welcome, {data? data.username : "Admin"}</p>
        </nav>

        {/* PAGE CONTENT */}
        <div className="p-8">
          {children}
        </div>

      </div>

    </div>
         
         {/* mobile */}

    <div className="flex md:hidden">

      {/* 🟣 MAIN CONTENT */}
      <div className="  w-full min-h-screen bg-blue-950">

        {/* TOP NAV */}
        <nav className="flex justify-between items-center px-8 py-4 sticky top-0 z-40 bg-blue-950 border-b border-white/10">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            RDCAR ADMIN
          </div>
          <button onClick={()=>setSlide(!slide)}>
          { slide? <i className='ri-close-line text-2xl'></i> : <i className='ri-menu-line text-2xl'></i> }
          </button>
        </nav>


        {/* PAGE CONTENT */}
        <div className="p-8">
          {children}
        </div>

      </div>
      {
        slide &&
        <div className="fixed top-0 left-0 h-screen w-[250px] bg-blue-950 border-r border-white/10 flex flex-col items-center py-6 z-50">

        {/* PROFILE */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <img
            src={data? data.image :"/car.jpg"}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
          />
          <h2 className="text-white font-semibold">Ganesh</h2>
        </div>

        {/* MENU */}
        <div className="flex flex-col w-full px-4 gap-2">

          {menu.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              onClick={()=>setSlide(false)}
              className="flex items-center gap-3 text-gray-300 px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition"
            >
              <i className={`${item.icon} text-lg`}></i>
              {item.name}
            </Link>
          ))}

        </div>

        {/* LOGOUT BUTTON */}
        <div className="mt-auto w-full px-4">
          <button
            onClick={() => {
              // TODO: logout logic
              handelLogout()
              router.push('/login')
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
          >
            <i className="ri-logout-box-line text-lg"></i>
            Logout
          </button>
        </div>

      </div>
      }

    </div>
    
   </>
  )
}

export default Layout