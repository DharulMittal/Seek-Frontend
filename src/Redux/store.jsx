import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import themeReducer from "./theme/themeSlice"
import msgReducer from "./message/msgSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        msg: msgReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable completely
            // Or be more specific:
            // serializableCheck: {
            //     ignoredActions: ['auth/checkauth/fulfilled'],
            //     ignoredPaths: ['payload.headers']
            // }
        })
})

