import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IoMdSend } from "react-icons/io";
import { AiFillPicture } from "react-icons/ai";
import { IoMdCloseCircleOutline } from "react-icons/io";
import toast from 'react-hot-toast';
import { sendmsg } from '../Redux/message/msgSlice';

const Inputbox = () => {

    const [previewImg, setpreviewImg] = useState(null)
    const [msgtext, setmsgtext] = useState("")

    const { selecteduser,sending } = useSelector((state) => state.msg);
    const dispatch = useDispatch();


    const handleSendImg = async (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
          }
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64Image = reader.result;
            setpreviewImg(base64Image)
        };
    }

    const handleSendmsg = async () => {
        let data = {
            "text": msgtext.trim(),
            "img" : previewImg
        };
        if (!msgtext && !previewImg) {
            return;
        }
        const id = selecteduser._id
        dispatch(sendmsg({id, data}));

        setmsgtext("");
        setpreviewImg(null);
    }

    return (
        <>
            {
                previewImg && (
                    <div className='mx-2 mb-1 absolute bottom-10 z-10'>
                        <img src={previewImg} alt="" className='border-2 border-base-300 object-cover rounded-2xl size-32 ' />
                        <button className='absolute top-0 right-0 m-1' onClick={() => { setpreviewImg(null) }}>
                            <IoMdCloseCircleOutline className='h-5 w-5 text-base-content/50' />
                        </button>
                    </div>
                )
            }
            <div className='flex w-[100%] gap-1 items-center pl-1 pr-1'>

                <input
                    className='border-base-300 bg-base-200 text-base-content border-[2px] rounded-xl px-8 py-2 w-[100%]'
                    placeholder='Type your message'
                    onChange={(e) => {setmsgtext(e.target.value)}}
                    onKeyDown={(e)=>{
                        if (e.key == "Enter") {
                            handleSendmsg()
                        }
                    }}
                    value={msgtext}
                />

                <label
                    disabled={sending}
                    htmlFor="sendimg"
                    className='border-[2px] border-base-200 w-10 h-10 rounded-xl flex flex-col justify-center items-center bg-primary'
                >
                    <AiFillPicture className='h-7 w-7 text-primary-content' />
                </label>
                <input type="file" id='sendimg' className='hidden' disabled={sending} accept="image/*" onChange={handleSendImg}
                />

                <button
                    className='border-[2px] border-base-200 w-10 h-10 rounded-xl flex flex-col justify-center items-center bg-primary'
                    onClick={handleSendmsg} type='button' disabled={sending}
                >
                    <IoMdSend className='h-7 w-7 text-primary-content' />
                </button>

            </div>
        </>
    )
}

export default Inputbox
