import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSelecteduser, getmsg, livemsgs } from '../Redux/message/msgSlice'
import { IoClose } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import LoadingMsgs from './Loding/LoadingMsgs';
import Inputbox from './Inputbox';
import { FaSearch } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const ChatContainer = () => {
  const { user } = useSelector((state) => state.auth);
  const { onlineusers } = useSelector((state) => state.auth);
  const [filteredmsgs, setfilteredmsgs] = useState([])
  const [searchText, setSearchText] = useState("")
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [allMessages, setAllMessages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)

  const { msgs, selecteduser, loadingmsg } = useSelector((state) => state.msg);
  const dispatch = useDispatch();

  const messageEndRef = useRef(null);
  const searchInputRef = useRef(null);

  // Implement debounced search
  const debouncedSearchTerm = useDebounce(searchText, 300);

  useEffect(() => {
    dispatch(getmsg(selecteduser._id))
  }, [dispatch, selecteduser,])

  useEffect(() => {
    const messagesForCurrentChat = msgs.filter((msg) => (
      (msg.sender === selecteduser._id && msg.reciever === user._id) || (msg.sender === user._id && msg.reciever === selecteduser._id)
    ))
    setAllMessages(messagesForCurrentChat);

    // Apply search filter if search is active
    if (debouncedSearchTerm) {
      const searchResults = messagesForCurrentChat.filter(msg =>
        msg.text && msg.text.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setfilteredmsgs(searchResults);
    } else {
      setfilteredmsgs(messagesForCurrentChat);
    }
  }, [msgs, selecteduser, debouncedSearchTerm]);

  useEffect(() => {
    if (messageEndRef.current && filteredmsgs.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [filteredmsgs]);

  useEffect(() => {
    // Focus on search input when search becomes visible
    if (isSearchVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchVisible]);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (isSearchVisible) {
      setSearchText("");
    }
  };

  const openImageModal = (imgSrc) => {
    setSelectedImage(imgSrc);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  if (loadingmsg) return (
    <>
      <LoadingMsgs />
    </>
  )

  return (
    <>
      <div className='w-[100%] flex flex-col justify-between relative top-0'>

        <div className='flex justify-between bg-base-300 text-base-content w-[100%] py-1 items-center px-[1%] border-[2px] border-base-300 shadow-sm'>

          <div className='flex gap-2 items-center'>
            <div>
            <IoMdArrowRoundBack className='h-6 w-6 md:hidden' onClick={() => dispatch(setSelecteduser(null))}/>

            </div>
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
          <div className='flex gap-2 items-center'>
            {isSearchVisible && (
              <div className='relative transition-all duration-300 ease-in-out'>
                <input
                  ref={searchInputRef}
                  className='flex justify-between myinputbox w-full text-left px-[20px] rounded-xl bg-base-100/25 border-base-300 border-[1px]'
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder='Search in chat...'
                />
                {debouncedSearchTerm && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                    {filteredmsgs.length} results
                  </div>
                )}
              </div>
            )}
            <button
              onClick={toggleSearch}
              className="p-2 hover:bg-base-200 rounded-full transition-all"
            >
              {isSearchVisible ? <IoMdClose className='h-6 w-6' /> : <FaSearch className='h-4 w-4' />}
            </button>
            <button className='hidden md:block' onClick={() => dispatch(setSelecteduser(null))}>
              <IoClose className='h-6 w-6' />
            </button>
          </div>
        </div>

        <div className='bg-base-100 text-base-content overflow-y-auto w-[100%] h-[100%] px-5 py-3'>
          {filteredmsgs.length === 0 ? (
            <div className="flex justify-center items-center h-full text-gray-500">
              {debouncedSearchTerm ? "No messages found matching your search" : "No messages yet"}
            </div>
          ) : (
            filteredmsgs.map((msg, index) => (
              <div
                key={msg._id}
                ref={index === filteredmsgs.length - 1 ? messageEndRef : null}
                className={`chat ${msg.sender == user._id ? "chat-end" : "chat-start"} ${debouncedSearchTerm && msg.text && msg.text.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                    ? "bg-base-200/30 rounded-lg"
                    : ""
                  }`}
              >
                <div className='chat-image avatar size-10 '>
                  <img src={msg.sender == user._id ? user.pfp || "/avatar.png" : selecteduser.pfp || "/avatar.png"} alt="" className=' rounded-full' />
                </div>

                <div className={`chat-bubble rounded-lg px-2 py-1 ${msg.sender == user._id ? "bg-primary text-primary-content" : "bg-base-300 text-base-content"}`}>
                  {msg.img && (
                    <div className="cursor-pointer" onClick={() => openImageModal(msg.img)}>
                      <img 
                        src={msg.img} 
                        alt="img" 
                        className='h-40 object-contain p-0 m-0 hover:opacity-90 transition-opacity' 
                      />
                    </div>
                  )}
                  {msg.text && (
                    debouncedSearchTerm ? (
                      <p dangerouslySetInnerHTML={{
                        __html: msg.text.replace(
                          new RegExp(debouncedSearchTerm, 'gi'),
                          match => `<span class="bg-yellow-300 text-black">${match}</span>`
                        )
                      }} />
                    ) : (
                      <p className="overflow-x-auto">{msg.text}</p>
                    )
                  )}
                </div>

                <div className='chat-footer text-xs opacity-50 ml-1 mb-1 '>
                  {new Date(msg.createdAt).toLocaleTimeString("en-US")}
                </div>
              </div>
            ))
          )}
        </div>

        {/* <div className='w-[100%]'> */}
        {/* <div className='sticky bottom-0 w-[100%]'> */}
        <div className='w-[100%]'>
          <Inputbox />
        </div>
      </div>

      {/* Image Modal/Popup */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-auto">
            <button 
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
              onClick={closeImageModal}
            >
              <IoClose className="h-6 w-6" />
            </button>
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              className="max-h-[90vh] max-w-full object-contain" 
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ChatContainer
