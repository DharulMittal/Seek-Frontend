import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSelecteduser, getmsg, livemsgs } from '../Redux/message/msgSlice'
import { IoClose } from "react-icons/io5";
import LoadingMsgs from './Loding/LoadingMsgs';
import Inputbox from './Inputbox';
import { BsPass } from 'react-icons/bs';

const ChatContainer = () => {
  const { user } = useSelector((state) => state.auth);
  const { onlineusers } = useSelector((state) => state.auth);
  const [filteredmsgs, setfilteredmsgs] = useState([])

  const { msgs, selecteduser, loadingmsg } = useSelector((state) => state.msg);
  const dispatch = useDispatch();

  const messageEndRef = useRef(null);

  useEffect(() => {
    dispatch(getmsg(selecteduser._id))
  }, [dispatch, selecteduser,])

  useEffect(() => {
    const filteredmsgs = msgs.filter((msg) => (
      (msg.sender === selecteduser._id && msg.reciever === user._id) || (msg.sender === user._id && msg.reciever === selecteduser._id) 
    ))
    setfilteredmsgs(filteredmsgs);
  }, [msgs,selecteduser]);

  useEffect(() => {
    if (messageEndRef.current && filteredmsgs) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [filteredmsgs]);

  if (loadingmsg) return (
    <>
      <LoadingMsgs />
    </>
  )

  return (
    <>
      <div className='w-[100%] relative flex flex-col justify-between '>

        <div className='flex justify-between bg-base-300 text-base-content w-[100%] py-1 items-center px-[1%] border-[2px] border-base-300 shadow-sm'>

          <div className='flex gap-2 items-center'>
            <div>
              <img src={selecteduser.pfp || "/avatar.png"} alt="pfp" className='border-4 border-base-300 object-cover rounded-full size-[55px] ' />
            </div>
            <div className='flex flex-col'>
              <div className=' text-lg text-start'>{selecteduser.username}</div>
              <p className='text-sm text-start'>
                {onlineusers?.includes(selecteduser._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>
          <button className='' onClick={() => dispatch(setSelecteduser(null))}>
            <IoClose className='h-6 w-6' />
          </button>
        </div>

        <div className=' bg-base-100 text-base-content overflow-y-auto w-[100%] h-[100%] px-5 py-3 '>
          {
            filteredmsgs.map(msg => (
              <div 
                key={msg._id} 
                ref= {messageEndRef}
                className={`chat ${msg.sender == user._id ? "chat-end" : "chat-start"}`}
              >
                <div className='chat-image avatar size-10 '>
                  <img src={msg.sender == user._id ? user.pfp : selecteduser.pfp} alt="pfp" className=' rounded-full' />
                </div>

                <div className={`chat-bubble rounded-lg px-2 py-1 ${msg.sender == user._id ? "bg-primary text-primary-content" : "bg-base-300 text-base-content"}`}>
                  {msg.img && (
                    <img src={msg.img} alt="img" className='size-40 p-0 m-0' />
                  )}
                  {msg.text && (<p>{msg.text}</p>)}
                </div>

                <div className='chat-footer text-xs opacity-50 ml-1 mb-1 '>
                  {new Date(msg.createdAt).toLocaleTimeString("en-US")}
                </div>
              </div>
            ))
          }
        </div>

        <div className='relative'>
          <Inputbox />
        </div>
      </div>
    </>
  )

}

export default ChatContainer
