'use client'
import React, { useEffect, useRef, useState } from 'react'
 
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchProfile } from '@/service/UserServices'
import { Spinner } from '../ui/spinner'
import { useFormik } from 'formik'
import AuthStore from '@/store/AuthStore'
import toast from 'react-hot-toast'
import { delteUserData, updateuserData, uplaodUserimg } from '@/hooks/UserHooks'
import { useLogout } from '@/hooks/AuthHooks'
import { Button } from '../ui/button'


const Profile = () => {

  const { mutate: deleteUser, isPending: deleteUserPending } = delteUserData()
  const { mutate: updateUser, isPending: updatePending } = updateuserData();
  const { mutate: uplaodImage } = uplaodUserimg();
  const { mutate } = useLogout()

  const token: any = AuthStore(sta => sta.refreshToken)

  const queryClinet = useQueryClient()
  const [image, setImage] = useState<any>(null)
  const fileRef = useRef<any>(null)
  const handelImageClick = () => {
    fileRef.current.click();
  }

  const formik = useFormik({
    initialValues: { image: null, id: "", username: "", email: "", name: "", phone: "", createAt: "", updateAt: "", role: "", address: "", city: "", provider: "", enable: null },
    onSubmit: () => {
     
      handelUpdate();
    }
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setImage(URL.createObjectURL(file));
      formik.setFieldValue("image", file);
      uplaodImage({ userId: data?.id, file: file }, {
        onSuccess: (value) => {
          
          formik.setFieldValue("image", value.image)
          setImage(value.image)
          toast.success("Success Image Updaet!")
        }
      })

    } catch (error) {
      console.log(error);
      toast.error("image uplaod failed")

    }
  }
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 1,
    select: (data) => ({
      id: data.id,
      username: data.username,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      createAt: data.createAt,
      updateAt: data.updateAt,
      image: data.image,
      address: data.address,
      city: data.city,
      provider: data.provider,
      enable: data.enable
    })
  })

  useEffect(() => {
    formik.setValues({
      image: data?.image || null,
      id: data?.id || "",
      username: data?.username || "",
      name: data?.name || "",
      phone: data?.phone || "",
      role: data?.role || "",
      createAt: data?.createAt || "",
      updateAt: data?.updateAt || "",
      email: data?.email || "",
      address: data?.address || "",
      city: data?.city || "",
      provider: data?.provider || "",
      enable: data?.enable || false

    })
    if (isError) {
      toast.error(" Failed To Fetch or Backend Server Down")
    }

  }, [error, isError, data])


  const handelUpdate = () => {

    if (!data?.id) {
      toast.error("User ID not found");
      return;
    }
    console.log(data?.id);

    const payload = {
      email: formik.values.email,
      username: formik.values.username,
      name: formik.values.name,
      phone: formik.values.phone,
      role: formik.values.role,
      address:formik.values.address,
      city:formik.values.city,
      provider:formik.values.provider,
      image:formik.values.image

    }
    updateUser({ userId: data.id, data: payload },
      {
        onSuccess: () => {
          toast.success("Update SuccessFully ")
          queryClinet.setQueryData(["profile"], (old: any) => ({ ...old, ...payload }))
        },
        onError: () => { toast.error("Updaet Failed") }
      }
    )
  }


  const handelDelete = () => {
    deleteUser(data?.id, {
      onSuccess: () => {
        toast.success("Deleted Successfully")
        queryClinet.removeQueries({ queryKey: ["profile"] })
        mutate(token)
      },
      onError: () => toast.error("Deleted Failed")
    })
  }
  if (isLoading) return (


    <div className='flex items-center justify-center  mt-20'>
      <Spinner />

    </div>

  )
  if (isError) {
    return (

      <div className="text-center mt-20 text-red-500">
        Failed to load bookings
      </div>

    );
  }

  // console.log(data);

  return (

    <div className="min-h-screen text-white w-10/12 mx-auto mt-24">

      {/* 🔹 PROFILE HEADER */}
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">

        {/* IMAGE */}
        <div className='flex items-center justify-center' onClick={handelImageClick}>
          {
            data ?
              <img src={data?.image} alt="rdmishra" loading='eager' className='size-40 rounded-full object-cover' /> :
              <i className="ri-account-circle-line text-9xl rounded-full object-cover  border-2"></i>
          }
          <input
            type="file"
            ref={fileRef}
            className='hidden'
            accept="image/*"
            onChange={handleImageChange}
            id='image'
            name='image'
          />
        </div>

        {/* BASIC INFO */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold">{formik.values.name}</h1>
          <p className="text-gray-400">{formik.values.username.split("@")[0]}</p>

          <div className="mt-2 flex gap-3 justify-center md:justify-start">
            <span className="px-3 py-1 text-xs bg-blue-500/20 rounded-full">
              {formik.values.role}
            </span>
            <span className="px-3 py-1 text-xs bg-green-500/20 rounded-full">
              {formik.values.enable ? 'Active' : 'Disabled'}
            </span>
          </div>
        </div>

      </div>

      {/* 🔹 DETAILS SECTION */}
      <form onSubmit={formik.handleSubmit} className="mt-8 grid md:grid-cols-2 gap-6">

        {/* LEFT COLUMN */}
        <div  className="bg-white/10 border border-white/20 rounded-2xl p-6 space-y-4">

          <h2 className="text-xl font-semibold mb-4">Personal Info</h2>

          <div>
            <p className="text-gray-400 text-sm">Full Name</p>
            <input name="name" value={formik.values.name} onChange={formik.handleChange}
              className="w-full p-2 rounded bg-white/20 outline-none" />
          </div>

          <div>
            <p className="text-gray-400 text-sm">Username</p>
            <input name="username" value={formik.values.username} onChange={formik.handleChange}
              className="w-full p-2 rounded bg-white/20 outline-none" />
          </div>

          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <input name="email" value={formik.values.email} onChange={formik.handleChange} readOnly
              className="w-full p-2 rounded bg-white/20 outline-none" />
          </div>

          <div>
            <p className="text-gray-400 text-sm">Phone</p>
            <input name="phone" value={formik.values.phone} onChange={formik.handleChange}
              className="w-full p-2 rounded bg-white/20 outline-none" />
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 space-y-4">

            <h2 className="text-xl font-semibold mb-4">
              Address & System Info
            </h2>

            <div>
              <p className="text-gray-400 text-sm">Address</p>
              <input name="address" value={formik.values.address} onChange={formik.handleChange}
                className="w-full p-2 rounded bg-white/20 outline-none" />
            </div>

            <div>
              <p className="text-gray-400 text-sm">City</p>
              <input name="city" value={formik.values.city} onChange={formik.handleChange}
                className="w-full p-2 rounded bg-white/20 outline-none" />
            </div>
            

            <div>
              <p className="text-gray-400 text-sm">Provider</p>
            <input name="provider" value={formik.values.provider} onChange={formik.handleChange} readOnly
                className="w-full p-2 rounded bg-white/20 outline-none" />
            </div>

            <div>
              <p className="text-gray-400 text-sm">Created At</p>
              <input name="createAt" value={formik.values.createAt}  
                className="w-full p-2 rounded bg-white/20 outline-none " readOnly />
             </div>
            <div>
              <p className="text-gray-400 text-sm">Updated At</p>
              <input name="updateAt" value={formik.values.updateAt} readOnly
                className="w-full p-2 rounded bg-white/20 outline-none" />
            </div>

        </div>

            <div className='flex md:flex-row flex-col w-full mt-8 gap-5'>
              <Button  onClick={()=>handelUpdate} className='w-full py-5 rounded  cursor-pointer'>Update</Button>
              <Button onClick={()=>handelDelete} className='w-full py-5 rounded bg-red-500 cursor-pointer'>Delete</Button>
            </div>
      </form>  

    </div>

  )
}

export default Profile