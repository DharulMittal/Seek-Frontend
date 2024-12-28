import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSelecteduser } from '../../Redux/message/msgSlice'
import { IoClose } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";

const skeletonMessages = Array(6).fill(null);

const LoadingMsgs = () => {
    const { selecteduser } = useSelector((state) => state.msg);
    const dispatch = useDispatch();

    return (
        <>
            <div className='w-[100%] relative '>

                <div className='flex justify-between bg-base-300 text-base-content w-[100%] py-2 items-center px-[1%] border-[2px] border-base-300 shadow-sm'>

                    <div className='flex gap-2 items-center'>
                        <div>
                            <img src={selecteduser.pfp || "/avatar.png"} alt="pfp" className='border-4 border-base-300 object-cover rounded-full size-[55px] ' />
                        </div>
                        <div className='flex flex-col'>
                            <div className=' text-lg text-start'>{selecteduser.username}</div>
                            <p className='text-sm text-start'>Onlien</p>
                        </div>
                    </div>
                    <button className='' onClick={() => dispatch(setSelecteduser(null))}>
                        <IoClose className='h-6 w-6' />
                    </button>
                </div>

                <div className=' bg-base-100 text-base-content overflow-y-auto w-[100%] p-5 '>
                    {skeletonMessages.map((_, idx) => (
                        <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
                            <div className="chat-image avatar">
                                <div className="size-10 rounded-full">
                                    <div className="skeleton w-full h-full rounded-full" />
                                </div>
                            </div>

                            <div className=" chat-header skeleton h-4 w-16 rounded-2xl mb-1" />

                            <div className="skeleton h-16 w-[200px] rounded-2xl" />
                        </div>
                    ))}
                </div>

                <div className='flex w-[100%] gap-1 items-center pl-1 pr-1 '>
                    <input
                        className='border-base-300 bg-base-200 text-base-content border-[2px] rounded-xl px-8 py-2 w-[100%]'
                        placeholder='Type your message'
                    />

                    <button
                        className='border-[2px] border-base-200 w-10 h-10 rounded-xl flex flex-col justify-center items-center bg-primary'
                    >
                        <IoMdSend className='h-7 w-7 text-primary-content' />
                    </button>

                </div>

            </div>
        </>
    )
}

export default LoadingMsgs
