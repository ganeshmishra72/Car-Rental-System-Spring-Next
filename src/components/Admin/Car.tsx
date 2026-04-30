'use client'
import React, { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import Layout from './Layout'
import { useFormik } from 'formik'
import { useCarService } from '@/hooks/CarHooks'
import { useProfile } from '@/hooks/UserHooks'
import toast from 'react-hot-toast'

type CarForm = {
  image: File | null
  name: string
  model: string
  year: string
  price: string
  category: string
  drive: string
  type: string
  seats: string
  location: string
  description: string
}
const Car = () => {
 const [image, setImage] = useState<any>(null)
   const fileRef = useRef<any>(null)
   const {mutate}=useCarService()
   const handelImageClick = () => {
     fileRef.current.click();
   }
  const {data}=useProfile()
  const formik = useFormik<CarForm>({
    initialValues: {
      image: null,
      name: '',
      model: '',
      year: '',
      price: '',
      category: 'Luxury',
      drive: 'Automatic',
      type: 'Petrol',
      seats: '',
      location: '',
      description: ''
    },

    onSubmit: (values) => {
      const request={
          name:values.name,
          type:values.type,
          location:values.location,
          drive:values.drive,
          seat:values.seats,
          price:values.price,
          model:values.model,
          customerId:data.id

        }
          if (!values.image) {
                toast.error("Please select an image");
                return;
            }

              mutate({request,image:values.image},{
          onSuccess:()=>{
            formik.resetForm()
            setImage(null)
          }
        })

      
    }
  })

   const handleImageChange = (e: any) => {
    const file = e.target.files[0]
    if (file) {

      setImage(URL.createObjectURL(file))
      formik.setFieldValue("image", file)
    }
  }

  return (
    <Layout>
      <div className="text-white">

        <h1 className="text-3xl font-bold ">
          Add New Car
        </h1>
        <p className='mb-8'>
          Fill the details to list new car for booking
        </p>

        {/* ✅ FORM START */}
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white/10 border border-white/20 rounded-2xl p-6 space-y-6"
        >

          {/* IMAGE */}
            <div onClick={handelImageClick}
            className='w-32 h-32 border  border-slate-600 rounded flex items-center justify-center cursor-pointer hover:bg-slate-100'
          >
            {
              image ? <img
                src={image}
                alt="preview"
                loading='lazy'
                className='w-full h-full object-cover rounded-lg'
              /> : (
                <i className='ri-file-3-fill'></i>
              )

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

          {/* BRAND + MODEL */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300">Brand</label>
              <Input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="BMW"
                className="mt-2 bg-black/40 border border-white/20"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Model</label>
              <Input
                name="model"
                value={formik.values.model}
                onChange={formik.handleChange}
                placeholder="M4"
                className="mt-2 bg-black/40 border border-white/20"
              />
            </div>
          </div>

          {/* YEAR PRICE CATEGORY */}
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              name="year"
              type="number"
              value={formik.values.year}
              onChange={formik.handleChange}
              placeholder="Year"
            />

            <Input
              name="price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              placeholder="Price"
            />

            <select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              className="p-3 rounded-lg bg-black/40 border border-white/20"
            >
              <option>Luxury</option>
              <option>SUV</option>
              <option>Sedan</option>
              <option>Sports</option>
            </select>
          </div>

          {/* TRANSMISSION FUEL SEATS */}
          <div className="grid md:grid-cols-3 gap-4">
            <select
              name="drive"
              value={formik.values.drive}
              onChange={formik.handleChange}
              className="p-3 rounded-lg bg-black/40 border border-white/20"
            >
              <option>Automatic</option>
              <option>Manual</option>
            </select>

            <select
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              className="p-3 rounded-lg bg-black/40 border border-white/20"
            >
              <option>Petrol</option>
              <option>Diesel</option>
              <option>Electric</option>
            </select>

            <Input
              name="seats"
              type="number"
              value={formik.values.seats}
              onChange={formik.handleChange}
              placeholder="Seats"
            />
          </div>

          {/* LOCATION */}
          <Input
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            placeholder="Location"
          />

          {/* DESCRIPTION */}
          <Textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder="Write car details..."
          />

          {/* SUBMIT */}
          <Button
            type="submit"
            className="w-full py-6 text-lg bg-gradient-to-r from-blue-500 to-purple-500"
          >
            Add Car
          </Button>

        </form>
      </div>
    </Layout>
  )
}

export default Car