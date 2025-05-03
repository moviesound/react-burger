import {
	BaseQueryArg,
	createApi,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {
	IOrdersList,
	TIngredient,
	TUser,
	WebSocketResponse,
} from '../types/types';
import { loadOrders, loadPrivateOrders } from '../order';
import { AppDispatch } from '../../app/store-types';
import { logout as logoutAuth } from '../auth';
import orderSlice from '../order';

const baseUrl = 'https://norma.nomoreparties.space/api';
type TRefreshData = {
	success: boolean;
	refreshToken: string;
	accessToken: string;
};

const checkResponse = <Param>(res: Response): Promise<Param> => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const refreshToken = (): Promise<TRefreshData> => {
	return (
		fetch(`${baseUrl}/auth/token`, {
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

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl,
		/*prepareHeaders(headers) {
			return headers;
		},*/
	}),
	endpoints(create) {
		return {
			getIngredients: create.query<{ data: TIngredient[] }, void>({
				query: () => '/ingredients',
			}),

			logout: create.query<{ success: boolean }, void>({
				query: () => ({
					method: 'POST',
					url: '/auth/logout',
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
					},
					body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
				}),
			}),
			setNewPassword: create.query<
				{ success: boolean },
				{ password: string; token: string }
			>({
				query: (body: { password: string; token: string }) => ({
					method: 'POST',
					url: '/password-reset/reset',
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
					},
					body: JSON.stringify(body),
				}),
			}),
			login: create.query<
				{
					success: boolean;
					refreshToken?: string;
					accessToken?: string;
					user: TUser;
				},
				{ email: string; password: string }
			>({
				query: (body: { email: string; password: string }) => ({
					method: 'POST',
					url: '/auth/login',
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
					},
					body: JSON.stringify(body),
				}),
			}),

			getResetCode: create.query<{ success: boolean }, string>({
				query: (email: string) => ({
					url: '/password-reset',
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
					},
					body: JSON.stringify({ email: email }),
				}),
			}),

			register: create.query<
				{
					success: boolean;
					refreshToken?: string;
					accessToken?: string;
					user: TUser;
				},
				{ email: string; password: string; name: string }
			>({
				query: (body: { email: string; password: string }) => ({
					method: 'POST',
					url: '/auth/register',
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
					},
					body: JSON.stringify(body),
				}),
			}),
			getOrders: create.query<string, void>({
				queryFn: () => ({
					data: '',
				}),
				async onCacheEntryAdded(
					data,
					{
						cacheDataLoaded,
						cacheEntryRemoved,
						dispatch /*, updateCachedData*/,
					}
				) {
					try {
						await cacheDataLoaded;
						connect(dispatch);
						await cacheEntryRemoved;
					} catch {
						// if cacheEntryRemoved resolved before cacheDataLoaded,
						// cacheDataLoaded throws
						//console.error('cacheDataLoaded error');
					}
				},
			}),
			getPrivateOrders: create.query<string, void>({
				queryFn: () => ({
					data: '',
				}),
				async onCacheEntryAdded(
					data,
					{
						cacheDataLoaded,
						cacheEntryRemoved,
						dispatch,
						/*, updateCachedData*/
					}
				) {
					try {
						await cacheDataLoaded;
						connectPrivate(dispatch);
						await cacheEntryRemoved;
					} catch {
						// if cacheEntryRemoved resolved before cacheDataLoaded,
						// cacheDataLoaded throws
						//console.error('cacheDataLoaded error');
					}
				},
			}),
			getOrderInfo: create.query<
				{ success: boolean; orders: IOrdersList[] },
				number | string
			>({
				query: (number: number | string) => '/orders/' + number,
			}),
		};
	},
});

function connect(dispatch: AppDispatch) {
	const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all');

	ws.onmessage = function (event: MessageEvent<string>) {
		dispatch(loadOrders({ orders: JSON.parse(event.data) }));
	};

	ws.onclose = function (event: CloseEvent) {
		if (event.wasClean) {
			/*console.error(
				`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
			);*/
		} else {
			// например, сервер убил процесс или сеть недоступна
			// обычно в этом случае event.code 1006
			//console.error('[close] Соединение прервано');
		}
		setTimeout(function () {
			connect(dispatch);
		}, 1000);
	};

	ws.onerror = function (error: Event) {
		//console.error(`Socket encountered error: [${error}] Closing socket`);
		ws.close();
	};
}

async function connectPrivate(dispatch: AppDispatch) {
	const ws = new WebSocket(
		'wss://norma.nomoreparties.space/orders?token=' +
			localStorage.getItem('accessToken')?.replace('Bearer ', '')
	);
	(window as any).myws = ws;
	ws.onmessage = function (event: MessageEvent<string>) {
		const data: WebSocketResponse<IOrdersList> | undefined = JSON.parse(
			event.data
		);
		if (data && data.success && data.success === true) {
			dispatch(loadPrivateOrders({ orders: data }));
		} else if (
			data &&
			data.success === false &&
			data?.message === 'Invalid or missing token'
		) {
			if (
				!localStorage.getItem('accessToken') &&
				!localStorage.getItem('refreshToken')
			) {
				dispatch(logoutAuth());
				return {
					error: { status: 401, data: { message: 'no tokens, need auth' } },
				};
			}

			refreshToken().then((refreshData) => {
				if (refreshData.success && refreshData.accessToken) {
					localStorage.setItem('accessToken', refreshData.accessToken);
				} else {
					dispatch(logoutAuth());
				}
			});
		} else {
			ws.close();
		}
	};

	ws.onclose = function (event: CloseEvent) {
		if (event.wasClean) {
			/*console.error(
				`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
			);*/
		} else {
			// например, сервер убил процесс или сеть недоступна
			// обычно в этом случае event.code 1006
			//console.error('[close] Соединение прервано');
		}
		setTimeout(function () {
			connectPrivate(dispatch);
		}, 1000);
	};

	ws.onerror = function (error: Event) {
		//console.error(`Socket encountered error: [${error}] Closing socket`);
		ws.close();
	};
}
