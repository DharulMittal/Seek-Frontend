import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import NoChat from '../components/NoChat'
import ChatContainer from '../components/ChatContainer'
import { useSelector } from 'react-redux'


const Homepage = () => {
  const { selecteduser } = useSelector((state) => state.msg);
  const [isScreenSmall, setisScreenSmall] = useState(window.innerWidth > 768)

  useEffect(() => {
    const handleResize = () => {
      setisScreenSmall(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    isScreenSmall ? <div className='flex h-[calc(100vh-3rem)] w-full overflow-hidden relative'>
      <Sidebar />
      {!selecteduser ? <NoChat /> : <ChatContainer />}
    </div>
      :
      <div className='flex h-[88vh] w-full overflow-hidden relative'>
        {!selecteduser ? <Sidebar /> : <ChatContainer />}
      </div>
  )
}

export default Homepage