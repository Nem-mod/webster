import { createSlice } from '@reduxjs/toolkit';
import { EStateStatus } from '../../../constants/stateStatus.enum';
import { ICanvasesData } from './canvases-slice.types';
import { fetchCanvases, fetchCreateCanvas, fetchDeleteCanvas, fetchUpdateCanvas } from './canvases-slice.service';

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
	reducers: {
		searchCanvas(state, action) {
			if (!state.data) return;

			if (action.payload === '') {
				state.data.search = null;
				return;
			}

			state.data.search = state.data.canvases.filter(e => {
				const splitName = e.canvasName.toLocaleLowerCase().split(' ');
				const splitSearch: string[] = action.payload.toLocaleLowerCase().split(' ');
				let res = false;
				for (const key of splitName) {
					if (res) break;
					res = splitSearch.includes(key);
					for (let i = 0; i < splitSearch.at(-1).length; i++) {
						if (res) {
							break;
						}
						res = key.includes(splitSearch.at(-1)?.slice(0, ++i));
					}
				}

				return res;
			});
		}
	},
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

		builder.addCase(fetchDeleteCanvas.fulfilled, (state, action) => {
			if (!state.data?.canvases) return;

			state.data.canvases = state.data?.canvases.filter(e => e._id != action.payload.id);
			state.status = EStateStatus.LOADED;
			state.error = null;
		});

		builder.addCase(fetchUpdateCanvas.fulfilled, (state, action) => {
			if (!state.data?.canvases) return;

			state.data.canvases = state.data?.canvases.map(e => {
				if (e._id === action.payload._id) {
					return action.payload;
				}
				return e;
			});
			state.status = EStateStatus.LOADED;
			state.error = null;
		});
	},
});

export const canvasesReducer = canvasSlice.reducer;
export const { searchCanvas } = canvasSlice.actions;