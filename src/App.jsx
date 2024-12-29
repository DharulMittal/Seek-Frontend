import { useEffect } from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { checkauth, connectSocket } from './Redux/auth/authSlice'
import { BiLoaderAlt } from "react-icons/bi";
import { Route, Routes, Navigate } from 'react-router';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage.jsx';
import Signup from './pages/Signup';
import Theme from './pages/Theme';
import Profile from './pages/Profile';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar.jsx';
import { livemsgs } from './Redux/message/msgSlice.jsx';

function App() {
  const { user, loading } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  // let navigate = useNavigate();

  useEffect(() => {
    // dispatch(checkauth())
    // dispatch(connectSocket());
    const initialize = async () => {
      try {
        await dispatch(checkauth()).unwrap();
        await dispatch(connectSocket()).unwrap();
        dispatch(livemsgs())
      } catch (error) {
        console.error("Error during initialization:", error);
      }
    };
    initialize();    

  }, [dispatch]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen border-2 border-black">
      <BiLoaderAlt className="size-10 animate-spin" />
    </div>
  }

  return (
    <div data-theme={theme} className='relative'>
      <Navbar />
      <Routes>
        <Route path='/' element={user.username ? <Homepage /> : <Navigate to="/login" />} />
        {/* <Route path='/' element={user.username ? <Homepage /> : navigate("/login")} /> */}
        <Route path='/login' element={!user.username ? <Loginpage /> : <Navigate to="/" />} />
        <Route path='/signup' element={!user.username ? <Signup /> : <Navigate to="/" />} />
        <Route path='/theme' element={<Theme />} />
        <Route path='/profile' element={user.username ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
