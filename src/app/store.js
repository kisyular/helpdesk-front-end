import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'

// Import listeners
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
})

// Setup listeners
setupListeners(store.dispatch)
