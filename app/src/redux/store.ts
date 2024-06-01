import { configureStore } from '@reduxjs/toolkit';
import { canvasReducer } from './slices/canvasSlice/canvas-slice';
import { authReducer } from './slices/auth/auth-slice';
import { canvasesReducer } from './slices/canvases/canvases-slice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		canvas: canvasReducer,
		canvases: canvasesReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
