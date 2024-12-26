import React from 'react'
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { LuSettings } from "react-icons/lu";
import { NavLink } from 'react-router';
import { axiosInstance } from '../lib/axiosInstance';
import { useSelector, useDispatch } from 'react-redux'
import { checkauth,resetstate } from '../Redux/auth/authSlice';
import toast from 'react-hot-toast';

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const Logout = async () => {
        try {
            const response = await axiosInstance.post("api/auth/logout");
            toast.success("Loged Out Successfully", { position: "top-center" })
            dispatch(resetstate());
            dispatch(checkauth());
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='flex justify-between bg-[beige] '>
            <NavLink to={"/"} className='md:mx-10 sm:mx-5 mx-3'>
                logo
            </NavLink>
            <div className='md:mx-10 sm:mx-5 mx-3'>
                <ul className='flex space-x-5'>
                    <li>
                        <NavLink to={"/setting"} className='sm:flex sm:items-center'>
                            <LuSettings />
                            <span className='hidden sm:inline'>Setting</span>
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
                                <button onClick={() => {Logout()}} className='sm:flex sm:items-center'>
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
