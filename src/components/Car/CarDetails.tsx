'use client'
import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import Layout from '../Home/Layout'
import { Separator } from '../ui/separator'
import { fetchCarById } from '@/service/CarService'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from '../ui/spinner'
import { useFormik } from 'formik'
import { useBooking } from '@/hooks/BookingHooks'
import { useProfile } from '@/hooks/UserHooks'

const CarDetails = () => {


  const {mutate}=useBooking()
  const router = useRouter()
     const param = useParams();
   const id = param.id;
   const {data:userData}=useProfile()
   const formik=useFormik({
    initialValues:{startTime: "",endTime: ""},
    onSubmit:(value)=>{
     
      const request={
        carId:id,
        customerId:userData.id,
        startTime:value.startTime,
        endTime:value.endTime
      }
       
      mutate(request,{onSuccess:()=>{
        formik.resetForm()
        router.replace("/booking")
        router.refresh()
      }})
      
    }
   })
     const { data, isError, error } = useQuery({
      queryKey: ['salondata', id],
      queryFn: () => fetchCarById(id),
      enabled: !!id,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1

   })

   useEffect(() => { }, [data, error, isError])
   if(isError) return <div><Spinner/></div>
   
  
  return (
     

    <div className="min-h-screen   text-white  mt-24 w-10/12 mx-auto">

      {/* 🔙 BACK BUTTON */}
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 text-gray-300 hover:text-white transition"
      >
        <i className="ri-arrow-left-line text-2xl"></i>
        Back to Cars
      </button>

      {/* MAIN SECTION */}
      <div className="grid md:grid-cols-3 gap-8">

        {/* 🚗 LEFT - IMAGE (1/3) */}
        <div className="md:col-span-2">
          <div className="w-full h-[420px] rounded-2xl overflow-hidden shadow-lg">
            <img
              src={ data?.images[0] ||"/car.jpg"}
              alt="Car"
              className="w-full h-full   object-center"
            />
          </div>
        </div>

        {/* 📋 RIGHT - BOOKING FORM (2/3) */}
        <div className="md:col-span-1 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg space-y-4">

          <div className='flex justify-between items-center'>
            <span className='font-bold text-xl'>${data?.price || "300"}</span>
            <span className=' text-xs'>per day</span>
          </div>
          <Separator/>

          {/* FORM */}
          <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>

            {/* PICKUP DATE */}
            <div>
              <label className="text-sm text-gray-300">
                Pickup Date
              </label>
              <input
                type="datetime-local"
                name='startTime'
                value={formik.values.startTime}
                onChange={formik.handleChange}
                className="w-full mt-2 p-3 rounded-lg   border border-white/20 outline-none"
              />
            </div>

            {/* RETURN DATE */}
            <div>
              <label className="text-sm text-gray-300">
                Return Date
              </label>
              <input
                type="datetime-local"
                 name='endTime'
                value={formik.values.endTime}
                onChange={formik.handleChange}
                className="w-full mt-2 p-3 rounded-lg   border border-white/20 outline-none"
              />
            </div>

            {/* BUTTON */}
            <Button  type='submit' className="mt-4 rounded bg-gradient-to-r from-blue-500 to-purple-500 py-5 hover:scale-105 transition">
              Book Now
            </Button>

            <span className='text-center'>No credit card required to reserve</span>
          </form>

        </div>

      </div>

      <div className='mt-5 space-y-4'>
          <div className='flex flex-col '>
            <span className='text-xl font-bold'>{data?.name ||"BMW X5"}</span>
            <span className='text-xs'>{ data?.model ||"SUV • 2006"}</span>
          </div>
          <Separator/>

          <div className='flex md:gap-8 md:w-8/12 flex-col md:flex-row gap-4 '>
              <div  className=' flex flex-col items-center border border-slate-200 rounded py-4 px-10 bg-gray-500'>
                     <i className="ri-group-line mr-2"></i>
                     {data?.seat} seat
             </div>
              <div  className=' flex flex-col items-center border border-slate-200 rounded py-4 px-10 bg-gray-500'>
                     <i className="ri-gas-station-line mr-2"></i>
                     {data?.drive} 
             </div>
              <div  className=' flex flex-col items-center border border-slate-200 rounded py-4 px-10 bg-gray-500'>
                    <i className="ri-settings-5-line mr-2"></i>
                     {data?.type} 
             </div>
              <div  className=' flex flex-col items-center border border-slate-200 rounded py-4 px-10 bg-gray-500'>
                    <i className="ri-map-pin-line mr-2"></i>
                     {data?.location} 
             </div>
          </div>
      </div>
    </div>
      
  )
}

export default CarDetails