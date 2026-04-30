'use client'
import React from 'react'
import Layout from './Layout'
import { useAvailableChange, useCarDelete, useCars } from '@/hooks/CarHooks'


 
const ManageCar = () => {
  const {data,isError}=useCars()

  const {mutate}=useCarDelete()
  const { mutate: toggleAvailable } = useAvailableChange()
   const handelDelete=(carId:any)=>{
   
    
          mutate({carId})
   }
  if (!data) return <div className="text-white mt-10">Loading...</div>
   if (isError) {
    return (

      <div className="text-center mt-20 text-red-500">
        Failed to load Car
      </div>

    );
  }
  return (
    <Layout>

    <div className="text-white">

      {/* 🔥 HEADING */}
      <h1 className="text-3xl font-bold">
        Manage Cars
      </h1>
      <p className='mb-8'>view all listed cars, update thier details, or remove them from booking platfrom</p>

      {/* 📋 TABLE */}
      <div className="bg-white/10 border border-white/20 rounded-2xl overflow-x-auto">

        <table className="w-full">

          {/* TABLE HEAD */}
          <thead className="bg-white/5 text-left">
            <tr>
              <th className="p-4">Car</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {data?.map((item:any) => (
              <tr
                key={item.id}
                className="border-t border-white/10 hover:bg-white/5 transition space-x-16 md:space-x-0"
              >

                {/* 🚗 CAR (IMAGE + NAME) */}
                <td className="p-4 flex items-center gap-4">
                  <img
                    src={ item.images?.[0] || "/car.jpg"}
                    alt={"fs"}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <span className="font-medium">{ item.name|| "demo car"}</span>
                </td>

                {/* CATEGORY */}
                <td className="p-4">{ item.type ||"CNG"}</td>

                {/* PRICE */}
                <td className="p-4">${ item.price|| 300}/day</td>

                {/* STATUS */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      item.available 
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {item.available ? "available":"not available"}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-4">
                  <div className="flex justify-center gap-4 text-xl">

                    {/* 👁️ VIEW */}
                    <button onClick={() =>
    toggleAvailable({
      carId: item.id,
      available: !item.available // 🔥 toggle value
    })
  } className="text-blue-400 hover:scale-110 transition">
                     <i className={item.available ? "ri-eye-line" : "ri-eye-off-line"}></i>
                    </button>

                    {/* 🗑️ DELETE */}
                    <button onClick={()=>handelDelete(item.id)} className="text-red-400 hover:scale-110 transition">
                      <i className="ri-delete-bin-line"></i>
                    </button>

                  </div>
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

export default ManageCar