import React from 'react'
import Sidebar from '../components/Sidebar'
import NoChat from '../components/NoChat'

const Homepage = () => {
  return (
    <div className='h-[95vh] flex'>
        <Sidebar/>
        <NoChat/>
    </div>
  )
}

export default Homepage
