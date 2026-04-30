'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useFormik } from 'formik'
import { useLogin } from '@/hooks/AuthHooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const {mutate}=useLogin()
  const router=useRouter()
  const formik=useFormik({
    initialValues:{email:"",password:""},
    onSubmit:(value)=>(
          mutate(value,
            {onSuccess:()=>{
                router.replace("/");
                router.refresh();
          }})
    )
  })


  return (
    <div className="min-h-screen grid md:grid-cols-2">
 
      <div className="hidden md:block relative">
        <Image
          src="/car2.jpg"  
          alt="car"
          fill
           loading='eager'
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-end p-10">
          <h1 className="text-white text-4xl font-bold">
            Drive Your Dream Car 🚗
          </h1>
        </div>
      </div>

     
      <div className="flex items-center justify-center bg-black text-white p-6">

        <form className="w-full max-w-md space-y-6" onSubmit={formik.handleSubmit}>

       
          <div>
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-gray-400 text-sm">
              Login to continue booking your favorite cars
            </p>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <Input
              type="email"
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
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
                placeholder="Enter your password"
                name='password'
                onChange={formik.handleChange}
                value={formik.values.password}
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

           
          <Button type='submit'  className="w-full py-6 text-lg rounded-lg bg-linear-to-r from-blue-500 to-purple-500 hover:scale-105 transition">
            Login
          </Button>

         
          <p className="text-sm text-gray-400 text-center">
            Don’t have an account?{' '}
            <Link href='/signup'className="text-blue-400 cursor-pointer hover:underline">
              Signup
            </Link>
          </p>

        </form>

      </div>

    </div>
  )
}

export default Login