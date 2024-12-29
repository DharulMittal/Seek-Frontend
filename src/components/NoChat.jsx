import React from 'react'
import { Link } from 'react-router';
import { PiChatsBold } from "react-icons/pi";

const NoChat = () => {
    return (
        <>
            <div className='w-[90%] md:w-[75%] bg-base-100 h-full border-[2px] shadow-sm border-base-300 flex flex-col justify-center items-center relative text-base-content'>
                <PiChatsBold className='w-10 h-10 animate-bounce'/>
                <div className='text-3xl font-bold'>Welcome to Seek</div>
                <div>Send and receive messages without keeping your phone online.</div>
                <div className='absolute bottom-[10%]'>
                    Made By 
                    <Link className='text-primary-content font-semibold' to={"https://github.com/DharulMittal"}> Dharul</Link>
                </div>
            </div>
        </>
    )
}

export default NoChat
