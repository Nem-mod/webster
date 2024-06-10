import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { EStateStatus } from '../../../constants/stateStatus.enum';
import { ICanvasElement } from '../../../services/canvas/canvas.types';
import { fetchCanvasById } from './canvas-slice.service';
import { ICanvasData, ICanvasSelectedElement, ISelectedElements, IUpdateElement, ToolOperationType } from './canvas-slice.types';
import axios from '../../../axios/instance';
import { color } from 'framer-motion';

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
	const currentHistory = current(state.data.history)?.stack.at(-1);
	const currentElements = current(state.data).elements;
	if (JSON.stringify(currentHistory) == JSON.stringify(currentElements)) {
		return;
	}

	if (history) {
		if (history.stack.length === MAX_HISTORY_SIZE) {
			history.stack.shift();
		}
		if (history.currentPos !== history.size - 1) {
			const slicedHistory = history.stack.slice(0, history.currentPos + 1);
			history.stack = slicedHistory;
			history.size = history.currentPos + 1;
			return;
		}
		history.stack.push(state.data.elements);
		history.size = history.stack.length;
		history.currentPos = history.stack.length - 1;
	}
};

const patchCanvas = (state: ICanvasState) => {
	axios.patch(`/canvas/${state.data?.id}`, {
		canvas: {
			elements: state.data?.elements,
		},
	});
};

const updateOperations = (state: ICanvasState) => {
	addHistory(state),
		patchCanvas(state);
};


const canvasSlice = createSlice({
	initialState,
	name: 'canvas',
	reducers: {
		addElement(state: ICanvasState, { payload: element }: PayloadAction<ICanvasElement>) {
			state.data?.elements.push(element);
			updateOperations(state);
		},

		updateElement(state, { payload }: PayloadAction<IUpdateElement>) {
			if (!state.data?.elements) return;

			const temp = [...state.data.elements];
			temp[payload.index] = { ...temp[payload.index], ...payload.element };
			state.data.elements = temp;
			if (state.data.selected) {
				const selectedData = current(state.data.selected);
				const selectedIndex = selectedData.findIndex(element => {
					return +element.index === +payload.index;
				});

				if (selectedIndex !== -1) {
					state.data.selected[selectedIndex] = { ...selectedData[selectedIndex], ...payload.element };
				}
			}
			updateOperations(state);
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
			updateOperations(state);
		},

		moveElements(state: ICanvasState, { payload }: PayloadAction<{ to: boolean; }>) {
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
			updateOperations(state);
		},

		moveElementsOneStep(state: ICanvasState, { payload }: PayloadAction<{ to: boolean; }>) {
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
			updateOperations(state);
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

		reviewHistory(state: ICanvasState, { payload }: PayloadAction<{ type: boolean; }>) {
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

		reviewByIndex(state: ICanvasState, { payload }: PayloadAction<{ index: number; }>) {
			if (!state.data || !state.data.history) return;
			const history = state.data.history;
			const { index } = payload;
			history.currentPos = index;
			state.data.elements = history.stack[history.currentPos];
		},

		setTool(state: ICanvasState, { payload }: PayloadAction<{ tool: ToolOperationType; color: string }>) {
			if (!state.data) return;
			state.data.activeTool = {
				tool: payload.tool,
				color: payload.color
			};
		}
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
export const { addElement, updateElement, deleteElement, setSelectedElements, reviewHistory, moveElements, moveElementsOneStep, setTool, reviewByIndex } = canvasSlice.actions;
