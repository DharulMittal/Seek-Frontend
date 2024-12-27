import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { settheme } from '../Redux/theme/themeSlice';
import { IoMdSend } from "react-icons/io";

const THEMES = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "dim", "nord", "sunset",
];
const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const Theme = () => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <div className='mx-5 sm:mx-10 md:mx-17 lg:mx-20 '>

      <div className='mt-5'>
        <div className='font-semibold text-xl'>
          Theme
        </div>
        <p>Choose your theme for the application</p>
      </div>

      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 my-5 lg:mx-5'>
        {
          THEMES.map((t) => (
            <button
              key={t}
              className='p-2 hover:bg-base-200/50'
              onClick={() => dispatch(settheme(t))}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))
        }
      </div>


      <div className='pb-6'>

        <div className='font-semibold text-xl'>
          Preview
        </div>

        <div className='border-[1px] border-base-300 mt-5 mx-2 sm:mx-10 lg:mx-20 rounded-3xl bg-base-200 shadow-lg'>

          <div className='mx-auto border-[1.5px] border-base-100 max-w-lg my-4 bg-base-100 rounded-3xl shadow-sm'>

            <div className='flex mx-5 my-2 gap-2'>
              <div>
                <img src="/avatar.png" alt="pfp" className='h-9' />
              </div>
              <div>
                <h3 className="font-medium text-sm">Bade Log</h3>
                <p className="text-xs text-base-content/70">Online</p>
              </div>
            </div>

            <div className='border-[1px] border-base-200'></div>

            <div className="p-4 space-y-4 overflow-y-auto bg-base-100">
              {PREVIEW_MESSAGES.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                          `}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`
                        text-[10px] mt-1.5
                        ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                        `}
                    >
                      12:00 PM
                    </p>
                  </div>

                </div>
              ))}

            </div>

            <div className='border-[1px] border-base-200 mt-3'></div>
            <div className='flex gap-1 justify-center'>
              <div className='border-[2px] border-base-200 w-[85%] my-2 rounded-xl text-start px-5 py-1 text-base-content/85 bg-base-200'>What about you ??</div>
              <div className='border-[2px] border-base-200 w-10 h-10 rounded-xl flex flex-col justify-center items-center my-2 bg-primary-100 bg-primary'>
                <IoMdSend className='h-7 w-7'/>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Theme
