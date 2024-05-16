import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EStateStatus } from '../../../constants/stateStatus.enum';
import { ICanvasElement } from '../../../services/canvas/canvas.types';
import { fetchCanvasById } from './canvas-slice.service';
import { ICanvasData } from './canvas-slice.types';

export interface ICanvasState {
	status: EStateStatus;
	data: ICanvasData | null;
	error: string | null;
}

const initialState: ICanvasState = {
	status: EStateStatus.PENDING,
	data: null,
	error: null,
};

const canvasSlice = createSlice({
	initialState,
	name: 'canvas',
	reducers: {
		addElement(state, { payload: element }: PayloadAction<ICanvasElement>) {
			state.data?.elements.push(element);
		},
		updateElement() {},
		deleteElement() {},
	},
	extraReducers(builder) {
		builder.addCase(fetchCanvasById.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			//@ts-expect-error
			state.data = action.payload;
			state.status = EStateStatus.LOADED;
			state.error = null;
		});
	},
});

export const canvasReducer = canvasSlice.reducer;
export const { addElement, updateElement, deleteElement } = canvasSlice.actions;
