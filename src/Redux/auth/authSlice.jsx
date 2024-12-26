import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {axiosInstance} from '../../lib/axiosInstance';
import axios from 'axios';

const initialState = {
    user: [],
    loading: true,
}

export const checkauth = createAsyncThunk(
    'auth/checkauth',
    async (url,{rejectWithValue}) => {
        try {
            const response = await axiosInstance.get('api/auth/check/');
            return response;

        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        resetstate: (state) => {
            state.user = null;
            state.loading = true;
        },
        setuser: (state, action) => {
            state.user = action.payload;
        }
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
    }
});

export const {resetstate,setuser} = authSlice.actions;

export default authSlice.reducer;
