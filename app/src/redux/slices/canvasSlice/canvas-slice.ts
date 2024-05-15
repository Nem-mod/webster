import { createSlice } from '@reduxjs/toolkit';
import { EStateStatus } from '../../../constants/stateStatus.enum';
import { fetchCanvasById } from './canvas-slice.service';
import { ICanvasData } from './canvas-slice.types';

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
		addElement(state, action) {},
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
export const { addElement, updateElement, deleteElement } = canvasSlice.actions;
