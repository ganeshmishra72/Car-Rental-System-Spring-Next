'use client'
import React from 'react'
import Layout from './Layout'
import { Button } from '../ui/button'
 
import Link from 'next/link'
import { useCars } from '@/hooks/CarHooks'
import dummyData from '@/model/CarsData'


const Home = () => {
 
   const {data,isError}=useCars()
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
    <Layout>
      {/* Banner */}
      <section className="relative min-h-screen w-full flex items-center justify-center ">

        {/* BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 bg-cover md:bg-center bg-no-repeat brightness-125 contrast-125"
          style={{
            backgroundImage: "url('/car.jpg')" // put your image in public folder
          }}
        />

        {/* DARK OVERLAY (for readability) */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

        {/* CONTENT */}
        <div className="relative z-10 text-center px-4">

          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Drive Your Dream Car
          </h1>

          <p className="mt-4 text-gray-300 max-w-xl mx-auto">
            Rent premium cars at the best price. Fast, easy and reliable booking experience.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <Button className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 hover:scale-105 transition">
              Explore Cars
            </Button>

            <Button 
              variant="outline"
              className="rounded-full border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 transition px-6 py-2"
            >
              Book Now
            </Button>
          </div>

        </div>
      </section>

      {/* Card */}
       <section className="w-10/12 mx-auto py-16 cursor-pointer">
  <h2 className="text-3xl font-bold text-center mb-10 text-white">
    Explore Cars
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    
    {(data?.length ? data : dummyData).map((item: any) => (
      
      <Link
        href={ data? `/cardetails/${item.id }`:'/login'}
        key={item.id}
        className="flex flex-col relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition"
      >
        {/* IMAGE */}
        <div className="w-full md:h-56 relative">
          <img
            src={item.images?.[0] }
            alt={item.name}
            className="w-full h-full object-cover"
          />

          <div
            className={`text-xs py-1 px-2 text-white absolute top-4 left-4 rounded-full ${
              item.available ? "bg-blue-500" : "bg-red-500"
            }`}
          >
            {item.available ? "Available Now" : "Not Available"}
          </div>

          <div className="bg-black/75 p-2 text-white absolute bottom-4 right-4 rounded">
            ${item.price}/day
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 text-white">
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p className="text-sm text-gray-300">{item.model}</p>

          {/* FEATURES WITH ICONS */}
          <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
            
            <div className="flex items-center gap-2">
              <i className="ri-sofa-line"></i>
              <span>{item.seat} Seat</span>
            </div>

            <div className="flex items-center gap-2">
              <i className="ri-tools-line"></i>
              <span>{item.drive}</span>
            </div>

            <div className="flex items-center gap-2">
              <i className="ri-settings-5-line"></i>
              <span>{item.type}</span>
            </div>

            <div className="flex items-center gap-2">
              <i className="ri-map-pin-2-line"></i>
              <span>{item.location}</span>
            </div>

          </div>
        </div>
      </Link>

    ))}

  </div>
</section>
    </Layout>
  )
}

export default Home