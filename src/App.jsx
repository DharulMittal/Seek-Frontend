import { useEffect, useState } from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { resetstate, checkauth } from './Redux/auth/authSlice'
function App() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkauth());
  },[dispatch]);

  return (
    <>
      <div className='text-center text-red-600 text-3xl'>
        hellooooooo :{user.username}:{loading ? 'loading' : 'not loading'}:{user.username ? 'user' : 'no user'}
      </div>
    </>
  )
}

export default App
