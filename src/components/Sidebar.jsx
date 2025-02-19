import React, { useState , useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSelecteduser, getusers } from '../Redux/message/msgSlice'
// import { axiosInstance } from '../lib/axiosInstance'
import { HiUserGroup } from "react-icons/hi";
import LoadingSidebar from './Loding/LoadingSidebar'

const skeletonContacts = Array(8).fill(null);

const Sidebar = () => {
    // const { user } = useSelector((state) => state.auth);
    const {  users, selecteduser, loadingusers } = useSelector((state) => state.msg);
    const {onlineusers} = useSelector((state) => state.auth );
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getusers())
    }, [dispatch,onlineusers])
    
    if (loadingusers) return <LoadingSidebar/>

    return (
        <>
            <div className='w-[17.5%] md:w-[25%] bg-base-200 overflow-y-hidden text-base-content border-[2px] border-base-300 shadow-sm'>
                <div className='flex gap-2 px-5 py-2'>
                    <HiUserGroup className='h-6 w-6 flex flex-col justify-center' />
                    <div className='text-xl font-semibold hidden md:inline-block'>Chats</div>
                </div>
                <div className='border-[1px] border-base-300 rounded-3xl'></div>

                <div className=' overflow-y-auto overflow-x-hidden py-3 h-[92%] '>
                    { 
                        users.map((user)=>(
                            <button 
                            key={user._id}
                            className={`flex gap-2 px-2 py-1  w-[100%] items-center ${selecteduser?._id == user._id ? "bg-base-300" : ""}`}
                            onClick={() => dispatch(setSelecteduser(user))}
                            >
                                <div className='relative'>
                                    <img src={user.pfp || "/avatar.png"} alt="pfp" className='border-4 border-base-300 object-cover rounded-full  w-[100%] aspect-square sm:size-[55px] ' />
                                    <div className={onlineusers?.includes(user._id) ?'rounded-full bg-green-600 size-3 absolute bottom-0 right-1' : "hidden"}></div>
                                </div>
                                <div className='flex flex-col gap-0 hidden md:block'>
                                    <div className='text-lg text-start'>{user.username}</div>
                                    <p className='text-sm text-start'>
                                        {onlineusers?.includes(user._id) ? "Online" : "Offline"}
                                    </p>
                                </div>

                            </button>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Sidebar
