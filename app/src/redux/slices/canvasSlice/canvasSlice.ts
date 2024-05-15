import { createSlice } from '@reduxjs/toolkit';
import { EStateStatus } from '../../../constants/stateStatus.enum';
import { ICanvasData } from './canvas.types';
import { fetchCanvasById } from './thunks';

export interface ICanvasState {
	status: EStateStatus;
	data: ICanvasData | null;
	error: string | null;
}

const initialState: ICanvasState = {
	status: EStateStatus.LOADING,
	data: null,
	error: null,
};

const canvasSlice = createSlice({
	initialState,
	name: 'canvas',
	reducers: {
		createElement() {},
		updateElement() {},
		deleteElement() {},
	},
	extraReducers(builder) {
		builder.addCase(fetchCanvasById.fulfilled, (state, action) => {
			state.data = action.payload;
			state.status = EStateStatus.LOADED;
			state.error = null;
		});
	},
});

export const canvasReducer = canvasSlice.reducer;
export const { createElement, updateElement, deleteElement } = canvasSlice.actions;
