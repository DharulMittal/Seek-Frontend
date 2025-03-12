import React, { useCallback } from 'react'
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { LuSettings } from "react-icons/lu";
import { Navigate, NavLink, useNavigate } from 'react-router';
import { axiosInstance } from '../lib/axiosInstance';
import { useSelector, useDispatch } from 'react-redux'
import { checkauth, disconnectSocket, resetstate } from '../Redux/auth/authSlice';
import { VscColorMode } from "react-icons/vsc";
import { PiChatsBold } from "react-icons/pi";
import toast from 'react-hot-toast';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const Logout = useCallback(async () => {
        try {
            const response = await axiosInstance.post("api/auth/logout");
            dispatch(disconnectSocket());
            dispatch(resetstate());
            
            // Clear any local storage items if they exist
            localStorage.removeItem('user');
            
            // Show success message
            toast.success("Logged Out Successfully", { position: "top-center" });
            
            // Navigate to home page
            navigate('/');
            
            // Force reload to clear any cached state
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }, [dispatch, navigate]);

    return (
        <div className='flex justify-between bg-base-200 text-base-content px-3 py-2 sticky top-0 z-10 border-[2px] border-base-300'>
            <NavLink to={"/"} className='md:mx-10 sm:mx-5 mx-3 flex gap-1 justify-center'>
                <PiChatsBold className='w-6 h-6'/>
                Seek
            </NavLink>
            <div className='md:mx-10 sm:mx-5 mx-3'>
                <ul className='flex space-x-5'>
                    <li>
                        <NavLink to={"/Theme"} className='sm:flex sm:items-center'>
                            <VscColorMode />
                            <span className='hidden sm:inline'>Theme</span>
                        </NavLink>
                    </li>
                    {user.username && (
                        <>
                            <li>
                                <NavLink to={"/profile"} className='sm:flex sm:items-center'>
                                    <CgProfile />
                                    <span className='hidden sm:inline'>Profile</span>
                                </NavLink>
                            </li>
                            <li>
                                <button onClick={() => { Logout() }} className='sm:flex sm:items-center'>
                                    <FiLogOut />
                                    <span className='hidden sm:inline'>Logout</span>
                                </button>
                            </li>
                        </>
                    )}
                </ul>

            </div>
        </div>
    )
}

export default Navbar
