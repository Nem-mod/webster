import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EStateStatus } from '../../../constants/stateStatus.enum';
import { ICanvasElement } from '../../../services/canvas/canvas.types';
import { fetchCanvasById } from './canvas-slice.service';
import { ICanvasData, ISelectedElements, IUpdateElement } from './canvas-slice.types';

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

const MAX_HISTORY_SIZE = 10;

const addHistory = (state: ICanvasState) => {
	if (!state.data) return;
	state.data.selected = [];
	const history = state.data.history;
	if (history) {
		if (history.size === MAX_HISTORY_SIZE) {
			history.stack.shift();
		}
		if (history.currentPos !== history.size - 1) {
			const slicedHistory = history.stack.slice(0, history.currentPos + 1);
			history.stack = slicedHistory;
			history.size = history.currentPos + 1;
		}
		history.stack.push(state.data.elements);
		history.size += 1;
		history.currentPos += 1;
	}
};

const canvasSlice = createSlice({
	initialState,
	name: 'canvas',
	reducers: {
		addElement(state: ICanvasState, { payload: element }: PayloadAction<ICanvasElement>) {
			state.data?.elements.push(element);
			addHistory(state);
		},
		updateElement(state, { payload }: PayloadAction<IUpdateElement>) {
			if (!state.data?.elements) return;

			const temp = [...state.data.elements];
			temp[payload.index] = { ...temp[payload.index], ...payload.element };
			state.data.elements = temp;
			addHistory(state);
		},
		deleteElement() {},
		setSelectedElements(state: ICanvasState, { payload }: PayloadAction<ISelectedElements>) {
			if (!state.data) return;
			state.data.selected =
				state.data?.elements.filter((element, index) => {
					if (payload.elementIndexes.includes(index)) return element;
				}) || [];
		},

		reviewHistory(state: ICanvasState, { payload }: PayloadAction<{ type: boolean }>) {
			if (!state.data || !state.data.history) return;
			const history = state.data.history;
			const { type } = payload;
			if (type && history.currentPos !== 0) {
				history.currentPos -= 1;
				state.data.elements = history.stack[history.currentPos];
			} else if (!type && history.currentPos != history.size - 1) {
				history.currentPos += 1;
				state.data.elements = history.stack[history.currentPos];
			}
		},
	},

	extraReducers(builder) {
		builder.addCase(fetchCanvasById.fulfilled, (state: ICanvasState, action) => {
			if (!action.payload) {
				return;
			}
			state.data = action.payload;
			if (state.data) state.data.history = { stack: [action.payload.elements], size: 1, currentPos: 0 };
			state.status = EStateStatus.LOADED;
			state.error = null;
		});
	},
});

export const canvasReducer = canvasSlice.reducer;
export const { addElement, updateElement, deleteElement, setSelectedElements, reviewHistory } = canvasSlice.actions;
