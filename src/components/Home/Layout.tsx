'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import AuthStore from '@/store/AuthStore'
import { useLogout } from '@/hooks/AuthHooks'
 
import { useProfile } from '@/hooks/UserHooks'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [slider,setSlider]=useState<boolean>(false);
    // change dynamically later
  const token=AuthStore(state=>state.accessToken)
  const role=AuthStore(state=>state.role)
  const { mutate } = useLogout();
   const handelLogout = () => {
    mutate()
    // alert()
  }
  const menu=[
    {
      id:1,
      name:"Home",
      path:"/",
      icon: <i className='ri-home-line mr-2'></i>
    },
    {
      id:2,
      name:"My Bookings",
      path:"/booking",
      icon: <i className="ri-shopping-basket-line mr-2"></i>
    },
    {
      id:3,
      name:"Cars",
      path:"/car",
      icon:<i className="ri-roadster-line mr-2"></i>
    },
    {
      id:4,
      name:"Login",
      path:"/login",
      icon:<i className="ri-login-circle-line mr-2"></i>
    },
    {
      id:5,
      name:"Signup",
      path:"/signup",
      icon:<i className="ri-user-add-line mr-2"></i>
    },
  ]
   
 
  
  const {data}=useProfile()
  return (
    <>
     <div className='hidden md:block'>
          {/* NAVBAR */}
          <div className="  fixed top-0 left-0 w-full z-50 md:flex justify-center pt-5">
            <nav className="w-10/12 mx-auto  h-16 flex items-center justify-between px-6 
          rounded-full 
          backdrop-blur-lg bg-white/15
          border  border-white/20 
          shadow-lg ">

              {/* LOGO */}
              <div className="text-2xl font-bold bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                RDCAR
              </div>

              {/* RIGHT SIDE */}
              <div className="flex items-center gap-6 text-white">

                {/* NAV LINKS */}
                <Link href="/" className="text-sm font-medium hover:text-blue-400 transition">
                  Home
                </Link>

                <Link href="/booking" className="text-sm font-medium hover:text-blue-400 transition">
                  MyBooking
                </Link>

                <Link href="/car" className="text-sm font-medium hover:text-blue-400 transition">
                  Cars
                </Link>

                {/* AUTH */}
                {!token ? (
                  <div className="flex gap-3">

                    {/* LOGIN BUTTON */}
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="rounded-full border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 transition"
                      >
                        Login
                      </Button>
                    </Link>

                    {/* SIGNUP BUTTON */}
                    <Link href="/signup">
                      <Button
                        className="rounded-full bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-md hover:scale-105 transition"
                      >
                        Signup
                      </Button>
                    </Link>

                  </div>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="cursor-pointer ring-2 ring-white/30">
                        <AvatarImage src={data? data.image : '/car5.png'} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="bg-white/10 backdrop-blur-lg border border-white/20 text-white p-2"
                    >
                      <DropdownMenuItem asChild>
                        <Link href="/profile"><i className="ri-profile-line"></i>My Profile</Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href="/booking"><i className="ri-shopping-bag-4-line"></i>My Booking</Link>
                      </DropdownMenuItem>
                      {
                        role=="CAR_OWNER" &&
                        <DropdownMenuItem asChild>
                        <Link href="/cardashboard"><i className="ri-admin-fill"></i>Dashboard</Link>
                      </DropdownMenuItem>
                      }
                      <DropdownMenuItem
                        onClick={() =>handelLogout()}
                        className="text-red-600"
                      >
                        <i className="ri-logout-box-r-line"></i>Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

              </div>
            </nav>
          </div>
          {/* CONTENT */}
          <section>{children}</section>
          {/* footer */}
          <footer className="w-full bg-blue-950 text-white px-6 py-10 mt-10 border-t border-white/10">

  <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">

    {/* 🔵 BRAND */}
    <div>
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        RDCAR
      </h2>
      <p className="text-gray-400 mt-2 text-sm">
        Rent your dream car with ease and comfort 🚗
      </p>
    </div>

    {/* 🔗 QUICK LINKS */}
    <div>
      <h3 className="font-semibold mb-3">Quick Links</h3>
      <ul className="space-y-2 text-gray-300 text-sm">
       <li><a href="/car" className="hover:text-white">Cars</a></li>
        <li><a href="/booking" className="hover:text-white">My Bookings</a></li>
        <li><a href="/profile" className="hover:text-white">Profile</a></li>
      </ul>
    </div>

    {/* 🌐 SOCIAL MEDIA */}
    <div>
      <h3 className="font-semibold mb-3">Follow Us</h3>

      <div className="flex justify-center md:justify-start gap-4 text-2xl">

        <a href="#" className="hover:text-blue-400 transition">
          <i className="ri-facebook-circle-line"></i>
        </a>

        <a href="#" className="hover:text-pink-400 transition">
          <i className="ri-instagram-line"></i>
        </a>

        <a href="#" className="hover:text-blue-300 transition">
          <i className="ri-twitter-x-line"></i>
        </a>

        <a href="#" className="hover:text-blue-500 transition">
          <i className="ri-linkedin-box-line"></i>
        </a>

      </div>
    </div>

  </div>

  {/* 🔻 BOTTOM */}
  <div className="text-center text-gray-400 text-sm mt-8 border-t border-white/10 pt-4">
    © 2026 By Raghvendra Mishra. All rights reserved.
  </div>

</footer>
      </div>

      <div className='md:hidden '>
      {/* Mobile */}
      <div className=" fixed top-0 left-0 w-full z-50 flex justify-center pt-5 ">
        <nav className="w-10/12 mx-auto  h-16 flex items-center justify-between px-6 
      rounded-full 
      backdrop-blur-lg bg-white/15
      border  border-white/20 
      shadow-lg ">

          {/* LOGO */}
          <div className="text-2xl font-bold bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            RDCAR
          </div>
          <button onClick={()=>setSlider(!slider)}>
             {
               slider ?
               <i className='ri-close-line text-3xl'></i>:
               <i className='ri-menu-fill text-2xl'></i>
             }
          </button>
        </nav>
      </div>
      {
        slider&&
        <div className='fixed top-0 left-0 w-64 h-screen bg-black/90 backdrop-blur-lg z-50 p-6 transition-all duration-300 rounded-r'>
             <div className="mt-10 flex flex-col gap-6 text-white text-xl">

  <Link href="#">
    <i className='ri-home-line mr-2'></i> Home
  </Link>

 

  <Link href="/car">
    <i className="ri-roadster-line mr-2"></i> Cars
  </Link>

      <Link href="/my-booking">
        <i className="ri-shopping-bag-4-line mr-2"></i> My Booking
      </Link>
  {/* AUTH SECTION */}
  {!token ? (
    <>
      <Link href="/login">
        <i className="ri-login-circle-line mr-2"></i> Login
      </Link>

      <Link href="/signup">
        <i className="ri-user-add-line mr-2"></i> Signup
      </Link>
    </>
  ) : (
    <>
      <Link href="/profile">
        <i className="ri-profile-line mr-2"></i> My Profile
      </Link>


      {/* ADMIN */}
      { role=="CAR_OWNER" && (
        <Link href="/cardashboard">
          <i className="ri-admin-fill mr-2"></i> Dashboard
        </Link>
      )}

      <button
        onClick={() => 
          handelLogout()
        }
        className="text-red-500 text-left"
      >
        <i className="ri-logout-box-r-line mr-2"></i> Logout
      </button>
    </>
  )}
</div>
        </div>
      }
      {/* CONTENT */}
      <section>{children}</section>
      {/* footer */}
   <footer className="w-full bg-blue-950 text-white px-6 py-10 mt-10 border-t border-white/10">

  <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">

    {/* 🔵 BRAND */}
    <div>
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        RDCAR
      </h2>
      <p className="text-gray-400 mt-2 text-sm">
        Rent your dream car with ease and comfort 🚗
      </p>
    </div>

    {/* 🔗 QUICK LINKS */}
    <div>
      <h3 className="font-semibold mb-3">Quick Links</h3>
      <ul className="space-y-2 text-gray-300 text-sm">
        <li><a href="/car" className="hover:text-white">Cars</a></li>
        <li><a href="/booking" className="hover:text-white">My Bookings</a></li>
        <li><a href="/profile" className="hover:text-white">Profile</a></li>
        {/* <li><a href="/contact" className="hover:text-white">Contact</a></li> */}
      </ul>
    </div>

    {/* 🌐 SOCIAL MEDIA */}
    <div>
      <h3 className="font-semibold mb-3">Follow Us</h3>

      <div className="flex justify-center md:justify-start gap-4 text-2xl">

        <a href="#" className="hover:text-blue-400 transition">
          <i className="ri-facebook-circle-line"></i>
        </a>

        <a href="#" className="hover:text-pink-400 transition">
          <i className="ri-instagram-line"></i>
        </a>

        <a href="#" className="hover:text-blue-300 transition">
          <i className="ri-twitter-x-line"></i>
        </a>

        <a href="#" className="hover:text-blue-500 transition">
          <i className="ri-linkedin-box-line"></i>
        </a>

      </div>
    </div>

  </div>

  {/* 🔻 BOTTOM */}
  <div className="text-center text-gray-400 text-sm mt-8 border-t border-white/10 pt-4">
    © 2026 By Raghvendra Mishra. All rights reserved.
  </div>

</footer>
      </div>
    </>
  )
}

export default Layout