import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {axiosInstance} from '../../lib/axiosInstance';

const initialState = {
    msgs: [],
    users: [],
    selecteduser : null,
    loadingmsg: false,
    loadingusers: false,
}

export const getmsg = createAsyncThunk(
    'msg/getmsg',
    async (url,{rejectWithValue},{getState}) => {
        try {
            const user = getState().user.user;
            const response = await axiosInstance.get(`api/msg/${user._id}}`);
            return response;

        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)

export const getusers = createAsyncThunk(
    'msg/getusers',
    async (url,{rejectWithValue}) => {
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
    async (url,{rejectWithValue},{getState}) => {
        try {
            const user = getState().user.user;
            const response = await axiosInstance.put(`api/msg/send/${user._id}`);
            return response;

        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)

export const msgSlice = createSlice({
    name: 'msg',
    initialState,
    reducers:{
        setSelecteduser : (state,action) => {
            state.selecteduser = action.payload;
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

    }
});

export const {setSelecteduser} = msgSlice.actions;

export default msgSlice.reducer;
