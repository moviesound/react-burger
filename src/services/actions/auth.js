import { api } from '../../utils/api';
import { PROFILE_CHANGE_PROCESSING } from '../../services/actions/profile';

export const PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED';
export const PASSWORD_RESET_PROCESSING = 'PASSWORD_RESET_PROCESSING';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';

export const PASSWORD_RESET_SENDING_FAILED = 'PASSWORD_RESET_SENDING_FAILED';
export const PASSWORD_RESET_SENDING_PROCESSING =
	'PASSWORD_RESET_SENDING_PROCESSING';
export const PASSWORD_RESET_SENDING_SUCCESS = 'PASSWORD_RESET_SENDING_SUCCESS';

export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REGISTER_PROCESSING = 'REGISTER_PROCESSING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_PROCESSING = 'LOGIN_PROCESSING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const LOGOUT_PROCESSING = 'LOGOUT_PROCESSING';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const USER_SUCCESS = 'USER_SUCCESS';
export const AUTH_CHECKED = 'AUTH_CHECKED';

export const STATE_CLEAR = 'STATE_CLEAR';

export const FORM_FAILED = 'FORM_FAILED';

export function login(email, password) {
	return function (dispatch) {
		dispatch({
			type: LOGIN_PROCESSING,
		});
		api.login(dispatch, email, password);
	};
}

export function logout() {
	return function (dispatch) {
		dispatch({
			type: LOGOUT_PROCESSING,
		});
		const token = localStorage.getItem('refreshToken');
		api.logout(dispatch, token ?? '');
	};
}

export function register(email, password, name) {
	return function (dispatch) {
		dispatch({
			type: REGISTER_PROCESSING,
		});
		api.register(dispatch, email, password, name);
	};
}

export function getUser() {
	return function (dispatch) {
		api.getUser(dispatch);
	};
}

export function saveUser(email, name, password) {
	return function (dispatch) {
		dispatch({
			type: PROFILE_CHANGE_PROCESSING,
		});
		api.saveUser(dispatch, email, name, password);
	};
}

export function sendCode(email, navigate) {
	return function (dispatch) {
		dispatch({
			type: PASSWORD_RESET_SENDING_PROCESSING,
		});
		api.sendCode(dispatch, email, navigate);
	};
}

export function setNewPassword(password, code, navigate) {
	return function (dispatch) {
		dispatch({
			type: PASSWORD_RESET_PROCESSING,
		});
		api.setNewPassword(dispatch, password, code, navigate);
	};
}
