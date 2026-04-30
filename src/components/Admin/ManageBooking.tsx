'use client'
import React from 'react'
import Layout from './Layout'
import { fetchBooking } from '@/service/BookingService'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'



   
const ManageBookings = () => {
  const {data}=useQuery({
    queryKey:['bookings'],
    queryFn:fetchBooking,
    staleTime:1000*60*5,
    refetchOnWindowFocus:false,
    retry:1
  })
   
  
  
  return (
    <Layout>

  
    <div className="text-white">

      {/* 🔥 HEADING */}
      <h1 className="text-3xl font-bold  ">
        Manage Bookings
      </h1>
    <p className='mb-8'>Track All customer booking, approve or cancle requests, and manage status</p>
      {/* 📋 TABLE */}
      <div className="bg-white/10 border border-white/20 rounded-2xl overflow-x-auto">

        <table className="w-full">

          {/* HEAD */}
          <thead className="bg-white/5 text-left">
            <tr>
              <th className="p-4">Car</th>
              <th className="p-4">Date</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Total</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {data?.map((item:any) => (
              <tr
                key={item.id}
                className="border-t border-white/10 hover:bg-white/5 transition  space-x-16 md:space-x-0"
              >

                {/* 🚗 CAR */}
                <td className="p-4 flex items-center gap-4">
                  <img
                    src={item.car.images?.[0] || "/car.jpg"}
                    alt={item.car.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <span>{item.car.name}</span>
                </td>

                {/* DATE */}
                <td className="p-4">{item.startTime.split("T")[0]}</td>

                {/* ⭐ RATING */}
                <td className="p-4">
                  ⭐ {item.car.rating ||4}
                </td>

                {/* 💰 TOTAL */}
                <td className="p-4">
                  ${item.price}
                </td>

                {/* 💳 PAYMENT */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      // item.payment === 'Paid'
                      true
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {/* {b.payment} */}
                    paid
                  </span>
                </td>

                {/* 🔘 STATUS */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      item.status === 'Confirmed'
                        ? 'bg-green-500/20 text-green-400'
                        : item.status === 'Pending'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* 👁️ ACTION */}
                <td className="p-4 text-center">
                  <button onClick={()=>toast.success("Some Operation is going")} className="text-blue-400 text-xl hover:scale-110 transition">
                    <i className="ri-eye-line"></i>
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
      </Layout>
  )
}

export default ManageBookings