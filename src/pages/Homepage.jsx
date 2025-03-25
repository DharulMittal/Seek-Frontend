import React from 'react'
import Sidebar from '../components/Sidebar'
import NoChat from '../components/NoChat'
import ChatContainer from '../components/ChatContainer'
import { setSelecteduser, getusers } from '../Redux/message/msgSlice'
import { useSelector, useDispatch } from 'react-redux'


const Homepage = () => {
  const { selecteduser } = useSelector((state) => state.msg);

  return (
    <>
      {/* Desktop/tablet view */}
      <div className='hidden md:flex md:h-[calc(100vh-3rem)] md:w-full overflow-hidden relative'>
        <Sidebar />
        {!selecteduser ? <NoChat /> : <ChatContainer />}
      </div>
      
      {/* Mobile view */}
      <div className='flex h-[88vh] w-full md:hidden overflow-hidden relative'>
        {!selecteduser ? <Sidebar /> : <ChatContainer />}
      </div>
    </>
  )
}

export default Homepage
