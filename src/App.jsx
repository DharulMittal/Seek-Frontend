import { useEffect, useState } from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { checkauth } from './Redux/auth/authSlice'
import { BiLoaderAlt} from "react-icons/bi";
import { Route, Routes, Navigate } from 'react-router';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage.jsx';
import Signup from './pages/signup';
import Setting from './pages/setting';
import Test from './pages/Test';
import Profile from './pages/profile';
import {Toaster} from 'react-hot-toast';
import Navbar from './components/Navbar.jsx';

function App() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // let navigate = useNavigate();

  useEffect(() => {
    dispatch(checkauth());
  }, [dispatch]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen border-2 border-black">
      <BiLoaderAlt className="size-10 animate-spin" />
    </div>
  }

  return (
    <>
      {/* <div className='text-center text-red-600 text-3xl'>
        hellooooooo :{user.username}:{loading ? 'loading' : 'not loading'}:{user.username ? 'user' : 'no user'}
      </div> */}
      <Navbar />
      <Routes>
        <Route path='/' element={user.username ? <Homepage /> : <Navigate to = "/login"/>} />
        {/* <Route path='/' element={user.username ? <Homepage /> : navigate("/login")} /> */}
        <Route path='/login' element={!user.username ? <Loginpage /> : <Navigate to = "/"/> } />
        <Route path='/signup' element={!user.username ? <Signup /> : <Navigate to = "/"/>} />
        <Route path='/setting' element={user.username ? <Setting /> : <Navigate to = "/login"/>} />
        <Route path='/profile' element={user.username ? <Profile /> : <Navigate to = "/login"/>} />
        <Route path='/test' element={<Test />}/>
      </Routes>

      <Toaster />
    </>
  )
}

export default App
