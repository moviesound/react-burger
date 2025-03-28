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
	PASSWORD_RESET_FAILED,
	PASSWORD_RESET_SENDING_SUCCESS,
	PASSWORD_RESET_SENDING_FAILED,
	PASSWORD_RESET_SENDING_PROCESSING,
	REGISTER_FAILED,
	REGISTER_SUCCESS,
	LOGIN_FAILED,
	LOGIN_SUCCESS,
	LOGOUT_FAILED,
	LOGOUT_SUCCESS,
	AUTH_CHECKED,
	USER_SUCCESS,
} from '../services/actions/auth';
import {
	PROFILE_CHANGE_FAILED,
	PROFILE_CHANGE_SUCCESS,
} from '../services/actions/profile';
import OrderDetails from '../components/modal/order-details/order-details';
import {
	LOAD_CONTENT,
	ORDER_FAILED,
	ORDER_SUCCESS,
} from '../services/actions/order';

const BURGER_API_URL = 'https://norma.nomoreparties.space';

export const api = {
	sendOrder: function (dispatch, ingredientIds) {
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
					modalContent: <OrderDetails />,
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
	downloadIngredients: function (dispatch, id = null) {
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
					dispatch({
						type: DOWNLOAD_INGREDIENTS_SUCCESS,
						ingredients: { ...ingredients, ingredients: ingredients.data },
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
	setNewPassword: function (dispatch, password, token, navigate) {
		dispatch({
			type: PASSWORD_RESET_PROCESSING,
		});
		fetch(`${BURGER_API_URL}/api/password-reset/reset`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify({ password: password, token: token }),
		})
			.then((res) => {
				if (!res.ok) {
					const text = `Something went wrong: ${res.status}`;
					dispatch({
						type: PASSWORD_RESET_FAILED,
						error: text,
					});
					//throw new Error(text);
				}
				return res.json();
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
						type: PASSWORD_RESET_FAILED,
						text: 'Error',
					});
				}
			})
			.catch((err) => {
				dispatch({
					type: PASSWORD_RESET_FAILED,
					error: err.message,
				});
				console.error(err);
			});
	},
	register: function (dispatch, email, password, name) {
		fetch(`${BURGER_API_URL}/api/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify({ email: email, password: password, name: name }),
		})
			.then((res) => {
				if (!res.ok) {
					const text = `Something went wrong: ${res.status}`;
					dispatch({
						type: REGISTER_FAILED,
						error: text,
					});
					//throw new Error(text);
				}
				return res.json();
			})
			.then((res) => {
				if (res.success === true) {
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
						`Something went wrong: no success field or it is not true`;
					dispatch({
						type: REGISTER_FAILED,
						error: text,
					});
					throw new Error(text);
				}
			})
			.catch((err) => {
				dispatch({
					type: REGISTER_FAILED,
					error: err.message,
				});
				console.error(err);
			});
	},
	login: function (dispatch, email, password) {
		fetch(`${BURGER_API_URL}/api/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify({ email: email, password: password }),
		})
			.then((res) => {
				if (!res.ok) {
					const text = `Something went wrong: ${res.status}`;
					dispatch({
						type: LOGIN_FAILED,
						error: text,
					});
					//throw new Error(text);
				}
				return res.json();
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
						type: LOGIN_FAILED,
						error: text,
					});
					throw new Error(text);
				}
			})
			.catch((err) => {
				dispatch({
					type: LOGIN_FAILED,
					error: err.message,
				});
				console.error(err);
			});
	},
	logoutSuccess: function (dispatch) {
		dispatch({
			type: LOGOUT_SUCCESS,
		});
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
	},
	getUser: function (dispatch) {
		fetchWithRefresh(`${BURGER_API_URL}/api/auth/user`, {
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
	saveUser: function (dispatch, email, name, password) {
		let body = {};
		if (email !== null) {
			body.email = email;
		}
		if (name !== null) {
			body.name = name;
		}
		if (password !== null) {
			body.password = password;
		}
		fetchWithRefresh(`${BURGER_API_URL}/api/auth/user`, {
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
				dispatch({
					type: PROFILE_CHANGE_FAILED,
					user: res.user,
				});
				api.logoutSuccess(dispatch);
				console.error(err);
			});
	},
	sendCode: function (dispatch, email, navigate) {
		fetch(`${BURGER_API_URL}/api/password-reset`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify({ email: email }),
		})
			.then((res) => {
				if (!res.ok) {
					const text = `Something went wrong: ${res.status}`;
					dispatch({
						type: PASSWORD_RESET_SENDING_FAILED,
						error: text,
					});
					//throw new Error(text);
				}
				return res.json();
			})
			.then((res) => {
				if (res.success === true) {
					dispatch({
						type: PASSWORD_RESET_SENDING_SUCCESS,
					});
					localStorage.setItem('reset', true);
					navigate('/reset-password', { state: { email: email } });
					return res;
				} else {
					dispatch({
						type: PASSWORD_RESET_SENDING_FAILED,
					});
				}
			})
			.catch((err) => {
				dispatch({
					type: PASSWORD_RESET_SENDING_FAILED,
					error: err.message,
				});
				console.error(err);
			});
	},
	logout: function (dispatch, refreshToken) {
		fetch(`${BURGER_API_URL}/api/auth/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify({ token: refreshToken }),
		})
			.then((res) => {
				if (!res.ok) {
					dispatch({
						type: LOGOUT_FAILED,
					});
					throw new Error(`Something went wrong: ${res.status}`);
				}
				return res.json();
			})
			.then((res) => {
				if (res.success === true) {
					api.logoutSuccess(dispatch);
				}
				return res;
			})
			.catch((err) => {
				dispatch({
					type: LOGOUT_FAILED,
				});
				console.error(err);
			});
	},
};

const checkReponse = (res) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
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
			.then(checkReponse)
			// !! Важно для обновления токена в мидлваре, чтобы запись токенов
			// была тут, а не в fetchWithRefresh
			.then((refreshData) => {
				if (!refreshData.success) {
					return Promise.reject(refreshData);
				}
				localStorage.setItem('refreshToken', refreshData.refreshToken);
				localStorage.setItem('accessToken', refreshData.accessToken);
				return refreshData;
			})
	);
};

export const fetchWithRefresh = async (url, options) => {
	try {
		const res = await fetch(url, options);
		return await checkReponse(res);
	} catch (err) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken(); //обновляем токен
			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(url, options); //повторяем запрос
			return await checkReponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};
