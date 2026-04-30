'use client'

import { fetchBookingByUser } from '@/service/BookingService'
import { fetchCarById } from '@/service/CarService'
import { fetchProfile } from '@/service/UserServices'
import AuthStore from '@/store/AuthStore'
import { useQuery, useQueries } from '@tanstack/react-query'
import Link from 'next/link'

const Booking = () => {

  const token: any = AuthStore(sta => sta.refreshToken)

  // 🔹 Fetch logged-in user
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    enabled:!!token
  });

  // 🔹 Fetch bookings
  const {
    data: bookings,
    error,
    isLoading: bookingLoading
  } = useQuery({
    queryKey: ['booking', userData?.id],
    queryFn: () => fetchBookingByUser(userData.id),
    enabled: !!userData?.id,
  });

  

   

  
  if (!token) return( <div className='flex justify-center items-center flex-col mt-8 gap-4'>
    <p className="text-white text-center mt-20">Please Login To See Real Things and access all </p>
     <Link   href={"/login"} className=" py-4 px-8 text-white text-lg rounded-lg bg-linear-to-r from-blue-500 to-purple-500 hover:scale-105 transition">
            Login
          </Link>
    </div> );
  if (userLoading) return <p className="text-white text-center mt-20">Loading user...</p>;
  if (bookingLoading) return <p className="text-white text-center mt-20">Loading bookings...</p>;
  if (error) return <p className="text-red-500 text-center mt-20">Error loading bookings</p>;

  return (
    <div className="min-h-screen text-white mt-24 w-11/12 md:w-10/12 mx-auto">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-8">
        My Bookings
      </h1>

      {/* BOOKINGS LIST */}
      <div className="flex flex-col gap-6">

        {bookings?.map((item: any ) => {

          

          return (
            <div
              key={item.id}
              className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-6"
            >

              {/* LEFT SECTION */}
              <div className="flex flex-col md:flex-row gap-4 flex-1">

                {/* IMAGE */}
                <div className="w-full md:w-[280px] h-[180px] overflow-hidden rounded-xl">
                  <img
                    src={item.car.images?.[0] || "/car3.jpg"}
                    alt={item.car.name || "Car"}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex flex-col justify-between gap-4">

                  {/* TOP */}
                  <div>
                    <h2 className="text-xl font-semibold">
                      {item.car.name || "Car Name"}
                    </h2>
                    <p className="text-xs text-gray-300">
                      {item.car.model || "SUV • Premium Car"}
                    </p>
                  </div>

                  {/* BADGES */}
                  <div className="flex gap-3 items-center">
                    <div className="border rounded bg-gray-700 px-3 py-1 text-sm">
                      Booking #{item.id}
                    </div>

                    <div
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.status === 'PENDING'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {item.status}
                    </div>
                  </div>

                  {/* RENTAL */}
                  <div className="flex gap-3">
                    <i className="ri-calendar-line"></i>
                    <div>
                      <p className="text-xs text-gray-300">Rental Period</p>
                      <p className="font-semibold">
                        {item.startTime.split("T")[0]} → {item.endTime.split("T")[0]}
                      </p>
                    </div>
                  </div>

                  {/* LOCATION */}
                  <div className="flex gap-3">
                    <i className="ri-map-pin-line"></i>
                    <div>
                      <p className="text-xs text-gray-300">Pickup Location</p>
                      <p className="font-semibold">
                        {item.car.location || "India"}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* RIGHT SECTION */}
              <div className="flex md:flex-col justify-between md:items-end items-center border-t md:border-t-0 md:border-l border-white/20 pt-4 md:pt-0 md:pl-6">

                <div className="text-left md:text-right">
                  <p className="text-xs text-gray-300">Total Price</p>
                  <p className="text-2xl font-bold text-blue-500">
                    ${item.price}
                  </p>
                </div>

                <p className="text-xs text-gray-400">
                  Booked on {item.startTime.split("T")[0]}
                </p>

              </div>

            </div>
          )
        })}

        {/* No Bookings */}
        {bookings?.length === 0 && (
          <p className="text-center text-gray-400">
            No bookings found
          </p>
        )}

      </div>
    </div>
  )
}

export default Booking