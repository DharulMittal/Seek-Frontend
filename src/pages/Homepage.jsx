import React from 'react'
import Sidebar from '../components/Sidebar'
import NoChat from '../components/NoChat'
import ChatContainer from '../components/ChatContainer'
import { setSelecteduser, getusers } from '../Redux/message/msgSlice'
import { useSelector, useDispatch } from 'react-redux'


const Homepage = () => {
  const {  selecteduser } = useSelector((state) => state.msg);

  return (
    <div className='h-[95vh] flex'>
      <Sidebar />
      {!selecteduser? <NoChat />:<ChatContainer/>}
    </div>
  )
}

export default Homepage
