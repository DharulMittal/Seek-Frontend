import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../../lib/axiosInstance';

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

export const msgSlice = createSlice({
    name: 'msg',
    initialState,
    reducers: {
        setSelecteduser: (state, action) => {
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

    }
});

export const { setSelecteduser } = msgSlice.actions;

export default msgSlice.reducer;
