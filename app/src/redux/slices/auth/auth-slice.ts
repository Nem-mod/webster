import { createSlice } from "@reduxjs/toolkit/react";
import { User } from "./auth-slice.types";
import { fetchAuth, fetchAuthMe, fetchRegister, fetchVerifyRegistration } from "./auth-slice.service";


interface AuthState {
	loading: boolean,
	data: User | null,
	error: any | null,
	success: boolean;
}

const initialState: AuthState = {
	loading: false,
	data: null,
	error: null,
	success: false,
};

const authSlice = createSlice({
	initialState,
	name: 'auth',
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(fetchRegister.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.success = true;
		});

		builder.addCase(fetchRegister.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error;
			state.success = false;
		});

		builder.addCase(fetchAuth.fulfilled, (state, action) => {
			state.loading = false;
			console.log('action', action);
			state.data = action.payload;
			state.success = true;
		});

		builder.addCase(fetchAuth.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error;
			state.success = false;
		});

		builder.addCase(fetchVerifyRegistration.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error;
			state.success = false;
		});

		builder.addCase(fetchAuthMe.pending, (state) => {
			state.loading = true;
			state.data = null,
			state.success = false;
		});

		builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.success = true;
		});


		builder.addCase(fetchAuthMe.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.success = false;
		});

		// builder.addCase(fetchAuthMe.rejected, (state, action) => {
		//     state.loading = false;
		//     state.error = action.error;
		//     state.success = false;
		// });

		// builder.addCase(fetchUpdateProfile.fulfilled, (state, action) => {
		//     state.loading = false;
		//     state.userInfo = {
		//         _id: action.payload._id,
		//         username: action.payload.username,
		//         email: action.payload.email,
		//     };
		//     state.success = true;
		// });

		// builder.addCase(fetchUpdateProfile.rejected, (state, action) => {
		//     state.loading = false;
		//     state.error = action.error;
		//     state.success = false;
		// });


	},
});

export const authReducer = authSlice.reducer;