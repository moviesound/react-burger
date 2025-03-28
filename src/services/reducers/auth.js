import {
	LOGIN_FAILED,
	LOGIN_PROCESSING,
	LOGIN_SUCCESS,
	PASSWORD_RESET_FAILED,
	PASSWORD_RESET_SENDING_FAILED,
	REGISTER_FAILED,
	REGISTER_PROCESSING,
	REGISTER_SUCCESS,
	STATE_CLEAR,
	AUTH_CHECKED,
	LOGOUT_SUCCESS, USER_SUCCESS,
} from '../actions/auth';

import { PROFILE_CHANGE_SUCCESS } from '../actions/profile';

const authInitialState = {
	user: null,
	requestProcess: false,
	requestFailed: false,
	errorText: null,
	isAuthChecked: false,
};

export const authReducer = (state = authInitialState, action) => {
	switch (action.type) {
		case AUTH_CHECKED: {
			return {
				...state,
				isAuthChecked: true,
			};
		}
		case STATE_CLEAR: {
			return {
				...state,
				requestProcess: false,
				requestFailed: false,
				errorText: null,
			};
		}
		case LOGIN_PROCESSING:
		case REGISTER_PROCESSING: {
			return {
				...state,
				requestProcess: true,
				requestFailed: false,
			};
		}
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS: {
			return {
				...state,
				requestProcess: false,
				requestFailed: false,
				user: action.user,
			};
		}
		case USER_SUCCESS:
		case PROFILE_CHANGE_SUCCESS: {
			return {
				...state,
				user: action.user,
			};
		}
		case LOGIN_FAILED:
		case REGISTER_FAILED:
		case PASSWORD_RESET_FAILED:
		case PASSWORD_RESET_SENDING_FAILED: {
			return {
				...state,
				requestProcess: false,
				requestFailed: true,
				errorText: action.error,
			};
		}
		case LOGOUT_SUCCESS: {
			return {
				...state,
				user: null,
			};
		}
		default: {
			return state;
		}
	}
};
