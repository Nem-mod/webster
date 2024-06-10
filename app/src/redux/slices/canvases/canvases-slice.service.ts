import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios/instance";
import { ICanvas, ICreateCanvas, IUpdateCanvas } from "./canvases-slice.types";

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

export const fetchUpdateCanvas = createAsyncThunk<ICanvas, IUpdateCanvas, { rejectValue: string; }>(
	'canvases/update-canvas',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.patch(`/canvas/${params._id}`, params);
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

export const fetchDeleteCanvas = createAsyncThunk<{ id: string; }, string, { rejectValue: string; }>(
	'canvases/delete',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.delete(`/canvas/${id}`);
			return { id: id };
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);