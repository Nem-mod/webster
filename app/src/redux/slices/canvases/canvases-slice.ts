import { createSlice } from '@reduxjs/toolkit';
import { EStateStatus } from '../../../constants/stateStatus.enum';
import { ICanvasesData } from './canvases-slice.types';
import { fetchCanvases, fetchCreateCanvas } from './canvases-slice.service';

export interface ICanvasState {
	status: EStateStatus;
	data: ICanvasesData | null;
	error: string | null;
}

const initialState: ICanvasState = {
	status: EStateStatus.PENDING,
	data: null,
	error: null,
};


const canvasSlice = createSlice({
	initialState,
	name: 'canvases',
	reducers: {},
	extraReducers(builder) {
		// TODO: Add loading + rejected cases
		builder.addCase(fetchCreateCanvas.fulfilled, (state, action) => {
			if (!state.data) {
				state.data = { canvases: [action.payload] };
			} else {
				state.data.canvases.push(action.payload);
			}

			state.status = EStateStatus.LOADED;
			state.error = null;
		});

		builder.addCase(fetchCanvases.fulfilled, (state, action) => {
			state.data = { canvases: action.payload };
			state.status = EStateStatus.LOADED;
			state.error = null;
		});
	},
});

export const canvasesReducer = canvasSlice.reducer;