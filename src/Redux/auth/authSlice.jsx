import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../../lib/axiosInstance';
import { io } from "socket.io-client";

const initialState = {
    user: [],
    onlineusers: [],
    socketvar: null,
    loading: true,
}

export const checkauth = createAsyncThunk(
    'auth/checkauth',
    async (url, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('api/auth/check');
            return response;

        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)

export const disconnectSocket = createAsyncThunk(
    'auth/disconnectSocket',
    async (url, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const socketvar = state.auth.socketvar;
            console.log(socketvar)
            if (socketvar?.connected) socketvar.disconnect();
            return socketvar;

        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
)

export const connectSocket = createAsyncThunk(
    'auth/connectSocket',
    async (url, { dispatch,getState,rejectWithValue }) => {
        try {
            const state = getState();
            const user = state.auth.user;
            const socketvar = state.auth.socketvar;
            
            if (socketvar?.connected){
                return null
            };

            const socket = io(import.meta.env.VITE_API_URL, {
                query: {
                    userId: user._id,
                },
            });
            socket.connect();

            // const online = await new Promise((resolve) => {
            //     socket.on("getOnlineUsers", (userIds) => {
            //       resolve(userIds); // Resolve with userIds
            //     });
            //   });
            // console.log(online)
            socket.on("getOnlineUsers", (userIds) => {
                const online = userIds;
                dispatch(setOnlineusers(online));
                // console.log(online)
            });
            return {socket};

        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetstate: (state) => {
            state.user = [];
            state.loading = true;
        },
        setuser: (state, action) => {
            state.user = action.payload;
        },
        setOnlineusers(state, action) {
            state.onlineusers = action.payload;
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkauth.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkauth.fulfilled, (state, action) => {
                state.user = action.payload.data;
                state.loading = false;
            })
            .addCase(checkauth.rejected, (state) => {
                state.loading = false;
            })
    
        builder
            .addCase(connectSocket.fulfilled, (state, action) => {
                if (action.payload) {
                    const {socket} = action.payload;
                    state.socketvar = socket;
                }
            })

        builder
            .addCase(disconnectSocket.fulfilled, (state, action) => {
                if (action.payload) {
                    const {socketvar} = action.payload;
                    state.socketvar = socketvar;
                }
            })
    }
});

export const { resetstate, setuser,setOnlineusers } = authSlice.actions;

export default authSlice.reducer;
