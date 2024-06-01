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
			const data = {
				id: response.data._id,
				title: response.data.canvasName,
				elements: response.data.canvas.elements
			}
			return data
		} catch {
			const response = CANVASES[0];
			return response;
		}
	}
);


