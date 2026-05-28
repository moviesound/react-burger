import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from './types/types';

interface IAuthState {
	user: TUser;
	requestProcess: boolean;
	requestFailed: boolean;
	errorText: string | undefined;
	isAuthChecked: boolean;
}

interface IUser {
	user: TUser;
}

export const initialState: IAuthState = {
	user: null,
	requestProcess: false,
	requestFailed: false,
	errorText: undefined,
	isAuthChecked: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<IUser>) {
			state.user = action.payload.user;
		},
		authChecked(state) {
			state.isAuthChecked = true;
		},
		logout(state) {
			state.user = null;
		},
	},
});

export const { setUser, logout, authChecked } = authSlice.actions;

export default authSlice.reducer;
