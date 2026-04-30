'use client'
import React, { useState } from 'react'
import Layout from '@/components/Home/Layout'
import { Input } from '@/components/ui/input'
import { useCars } from '@/hooks/CarHooks'
import Link from 'next/link'
import AuthStore from '@/store/AuthStore'

const Car = () => {
  const token=AuthStore(state=>state.refreshToken)
  const [search, setSearch] = useState("");
    const {data,isError}=useCars();

          
    if (!token) return( <div className='flex justify-center items-center flex-col mt-8 gap-4'>
    <p className="text-white text-center mt-20">Please Login To See Real Things and access all </p>
     <Link   href={"/login"} className=" py-4 px-8 text-white text-lg rounded-lg bg-linear-to-r from-blue-500 to-purple-500 hover:scale-105 transition">
            Login
          </Link>
    </div> );

    const filteredCars = data?.filter((item: any) => {
  const keyword = search.toLowerCase();

  return (
    item.name?.toLowerCase().includes(keyword) ||
    item.model?.toLowerCase().includes(keyword) ||
    item.type?.toLowerCase().includes(keyword) ||
    item.location?.toLowerCase().includes(keyword) ||
    item.drive?.toLowerCase().includes(keyword)
  );
});
  if (isError) {
    return (
        <Layout>
            <div className="text-center mt-20 text-red-500">
                Failed to load Cars
            </div>
        </Layout>
    );
}
  

  return (
   
      <div className="min-h-screen text-white  w-10/12 mx-auto mt-24">

        {/* 🏷️ HEADING */}
        <h1 className="text-4xl font-bold text-center my-10">
          Available Cars
        </h1>

        {/* 🔍 SEARCH BAR */}
        <div className="flex justify-center mb-10">
          <div className="w-full max-w-2xl relative">

            <Input
  type="text"
  placeholder="Search cars like BMW, Audi..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="pl-12 py-6 text-lg rounded-full bg-white/10 border border-white/20 backdrop-blur-lg"
/>

            {/* ICON */}
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
              🔍
            </span>

          </div>
        </div>

       
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
     
    {filteredCars?.map((item:any) => (
      <Link href={ data && item.available ?`/cardetails/${item.id }`:'/login'}
        key={item.id}
        className="flex flex-col relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition"
      >
        {/* LEFT IMAGE */}
        <div className="w-full md:h-56  relative">
          <img 
            src={item.images?.[0] ||"/car2.jpg"} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
          {
             item?.available ?
          <div className='bg-blue-500 text-xs p-1 text-white absolute top-4 left-4 rounded-full'>
          Available Now
        </div>:
          <div className='bg-red-500 text-xs p-1 text-white absolute top-4 left-4 rounded-full'>
          Not Available
        </div>
          }
        <div className='bg-black/75 p-2 text-white absolute bottom-4 right-4 rounded'>
          ${item.price}/day
        </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className=" p-4 flex flex-col justify-between text-white">

          <div>
            <h3 className="text-lg font-bold">
              {item.name}
            </h3>

            <p className="text-sm text-gray-300">
              {item.model}
            </p>
          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-2 gap-2 mt-3">
              <span className="text-xs px-2 py-1"> 
                <i className="ri-sofa-line mr-2"></i>{item.seat} seat
              </span>
              <span className="text-xs px-2 py-1"> 
                <i className="ri-tools-line mr-2"></i>{item.drive} 
              </span>
              <span className="text-xs px-2 py-1"> 
                <i className="ri-settings-5-line mr-2"></i>{item.type} 
              </span>
              <span className="text-xs px-2 py-1"> 
               <i className="ri-map-pin-2-line mr-2"></i> {item.location} 
              </span>
          </div>

         
        </div>

      </Link>
    ))}

  </div>

      </div>
     
  )
}

export default Car