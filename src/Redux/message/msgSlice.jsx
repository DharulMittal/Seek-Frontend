import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../../lib/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
    msgs: [],
    users: [],
    selecteduser: null,
    loadingmsg: false,
    loadingusers: false,
    sending: false,
}

export const getmsg = createAsyncThunk(
    'msg/getmsg',
    async (userid, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`api/msg/${userid}`);
            return response;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)

export const getusers = createAsyncThunk(
    'msg/getusers',
    async (url, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`api/msg/users`);
            return response;

        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)

export const sendmsg = createAsyncThunk(
    'msg/sendmsg',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`api/msg/send/${id}`, data);
            return response;

        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)

export const livemsgs = createAsyncThunk(
    'msg/livemsgs',
    async (url, { dispatch, getState, rejectWithValue }) => {
        try {
            const state = getState();
            const socketvar = state.auth.socketvar;
            const permission = state.auth.notipermission;

            socketvar.on("newmsgs", async (message) => {
                const msg = message;
                var user = {};
                if (msg.sender) {
                    user = await axiosInstance.post(`api/auth/userinfo`, { "id": msg.sender });
                    user = user.data;
                }

                dispatch(setmsgs(msg));

                const currentState = getState();
                const currentSelectedUser = currentState.msg.selecteduser;

                // Only show notification if the sender is not currently selected
                const isCurrentlyChatting = currentSelectedUser && currentSelectedUser._id === msg.sender;
                if (permission === "granted" && !isCurrentlyChatting) {
                    const notification = new Notification(user.username || msg.sender, {
                        body: msg.text ? msg.text : msg.img ? "Image" : "Attachment",
                        icon: user.pfp || null,
                    });

                    // Add click event handler to the notification
                    notification.onclick = function () {
                        // Focus the window
                        window.focus();
                        // Set the selected user to open their chat
                        dispatch(setSelecteduser(user));
                        // Close the notification
                        this.close();
                    };
                }
                else {
                    if (!isCurrentlyChatting) {
                        toast.custom((t) => (
                            <div className='rounded-full max-w-[60vw] overflow-x-hidden'>
                                <button
                                    className={`flex gap-2 pr-8 my-0 py-1 items-center bg-primary rounded-full`}
                                    onClick={() =>{
                                        dispatch(setSelecteduser(user))
                                        toast.dismiss(t.id)
                                    } }
                                >
                                    <div className='relative flex-shrink-0'>
                                        <img
                                            src={user.pfp || "/avatar.png"}
                                            alt="pfp"
                                            className='border-4 border-primary object-cover rounded-full md:w-[45px] md:h-[45px] md:min-w-[45px] w-[35px] h-[35px] min-w-[35px]'
                                        />
                                    </div>
                                    <div className='md:flex flex-col gap-0 overflow-hidden w-full'>
                                        <div className='text-start truncate max-w-full'>{user.username}</div>
                                        <p className='text-xs text-start truncate max-w-full px-0'>
                                            {msg.text ? msg.text : msg.img ? "Image" : "Attachment"}
                                        </p>
                                    </div>
                                </button>
                            </div>
                        ), { position: "top-right" })
                    }
                }
            });

        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
)

export const offlivemsgs = createAsyncThunk(
    'msg/offlivemsgs',
    async (url, { dispatch, getState, rejectWithValue }) => {
        try {
            const state = getState();
            const socketvar = state.auth.socketvar;

            socketvar.off("newmsgs");

        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
)

export const msgSlice = createSlice({
    name: 'msg',
    initialState,
    reducers: {
        setSelecteduser: (state, action) => {
            state.selecteduser = action.payload;
        },
        setmsgs: (state, action) => {
            state.msgs = [...state.msgs, action.payload];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getmsg.pending, (state) => {
                state.loadingmsg = true;
            })
            .addCase(getmsg.fulfilled, (state, action) => {
                state.msgs = action.payload.data;
                state.loadingmsg = false;
            })
            .addCase(getmsg.rejected, (state) => {
                state.loadingmsg = false;
            });


        builder
            .addCase(getusers.pending, (state) => {
                state.loadingusers = true;
            })
            .addCase(getusers.fulfilled, (state, action) => {
                state.users = action.payload.data;
                state.loadingusers = false;
            })
            .addCase(getusers.rejected, (state) => {
                state.loadingusers = false;
            });

        builder
            .addCase(sendmsg.pending, (state) => {
                state.sending = true;
            })
            .addCase(sendmsg.fulfilled, (state, action) => {
                state.msgs = [...state.msgs, action.payload.data];
                state.sending = false;
            })
            .addCase(sendmsg.rejected, (state) => {
                state.sending = false;
            });

        builder
            .addCase(livemsgs.fulfilled, (state, action) => {
            })
    }
});

export const { setSelecteduser, setmsgs } = msgSlice.actions;

export default msgSlice.reducer;
