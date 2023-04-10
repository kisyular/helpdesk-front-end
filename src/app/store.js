import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import authReducer from '../features/auth/authSlice'

// Import listeners
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	// devTools: true, for the development env
	devTools: false, // for production env
})

// Setup listeners
setupListeners(store.dispatch)
