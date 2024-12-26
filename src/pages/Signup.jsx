import React, { useState } from 'react'
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import "../Styles/component.css"
import { NavLink } from 'react-router';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form"
import { axiosInstance } from '../lib/axiosInstance';
import { useSelector, useDispatch } from 'react-redux'
import { checkauth } from '../Redux/auth/authSlice';

const Signup = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();
  const [showpass, setshowpass] = useState(false)

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, d * 1000);
    })
  }

  const signingup = async (data) => {
    try {
      const Response = await axiosInstance.post("api/auth/signup", data);
      toast.success("Account Created Successfully", { position: "top-center" })
      dispatch(checkauth());
    } catch (error) {
      console.log(error.response.data)
    }
  };

  return (
    <>
      <div className='border-2 border-black rounded-[10px] m-[10px] py-[10px] h-[94vh] mx-auto flex flex-col justify-center bg-[beige] sm:w-[90%] lg:w-[40%] md:w-[60%]'>
        
        <div className='text-center text-3xl font-bold'>Create Account</div>

        <form onSubmit={handleSubmit(signingup)}>
        
          <div className='flex justify-around mt-[5px]'>
            <input
              className="myinputbox"
              type="text"
              {...register("username", { required: { value: true, message: "This field is required" }, minLength: { value: 3, message: "Min length is 3" }, maxLength: { value: 8, message: "Max length is 8" } })}
              placeholder="Username" />
          </div>
            {errors.username && <p className='text-red-500 text-center'>{errors.username.message}</p>}

          <div className='flex justify-around mt-[5px]'>
            <input
              type="text"
              className='myinputbox'
              placeholder="email@example.com"
              {...register("email", { required: { value: true, message: "This field is required" }, pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email" } })}
            />
          </div>
            {errors.email && <p className='text-red-500 text-center'>{errors.email.message}</p>}

          <div className='flex justify-around mt-[5px] relative '>
            <input
              type={showpass ? "text" : "password"}
              className='myinputbox'
              placeholder="password"
              onKeyDown={(e) => { 
                if (e.key === "Enter") {
                  handleSubmit(signingup)();
                }
              }}
              {...register("password", { required: { value: true, message: "This field is required" }, minLength: { value: 6, message: "Min length is 6" }, maxLength: { value: 20, message: "Max length is 20" } })}
            />
            <button type='button' className='absolute right-[16%] py-[12.5px]' onClick={() => { setshowpass(!showpass) }}>
              {showpass ? <FaLockOpen /> : <FaLock />}
            </button>
          </div>
            {errors.password && <p className='text-red-500 text-center text-sm p-0 m-0'>{errors.password.message}</p>}
          
          <div className='flex justify-around my-[5px]'>
            <button type='submit' disabled={isSubmitting} className={isSubmitting?"bg-gray-500 myinputbox w-[50%]":"bg-[#1adaad] myinputbox w-[50%]"} >{isSubmitting ? "Loading..." : "Create Account"}</button>
          </div>
        
        </form>

        <div className='text-center'>
          already have an account <NavLink to='/login' className='text-blue-500'>Login</NavLink>
        </div>

      </div>
    </>
  )
}

export default Signup