import { createAsyncThunk } from '@reduxjs/toolkit';
import { CANVASES } from '../../../data/canvases';
import { ICanvasData } from './canvas-slice.types';


export const fetchCanvasById = createAsyncThunk<ICanvasData, number>(
	'canvas/:id',
	/** @param arg {string} */
	async (canvasId: number) => {
		const response = CANVASES[canvasId];
		return response;
	}
);
