import { createAsyncThunk } from '@reduxjs/toolkit';
import { CANVASES } from '../../../data/canvases';
import { ICanvasData } from './canvas.types';

export const fetchCanvasById = createAsyncThunk<ICanvasData, number>('canvas/:id', async (canvasId: number) => {
	const response = CANVASES[canvasId];
	return response;
});
