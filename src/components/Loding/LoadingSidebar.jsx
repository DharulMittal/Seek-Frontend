import React from 'react'
import { HiUserGroup } from "react-icons/hi";

const skeletonContacts = Array(8).fill(null);

const LoadingSidebar = () => {
    return (
        <>
            <div className='w-[25%] bg-base-100 h-full text-base-content transition-all duration-200'>
                <div className='flex gap-2 px-5 py-2'>
                    <HiUserGroup className='h-7 w-7 flex flex-col justify-center' />
                    <div className='text-2xl'>Chats</div>
                </div>
                <div className='border-[1px] border-base-300 rounded-3xl'></div>
                <div className=''>
                    {skeletonContacts.map((user, index) => (
                        <div
                            key={index}
                            className={`flex gap-2 px-2 py-1  w-[100%] items-center `}
                        >
                            <div>
                                <div className='border-2 bg-base-300 object-cover rounded-full size-[55px] ' />

                            </div>

                            <div className='flex flex-col gap-0 w-full'>
                                <div className='skeleton text-lg text-start w-[90%] h-5 mb-1'></div>
                                <p className='skeleton text-start w-[45%] lg:w-[25%] h-3'></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default LoadingSidebar
