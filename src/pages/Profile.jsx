import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkauth } from '../Redux/auth/authSlice'
import { axiosInstance } from '../lib/axiosInstance'
import { IoCameraOutline } from "react-icons/io5";
import { BsPersonFill } from "react-icons/bs";
import { LuMail } from "react-icons/lu";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selectedimg, setselectedimg] = useState(null);
  const [updating, setupdating] = useState(false);

  const handleupload = async ()=> {

  }

  return (
    <>
      <div className='border-2 border-black rounded-[10px] m-[0px] py-[10px] h-[94vh] mx-auto flex flex-col justify-center bg-[beige] sm:w-[90%] lg:w-[40%] md:w-[60%]'>

        <div className='text-center text-2xl font-bold'>Profile</div>

        <div className='flex justify-center mt-[10px] relative'>
          <img src={selectedimg || user.pfp || "/avatar.png"} alt="pfp" className='border-4 border-black object-cover rounded-full size-32 ' />
          <label htmlFor="pfpupload">
            <IoCameraOutline className='h-7 w-7 absolute bottom-2 right-[40%] border-2 border-black rounded-full bg-slate-100'/>
          </label>
          <input type="file" id='pfpupload' className='hidden' accept="image/*" disabled={updating} onChange={handleupload}  />
        </div>

        <div className='mt-10 mx-10 mb-2'>
          <div className='flex'>
            <BsPersonFill className='inline h-6 w-6 mx-1' /> <span className=''>Username</span>
          </div>
          <div className='myinputbox w-full text-left px-[20px]'>{user.username}</div>
        </div>

        <div className='mx-10 mb-2'>
          <div className='flex'>
            <LuMail className='inline h-6 w-6 mx-1' /> <span className=''> email</span>
          </div>
          <div className='myinputbox w-full text-left px-[20px]'>{user.email}</div>
        </div>

        <div className='mx-12'>
          <div className=' font-bold text-lg mt-5 mb-2'>Account Information</div>
          <div className='flex justify-between mx-6'>
            <div>Memebr Since</div>
            <div>{user.createdAt.split("T")[0]}</div>
          </div>
          {/* <hr /> */}
          <div className='flex justify-between mx-6'>
            <div>Status</div>
            <div className='text-green-600 font-bold'>Active</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
