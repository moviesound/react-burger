import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TProfileInitialState } from './types/types';

interface IProfileState {
	requestProcess: boolean;
	requestFailed: boolean;
	errorText?: string;
}

interface IError {
	errorText: string;
}

const initialState: IProfileState = {
	requestProcess: false,
	requestFailed: false,
	errorText: undefined,
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		profileProcessing(state) {
			state.requestProcess = true;
			state.requestFailed = false;
		},
		profileSuccess(state) {
			state.requestProcess = false;
			state.requestFailed = false;
		},
		profileFailed(state, action: PayloadAction<IError>) {
			state.requestProcess = false;
			state.requestFailed = true;
			state.errorText = action.payload.errorText;
		},
	},
});

export const { profileProcessing, profileSuccess, profileFailed } =
	profileSlice.actions;

export default profileSlice.reducer;
