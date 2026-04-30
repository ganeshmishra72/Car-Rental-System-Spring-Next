'use client'
import React from 'react'
import Layout from './Layout'
import { useDashboard } from '@/hooks/DashboardHooks'

const Dashboard = () => {

  

 
  const { data, isLoading } = useDashboard()

if (isLoading) return <div className="text-white">Loading...</div>
const stats = [
  { title: 'Total Cars', value: data.totalCars, icon: 'ri-car-line' },
  { title: 'Total Bookings', value: data.totalBookings, icon: 'ri-calendar-line' },
  { title: 'Pending', value: data.pending, icon: 'ri-time-line' },
  { title: 'Confirmed', value: data.confirmed, icon: 'ri-checkbox-circle-line' },
  { title: 'Cancelled', value: data.cancelled, icon: 'ri-close-circle-line' },
]
  return (
    <Layout>
   
    <div className="text-white">

      {/* 🔥 HEADING */}
      <h1 className="text-3xl font-bold ">
        Admin Dashboard
      </h1>
      <p className='mb-8 text-gray-200 '>Monitor overall platfrom performance including total car,booking,revenue and recent activites</p>

      {/* 📊 STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">

        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white/10 border border-white/20 rounded-2xl p-5 flex flex-col gap-3 hover:scale-105 transition"
          >
            <i className={`${item.icon} text-2xl text-blue-400`}></i>
            <h2 className="text-sm text-gray-300">{item.title}</h2>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}

      </div>

      {/* 📦 BOTTOM SECTION */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* 📋 RECENT BOOKINGS */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-4">
            Recent Bookings
          </h2>

          {data.recentBookings.map((b: any) => (
  <div key={b.id} className="flex justify-between items-center bg-white/5 p-3 rounded-lg">

    <div>
      <p className="font-medium">{b.car.name}</p>
      <p className="text-sm text-gray-400">
        {b.customer.name} • {new Date(b.startTime).toLocaleDateString()}
      </p>
    </div>

    <span className={`text-xs px-3 py-1 rounded-full ${
      b.status === 'CONFIRMED'
        ? 'bg-green-500/20 text-green-400'
        : b.status === 'PENDING'
        ? 'bg-yellow-500/20 text-yellow-400'
        : 'bg-red-500/20 text-red-400'
    }`}>
      {b.status}
    </span>

  </div>
))}

        </div>

        {/* 📊 MONTHLY REVENUE */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col justify-center items-center">

          <h2 className="text-xl font-semibold mb-4">
            Monthly Revenue
          </h2>

          {/* Placeholder for chart */}
          <div className="w-full h-[200px] flex items-center justify-center text-gray-400 border border-dashed border-white/20 rounded-xl">
            Chart Coming Soon 📈
          </div>

         <p className="mt-4 text-lg font-bold text-green-400">
  ₹{data.totalRevenue}
</p>
        </div>

      </div>

    </div>
     </Layout>
  )
}

export default Dashboard