import { configureStore } from '@reduxjs/toolkit';
import { canvasReducer } from './slices/canvasSlice/canvas-slice';
import { authReducer } from './slices/auth/auth-slice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		canvas: canvasReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
