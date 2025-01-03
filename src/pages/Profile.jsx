import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkauth } from '../Redux/auth/authSlice'
import { axiosInstance } from '../lib/axiosInstance'
import { IoCameraOutline } from "react-icons/io5";
import { BsPersonFill } from "react-icons/bs";
import { LuMail } from "react-icons/lu";
import { TbUserEdit } from "react-icons/tb";
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selectedimg, setselectedimg] = useState(null);
  const [updating, setupdating] = useState(false);
  const [uname, setuname] = useState(user.username)

  const updateProfile = async (data) => {
    // console.log(data)
    setupdating(true);
    try {
      const res = await axiosInstance.put("api/auth/updatepfp", data);
      toast.success("Pfp updated");
      dispatch(checkauth());
    } catch (error) {
      console.log(error)
      toast.error("Error !!")
    }
    finally {
      setupdating(false)
    }
  }

  const handleupload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setselectedimg(base64Image);
      await updateProfile({ pfp: base64Image });
    };
  }

  const updateUsername = async (data) => {
    data = {"username" : data}
    // console.log(data)
    try {
      setupdating(true)
      const res = await axiosInstance.put("api/auth/updateuname", data);
      toast.success("username updated");
    } catch (error) {
      console.log(error);
    }
    finally {
      setupdating(false)
    }
  }

  return (
    <>
      <div className='border-[1px] border-base-300 rounded-[10px] m-[0px] py-[10px] h-[94vh] mx-auto flex flex-col justify-center bg-base-200 sm:w-[90%] lg:w-[40%] md:w-[60%] text-base-content'>

        <div className='text-center text-2xl font-bold'>Profile</div>

        <div className='flex justify-center mt-[10px] relative'>
          <img src={selectedimg || user.pfp || "/avatar.png"} alt="pfp" className='border-4 border-base-300 object-cover rounded-full size-32 ' />
          <label htmlFor="pfpupload">
            <IoCameraOutline className='h-7 w-7 absolute bottom-2 right-[40%] border-[1px] border-base-200 rounded-full bg-base-200/50' />
          </label>
          <input type="file" id='pfpupload' className='hidden' accept="image/*" disabled={updating} onChange={handleupload} />
        </div>

        <div className='mt-10 mx-10 mb-2 relative'>
          <div className='flex'>
            <BsPersonFill className='inline h-6 w-6 mx-1' /> <span className=''>Username</span>
          </div>
          <input
            className='flex justify-between myinputbox w-full text-left px-[20px]'
            id='usernamebox'
            value={uname}
            disabled={!updating}
            onChange={(e) => setuname(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateUsername(e.target.value);
              }
            }}
          />
          <TbUserEdit className='h-4 w-4 absolute right-[2%] bottom-[12.5%]' onClick={() => {setupdating(!updating) }} disabled={updating} />
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
            <div>Member Since</div>
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
