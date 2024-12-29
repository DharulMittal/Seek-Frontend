import React, { useState } from 'react'
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import "../Styles/component.css"
import { NavLink } from 'react-router';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form"
import { axiosInstance } from '../lib/axiosInstance';
import { useDispatch } from 'react-redux'
import { checkauth, connectSocket } from '../Redux/auth/authSlice';

const Loginpage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();
  const [showpass, setshowpass] = useState(false)

  const logingin = async (data) => {
    try {
      const response = await axiosInstance.post("api/auth/login", data);
      toast.success("Loged in Successfully", { position: "top-center" })
      await dispatch(checkauth()).unwrap();
      await dispatch(connectSocket()).unwrap();
    } catch (error) {
      toast.error("Incorrect Credentials")
    }
  };

  return (
    <>
      <div className='border-[1px] shadow-sm border-base-300 rounded-[10px] m-[0px] py-[10px] h-[94vh] mx-auto flex flex-col justify-center bg-base-200 sm:w-[90%] lg:w-[40%] md:w-[60%] text-base-content'>

        <div className='text-center text-3xl font-bold'>Login</div>

        <form onSubmit={handleSubmit(logingin)}>

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
                  handleSubmit(logingin)();
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
            <button type='submit' disabled={isSubmitting} className={isSubmitting ? "bg-gray-500 myinputbox w-[50%]" : "bg-primary text-primary-content myinputbox w-[50%]"} >{isSubmitting ? "Loading..." : "Login"}</button>
          </div>

        </form>

        <div className='text-center'>
          Don't have an account <NavLink to='/Signup' className='text-blue-500'>Signup</NavLink>
        </div>

      </div>
    </>
  )
}

export default Loginpage
