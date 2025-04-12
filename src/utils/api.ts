import {
	DOWNLOAD_INGREDIENTS_FAILED,
	DOWNLOAD_INGREDIENTS_SUCCESS,
} from '../services/actions/ingredients';
import {
	DOWNLOAD_INGREDIENT_FAILED,
	DOWNLOAD_INGREDIENT_SUCCESS,
} from '../services/actions/ingredient';
import {
	PASSWORD_RESET_SUCCESS,
	PASSWORD_RESET_PROCESSING,
	FORM_FAILED,
	PASSWORD_RESET_SENDING_SUCCESS,
	REGISTER_SUCCESS,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	AUTH_CHECKED,
	USER_SUCCESS,
} from '../services/actions/auth';
import {
	PROFILE_CHANGE_FAILED,
	PROFILE_CHANGE_SUCCESS,
} from '../services/actions/profile';
import {
	LOAD_CONTENT,
	ORDER_FAILED,
	ORDER_SUCCESS,
} from '../services/actions/order';
import { AppDispatch } from '../services/store';
import { TIngredient, TUser } from './types';
import { NavigateFunction } from 'react-router';

const BURGER_API_URL = 'https://norma.nomoreparties.space';

type TDataRegister = {
	success: boolean;
	message: string;
	accessToken: string;
	refreshToken: string;
	user: TUser;
};

type TLogout = {
	success: boolean;
};

type TSendCode = {
	success: boolean;
};

