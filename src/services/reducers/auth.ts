import {
	LOGIN_PROCESSING,
	LOGIN_SUCCESS,
	REGISTER_PROCESSING,
	REGISTER_SUCCESS,
	STATE_CLEAR,
	AUTH_CHECKED,
	LOGOUT_SUCCESS,
	USER_SUCCESS,
	FORM_FAILED,
} from '../actions/auth';

import { PROFILE_CHANGE_SUCCESS } from '../actions/profile';
import { TAuthInitialState, TAuthActions } from '../../utils/types';

const authInitialState: TAuthInitialState = {
	user: null,
	requestProcess: false,
	requestFailed: false,
	errorText: undefined,
	isAuthChecked: false,
};

export const authReducer = (
	state = authInitialState,
	action: TAuthActions
): TAuthInitialState => {
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
				errorText: undefined,
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
		case FORM_FAILED: {
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
