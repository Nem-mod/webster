import { createAsyncThunk } from '@reduxjs/toolkit';
import { CANVASES } from '../../../data/canvases';
import { ICanvasData } from './canvas-slice.types';
import axios from '../../../axios/instance';


export const fetchCanvasById = createAsyncThunk<ICanvasData, string>(
	'canvas/:id',
	/** @param arg {string} */
	async (canvasId: string) => {
		try {
			const response = await axios.get(`/canvas/${canvasId}`);
			return response.data.canvas
		} catch {
			const response = CANVASES[0];
			return response;
		}
	}
);
