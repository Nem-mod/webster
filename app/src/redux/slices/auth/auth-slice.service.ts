import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../axios/instance';
import { IUserAuthForm, IUserRegisterAndAuthRes, IUserRegisterForm, IUserUpdate, User } from './auth-slice.types';


export const sendVerificationLink = async (email: string) => {
	const redirectURL = `${window.location.origin}/verify?token=replaceToken&email=${email}`;
	await axios.post('auth/verify/send', {
		email: email,
		// TODO: ADD to .env
		returnLink: redirectURL
	});
};

export const fetchRegister = createAsyncThunk<IUserRegisterAndAuthRes, IUserRegisterForm, { rejectValue: string; }>(
	'auth/register',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.post('/auth/register', params);

			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	},
);


export const fetchAuth = createAsyncThunk<IUserRegisterAndAuthRes, IUserAuthForm, { rejectValue: string; }>(
	'auth/login',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.post('/auth/login', {
				username: params.email,
				password: params.password
			});
			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	},
);


export const fetchVerifyRegistration = createAsyncThunk<boolean, { token: string; }, { rejectValue: string; }>(
	'auth/verify',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.post(`/auth/verify/validate?token=${params.token}`);
			return response.statusText === 'ok';
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	},
);

export const fetchAuthMe = createAsyncThunk<IUserRegisterAndAuthRes, null, { rejectValue: string; }>(
    'auth/me',
    async (_, {rejectWithValue}) => {
        try {
					// await axios.post('/auth/refresh');
					const response = await axios.get('/auth/profile');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    },
);

export const fetchLogout = createAsyncThunk<IUserRegisterAndAuthRes, null, { rejectValue: string; }>(
	'auth/logout',
	async (_, {rejectWithValue}) => {
			try {
				const response = await axios.post('/auth/logout');
					return response.data;
			} catch (error: any) {
					return rejectWithValue(error.message);
			}
	},
);


export const fetchUpdateProfile = createAsyncThunk<IUserRegisterAndAuthRes, IUserUpdate, { rejectValue: string }>(
    'auth/update',
    async (params: any, { rejectWithValue }) => {
        try {
            const response = await axios.patch('/auth/profile', params);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    },
);


// export const fetchVerify = createAsyncThunk(
//     'auth/verify/',
//     async (params: any) => {
//         const { data } = await axios.post('/auth/verify/send-code', params);
//         return data;
//     },
// );