export const api = {
	sendOrder: function (
		dispatch: AppDispatch,
		ingredientIds: string[],
		elementWithOrderDetails: React.JSX.Element
	) {
		fetchWithRefresh(`${BURGER_API_URL}/api/orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${localStorage.getItem('accessToken')}`,
			},
			body: JSON.stringify({ ingredients: ingredientIds }),
		})
			.then((data) => {
				dispatch({
					type: ORDER_SUCCESS,
					orderInfo: data,
				});
				dispatch({
					type: LOAD_CONTENT,
					modalContent: elementWithOrderDetails,
				});
			})
			.catch((err) => {
				dispatch({
					type: ORDER_FAILED,
				});
				api.logoutSuccess(dispatch);
				console.error(err);
			});
	},
	downloadIngredients: function (dispatch: AppDispatch, id: string | null) {
		fetch(`${BURGER_API_URL}/api/ingredients`)
			.then((res) => {
				if (!res.ok) {
					if (id === null) {
						dispatch({
							type: DOWNLOAD_INGREDIENTS_FAILED,
						});
					} else {
						dispatch({
							type: DOWNLOAD_INGREDIENT_FAILED,
						});
					}
					throw new Error(`Something went wrong: ${res.status}`);
				}
				return res.json();
			})
			.then((ingredients) => {
				if (id) {
					let ingredient = null;
					for (const _id in ingredients.data) {
						if (ingredients.data[_id]._id === id) {
							ingredient = ingredients.data[_id];
						}
					}
					if (ingredient === null) {
						dispatch({
							type: DOWNLOAD_INGREDIENT_FAILED,
							ingredient: null,
						});
					} else {
						dispatch({
							type: DOWNLOAD_INGREDIENT_SUCCESS,
							ingredient: ingredient,
						});
					}
				} else {
					const _ingredients: TIngredient[] = ingredients.data;
					for (const i in _ingredients) {
						_ingredients[i].count = 0;
					}
					dispatch({
						type: DOWNLOAD_INGREDIENTS_SUCCESS,
						ingredients: _ingredients,
					});
				}
			})
			.catch((err) => {
				if (id === null) {
					dispatch({
						type: DOWNLOAD_INGREDIENT_FAILED,
					});
				} else {
					dispatch({
						type: DOWNLOAD_INGREDIENTS_FAILED,
					});
				}
				console.error(err);
			});
	},
	setNewPassword: function (
		dispatch: AppDispatch,
		password: string,
		token: string,
		navigate: NavigateFunction
	) {
		dispatch({
			type: PASSWORD_RESET_PROCESSING,
		});
		request<TRefreshData>(`${BURGER_API_URL}/api/password-reset/reset`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify({ password: password, token: token }),
		})
			.then((res) => {
				if (res.success === true) {
					dispatch({
						type: PASSWORD_RESET_SUCCESS,
					});
					localStorage.removeItem('reset');
					navigate('/login');
					return res;
				} else {
					dispatch({
						type: FORM_FAILED,
						text: 'Error',
					});
				}
			})
			.catch((err) => {
				dispatch({
					type: FORM_FAILED,
					error: err.message,
				});
				console.error(err);
			});
	},
	register: function (
		dispatch: AppDispatch,
		email: string,
		password: string,
		name: string
	) {
		request<TDataRegister>(`${BURGER_API_URL}/api/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify({ email: email, password: password, name: name }),
		})
			.then((res) => {
				if (res.success) {
					dispatch({
						type: REGISTER_SUCCESS,
						user: res.user,
					});
					localStorage.setItem('refreshToken', res.refreshToken);
					localStorage.setItem('accessToken', res.accessToken);
					return res;
				} else {
					const text =
						res.message ??
						'Something went wrong: no success field or it is not true';
					dispatch({
						type: FORM_FAILED,
						error: text,
					});
					throw new Error(text);
				}
			})
			.catch((err) => {
				dispatch({
					type: FORM_FAILED,
					error: err.message,
				});
				console.error(err);
			});
	},
	login: function (dispatch: AppDispatch, email: string, password: string) {
		request<TDataRegister>(`${BURGER_API_URL}/api/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify({ email: email, password: password }),
		})
			.then((res) => {
				if (res.success === true) {
					dispatch({
						type: LOGIN_SUCCESS,
						user: res.user,
					});
					localStorage.setItem('refreshToken', res.refreshToken);
					localStorage.setItem('accessToken', res.accessToken);
					return res;
				} else {
					const text =
						res.message ??
						'Something went wrong: no success field or it is not true';
					dispatch({
						type: FORM_FAILED,
						error: text,
					});
					throw new Error(text);
				}
			})
			.catch((err) => {
				dispatch({
					type: FORM_FAILED,
					error: err.message,
				});
				console.error(err);
			});
	},
	logoutSuccess: function (dispatch: AppDispatch) {
		dispatch({
			type: LOGOUT_SUCCESS,
		});
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
	},
	getUser: function (dispatch: AppDispatch) {
		fetchWithRefresh<TFetchWithRefresh>(`${BURGER_API_URL}/api/auth/user`, {
			method: 'GET',
			headers: {
				Authorization: `${localStorage.getItem('accessToken')}`,
			},
		})
			.then((res) => {
				if (res.success === true) {
					dispatch({
						type: USER_SUCCESS,
						user: res.user,
					});
					return res;
				} else {
					api.logoutSuccess(dispatch);
					throw new Error('Token is old: LOGOUT');
				}
			})
			.catch((err) => {
				api.logoutSuccess(dispatch);
				console.error(err);
			})
			.finally(() => {
				dispatch({ type: AUTH_CHECKED });
			});
	},
	saveUser: function (
		dispatch: AppDispatch,
		email: string | null | undefined,
		name: string | null | undefined,
		password: string | null | undefined
	) {
		const body: TUser = {};
		if (typeof email !== 'undefined' && email !== null) {
			body.email = email;
		}
		if (typeof name !== 'undefined' && name !== null) {
			body.name = name;
		}
		if (typeof password !== 'undefined' && password !== null) {
			body.password = password;
		}
		fetchWithRefresh<TFetchWithRefresh>(`${BURGER_API_URL}/api/auth/user`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: `${localStorage.getItem('accessToken')}`,
			},
			body: JSON.stringify(body),
		})
			.then((res) => {
				if (res.success === true) {
					dispatch({
						type: PROFILE_CHANGE_SUCCESS,
						user: res.user,
					});
					return res;
				} else {
					dispatch({
						type: PROFILE_CHANGE_FAILED,
						user: res.user,
					});
					api.logoutSuccess(dispatch);
				}
			})
			.catch((err) => {
				api.logoutSuccess(dispatch);
				console.error(err);
			});
	},
	sendCode: function (
		dispatch: AppDispatch,
		email: string,
		navigate: NavigateFunction
	) {
		request<TSendCode>(`${BURGER_API_URL}/api/password-reset`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify({ email: email }),
		})
			.then((res) => {
				if (res.success === true) {
					dispatch({
						type: PASSWORD_RESET_SENDING_SUCCESS,
					});
					localStorage.setItem('reset', 'true');
					navigate('/reset-password', { state: { email: email } });
					return res;
				} else {
					dispatch({
						type: FORM_FAILED,
					});
				}
			})
			.catch((err) => {
				dispatch({
					type: FORM_FAILED,
					error: err.message,
				});
				console.error(err);
			});
	},
	logout: function (dispatch: AppDispatch, refreshToken: string) {
		request<TLogout>(`${BURGER_API_URL}/api/auth/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify({ token: refreshToken }),
		})
			.then((res) => {
				if (res.success === true) {
					api.logoutSuccess(dispatch);
				}
				return res;
			})
			.catch((err) => {
				dispatch({
					type: FORM_FAILED,
				});
				console.error(err);
			});
	},
};

const checkResponse = <Param>(res: Response): Promise<Param> => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

type TRefreshData = {
	success: boolean;
	refreshToken: string;
	accessToken: string;
};
export const refreshToken = (): Promise<TRefreshData> => {
	return (
		fetch(`${BURGER_API_URL}/api/auth/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				token: localStorage.getItem('refreshToken'),
			}),
		})
			.then(checkResponse<TRefreshData>)
			// !! Важно для обновления токена в мидлваре, чтобы запись токенов
			// была тут, а не в fetchWithRefresh
			.then(
				(
					refreshData: TRefreshData
				): TRefreshData | PromiseLike<TRefreshData> => {
					if (!refreshData.success) {
						return Promise.reject(refreshData);
					}
					localStorage.setItem('refreshToken', refreshData.refreshToken);
					localStorage.setItem('accessToken', refreshData.accessToken);
					return refreshData;
				}
			)
	);
};

type TFetchWithRefresh = {
	success: boolean;
	message: string;
	user: TUser;
};
type THeader = {
	headers: {
		authorization?: string;
		Authorization?: string;
		'Content-type'?: string;
	};
};

export const fetchWithRefresh = async <P>(
	url: string,
	options: (RequestInit & THeader) | undefined
): Promise<P> => {
	try {
		const res: Response = await fetch(url, options);
		return await checkResponse<P>(res);
	} catch (err) {
		if ((err as Error).message === 'jwt expired') {
			const refreshData = await refreshToken(); //обновляем токен
			if (typeof options !== 'undefined') {
				options.headers.authorization = refreshData.accessToken;
			}
			const res = await fetch(url, options); //повторяем запрос
			return await checkResponse<P>(res);
		} else {
			return Promise.reject(err);
		}
	}
};

function request<TRequest>(
	url: string,
	options: (RequestInit & THeader) | undefined
): Promise<TRequest> {
	// принимает два аргумента: урл и объект опций, как и `fetch`
	return fetch(url, options).then(checkResponse<TRequest>);
}
