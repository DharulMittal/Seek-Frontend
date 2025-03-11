import React, { useState } from 'react'
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "../Styles/component.css"
import { NavLink } from 'react-router';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form"
import { axiosInstance } from '../lib/axiosInstance';
import { useDispatch } from 'react-redux'
import { checkauth, connectSocket } from '../Redux/auth/authSlice';

const Signup = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();
  const [showpass, setshowpass] = useState(false)

  const signingup = async (data) => {
    try {
      const response = await axiosInstance.post("api/auth/signup", data);
      toast.success("Account Created Successfully", { position: "top-center" })
      await dispatch(checkauth()).unwrap();
      await dispatch(connectSocket()).unwrap();
    } catch (error) {
      console.log(error.response.data)
    }
  };

  return (
    <>
      <div className='border-[1px] border-base-300 shadow-sm rounded-[10px] m-[0px] py-[10px] h-[94vh] mx-auto flex flex-col justify-center bg-base-200 text-base-content sm:w-[90%] lg:w-[40%] md:w-[60%]'>

        <div className='text-center text-3xl font-bold'>Create Account</div>

        <form onSubmit={handleSubmit(signingup)}>

          <div className='flex justify-around mt-[5px]'>
            <input
              className="myinputbox"
              type="text"
              {...register("username", { required: { value: true, message: "This field is required" }, minLength: { value: 3, message: "Min length is 3" }, maxLength: { value: 30, message: "Max length is 30" } })}
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
              {...register("password", { required: { value: true, message: "This field is required" }, minLength: { value: 6, message: "Min length is 6" }, maxLength: { value: 20, message: "Max length is 20" },pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                message:
                  "1 uppercase, 1 lowercase , and 1 number",
              } })}
            />
            <button type='button' className='absolute right-[16%] py-[12.5px]' onClick={() => { setshowpass(!showpass) }}>
              {showpass ? <FaLockOpen /> : <FaLock />}
            </button>
          </div>
          {errors.password && <p className='text-red-500 text-center text-sm p-0 m-0'>{errors.password.message}</p>}

          <div className='flex justify-around my-[5px]'>
            <button type='submit' disabled={isSubmitting} className={isSubmitting ? "bg-gray-500 myinputbox w-[50%]" : "bg-primary text-primary-content myinputbox w-[50%]"} >{isSubmitting ? "Loading..." : "Create Account"}</button>
          </div>

        </form>

        <div className='flex justify-center my-3'>
          <div className='border-t border-base-300 w-1/3'></div>
          <div className='mx-4 text-base-content/70 -mt-3'>OR</div>
          <div className='border-t border-base-300 w-1/3'></div>
        </div>

        <div className='flex justify-around my-[5px]'>
          <a 
            href={`${import.meta.env.VITE_API_URL}api/auth/google`}
            className='flex items-center justify-center gap-2 border border-base-300 rounded-lg py-2 px-4 w-[70%] hover:bg-base-300 transition-colors'
          >
            <FcGoogle className="text-2xl" />
            <span>Continue with Google</span>
          </a>
        </div>

        <div className='text-center mt-3'>
          already have an account <NavLink to='/login' className='text-blue-500'>Login</NavLink>
        </div>

      </div>
    </>
  )
}

export default Signup
