import React, { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSelecteduser, getusers } from '../Redux/message/msgSlice'
// import { axiosInstance } from '../lib/axiosInstance'
import { HiUserGroup } from "react-icons/hi";
import LoadingSidebar from './Loding/LoadingSidebar'
import { IoMdClose } from 'react-icons/io'
import { FaSearch } from "react-icons/fa";

const skeletonContacts = Array(8).fill(null);

// Custom debounce hook
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const Sidebar = () => {
    // const { user } = useSelector((state) => state.auth);
    const { users, selecteduser, loadingusers } = useSelector((state) => state.msg);
    const { onlineusers } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [searchUser, setSearchUser] = useState("")
    const [isSearchVisible, setIsSearchVisible] = useState(false)
    
    // Implement debounced search
    const debouncedSearchTerm = useDebounce(searchUser, 300);

    // Filter users based on search term
    const filteredUsers = useMemo(() => {
        if (!debouncedSearchTerm) return users;
        return users.filter(user => 
            user.username.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
    }, [users, debouncedSearchTerm]);

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
        if (!isSearchVisible) {
            setSearchUser("");
        }
    }

    useEffect(() => {
        dispatch(getusers())
    }, [dispatch, onlineusers])

    if (loadingusers) return <LoadingSidebar />

    return (
        <>
            <div className='w-[100vw] md:w-[25%] bg-base-200 overflow-y-hidden text-base-content border-[2px] border-base-300 shadow-sm'>
                <div className='flex justify-between items-center px-5 py-2'>
                    <div className='flex gap-2 items-center'>
                        <HiUserGroup className='h-6 w-6 flex flex-col justify-center' />
                        <div className='text-xl font-semibold hidden md:inline-block'>Chats</div>
                    </div>
                    <button 
                        onClick={toggleSearch}
                        className="p-2 hover:bg-base-300 rounded-full transition-all md:block hidden"
                    >
                        {isSearchVisible ? <IoMdClose size={20} /> : <FaSearch className='h-4 w-4' />}
                    </button>
                </div>
                <div className='border-[1px] border-base-300 rounded-3xl'></div>
                
                {/* Search Input - Always visible on mobile, toggle on desktop */}
                <div className={`px-[5px] ${isSearchVisible ? 'md:block' : 'md:hidden'} mb-1`}>
                    <input 
                        className='flex justify-between myinputbox w-full text-left px-[20px] rounded-xl bg-base-100/25 border-base-300 border-[1px]'
                        type="text"
                        value={searchUser}
                        onChange={(e) => setSearchUser(e.target.value)}
                        placeholder='Search users...'
                    />
                </div>

                <div className='overflow-y-auto overflow-x-hidden py-2 h-[80vh] md:h-[94vh]'>
                    {filteredUsers.length === 0 ? (
                        <div className="text-center text-gray-500 mt-4">
                            No users found
                        </div>
                    ) : (
                        filteredUsers.map((user) => (
                            <button
                                key={user._id}
                                className={`flex gap-2 px-2 py-1 w-[100%] items-center ${selecteduser?._id == user._id ? "bg-base-300" : ""} hover:bg-base-300/50`}
                                onClick={() => dispatch(setSelecteduser(user))}
                            >
                                <div className='relative flex-shrink-0'>
                                    <img 
                                        src={user.pfp || "/avatar.png"} 
                                        alt="pfp" 
                                        className='border-4 border-base-300 object-cover rounded-full md:w-[55px] md:h-[55px] md:min-w-[55px] w-[55px] h-[55px] min-w-[55px]' 
                                    />
                                    <div className={onlineusers?.includes(user._id) ? 'rounded-full bg-green-600 size-3 absolute bottom-0 right-1' : "hidden"}></div>
                                </div>
                                <div className='md:flex flex-col gap-0 overflow-hidden w-full'>
                                    <div className='text-lg text-start truncate max-w-full'>{user.username}</div>
                                    <p className='text-xs text-start truncate max-w-full px-0'>
                                        {onlineusers?.includes(user._id) ? "Online" : "Offline"}
                                    </p>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default Sidebar
