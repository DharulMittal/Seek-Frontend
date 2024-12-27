import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    theme: (localStorage.getItem("seek-theme") || "retro"),
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        settheme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem("seek-theme",state.theme);
        }
    },
});

export const { settheme } = themeSlice.actions;

export default themeSlice.reducer;