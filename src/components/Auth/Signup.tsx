'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useFormik } from 'formik'
import { useRegister } from '@/hooks/AuthHooks'
import Link from 'next/link'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const {mutate}=useRegister()
  const formik=useFormik({
    initialValues:{name:"",username:"",email:"",password:""},
    onSubmit:(value)=>{
      mutate(value)
      
       
    }
  })

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* 🚗 LEFT SIDE IMAGE */}
      <div className="hidden md:block relative">
        <Image
          src="/car2.jpg" // put inside /public
          alt="car"
          fill
          loading='eager'
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-end p-10">
          <h1 className="text-white text-4xl font-bold">
            Start Your Journey 🚀
          </h1>
        </div>
      </div>

      {/* 📝 RIGHT SIDE SIGNUP FORM */}
      <div className="flex items-center justify-center bg-black text-white p-6">

        <form className="w-full max-w-md space-y-6" onSubmit={formik.handleSubmit}>

          {/* HEADING */}
          <div>
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="text-gray-400 text-sm">
              Signup to book your favorite cars
            </p>
          </div>

          {/* NAME */}
          <div>
            <label className="text-sm text-gray-300">Full Name</label>
            <Input
              type="text"
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder="Enter your name"
              className="mt-2 bg-white/10 border border-white/20"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">User Name</label>
            <Input
              type="text"
              name='username'
              value={formik.values.username}
              onChange={formik.handleChange}
              placeholder="Enter your Username"
              className="mt-2 bg-white/10 border border-white/20"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <Input
              type="email"
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Enter your email"
              className="mt-2 bg-white/10 border border-white/20"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <div className="relative mt-2">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
                className="bg-white/10 border border-white/20 pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-300"
              >
                {showPassword ? (
                  <i className="ri-eye-off-line"></i>
                ) : (
                  <i className="ri-eye-line"></i>
                )}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
         

          {/* SIGNUP BUTTON */}
          <Button type='submit' className="w-full py-6 text-lg rounded-lg bg-linear-to-r from-blue-500 to-purple-500 hover:scale-105 transition">
            Sign Up
          </Button>

          {/* FOOTER */}
          <p className="text-sm text-gray-400 text-center">
            Already have an account?{' '}
            <Link href={"/login"}  className="text-blue-400 cursor-pointer hover:underline">
              Login
            </Link >
          </p>

        </form>

      </div>

    </div>
  )
}

export default Signup