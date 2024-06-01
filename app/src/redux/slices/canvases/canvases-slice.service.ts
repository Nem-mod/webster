import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios/instance";
import { ICanvas, ICreateCanvas } from "./canvases-slice.types";

export const fetchCreateCanvas = createAsyncThunk<ICanvas, ICreateCanvas, { rejectValue: string; }>(
	'canvases/create-canvas',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.post(`/canvas`, params);
			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);


export const fetchCanvases = createAsyncThunk<ICanvas[], null, { rejectValue: string; }>(
	'canvases/getAll',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/canvas`);
			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);