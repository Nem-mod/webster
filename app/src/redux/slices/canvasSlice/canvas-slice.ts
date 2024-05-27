import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EStateStatus } from '../../../constants/stateStatus.enum';
import { ICanvasElement } from '../../../services/canvas/canvas.types';
import { fetchCanvasById } from './canvas-slice.service';
import { ICanvasData, ICanvasSelectedElement, ISelectedElements, IUpdateElement } from './canvas-slice.types';

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

const MAX_HISTORY_SIZE = 20;

const addHistory = (state: ICanvasState) => {
	if (!state.data) return;
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

		deleteElement(state: ICanvasState) {
			if (!state.data) return;

			const selectedIds = state.data.selected.map((e) => +e.index);
			const elements = state.data.elements;
			if (!selectedIds?.length || !elements?.length) return;

			for (let i = 0; i <= selectedIds.length - 1; i++) {
				const index = selectedIds[i];
				elements.splice(index - i, 1);
			}
			state.data.selected = [];
			addHistory(state);
		},

		moveElements(state: ICanvasState, { payload }: PayloadAction<{ to: boolean }>) {
			if (!state.data) return;

			const selectedIds = state.data.selected.map((e) => e.index);
			const elements = state.data.elements;
			if (!selectedIds?.length || !elements?.length) return;

			for (let i = 0; i <= selectedIds.length - 1; i++) {
				const index = selectedIds[i];
				const removedElement = elements.splice(index, 1)[0];
				if (!payload.to) {
					elements.unshift(removedElement);
					state.data.selected[i] = {
						index: 0,
						...removedElement,
					};
				} // Insert at the beginning
				else if (payload.to) {
					const length = elements.push(removedElement);
					state.data.selected[i] = {
						index: length - 1,
						...removedElement,
					};
				} // Insert at the beginning
			}
			addHistory(state);
		},

		moveElementsOneStep(state: ICanvasState, { payload }: PayloadAction<{ to: boolean }>) {
			if (!state.data) return;

			const selectedIds = state.data.selected.map((e) => +e.index);
			const elements = state.data.elements;

			if (!selectedIds?.length || !elements?.length) return;

			for (let i = 0; i <= selectedIds.length - 1; i++) {
				const index = selectedIds[i];
				let step = 0;

				if (payload.to) {
					const tempStep = index + 1;
					step = tempStep < elements.length ? tempStep : index;
				} else if (!payload.to) {
					const tempStep = index - 1;
					step = tempStep >= 0 ? tempStep : index;
				}

				const tempElement = elements[index];
				elements[index] = elements[step];
				elements[step] = tempElement;
				state.data.selected[i] = {
					index: step,
					...tempElement,
				};
			}
			addHistory(state);
		},

		setSelectedElements(state: ICanvasState, { payload }: PayloadAction<ISelectedElements>) {
			if (!state.data) return;
			const selected: ICanvasSelectedElement[] = [];
			for (const k of payload.elementIndexes) {
				selected.push({
					index: k,
					...state.data.elements[k],
				});
			}
			state.data.selected = selected;
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
export const { addElement, updateElement, deleteElement, setSelectedElements, reviewHistory, moveElements, moveElementsOneStep } = canvasSlice.actions;
