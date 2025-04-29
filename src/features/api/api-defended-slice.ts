import { TOrder, TUser } from '../types/types';

import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { logout as logoutAuth } from '../auth';

type TRefreshData = {
	success: boolean;
	refreshToken: string;
	accessToken: string;
};

const reducerPath = 'api-defended';

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://norma.nomoreparties.space/api',
	prepareHeaders(headers) {
		const token = localStorage.getItem('accessToken');

		if (token) {
			headers.set('authorization', token);
		}

		return headers;
	},
});
let isRefreshing = false;
const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const { dispatch, getState } = api;
	if (
		!localStorage.getItem('accessToken') &&
		!localStorage.getItem('refreshToken')
	) {
		dispatch(logoutAuth());
		return {
			error: { status: 401, data: { message: 'no tokens, need auth' } },
		};
	}

	let result = await baseQuery(args, api, extraOptions);
	console.log('result', result);
	if (
		result.error &&
		result.error.data &&
		(
			result.error.data as {
				message: string;
			}
		).message &&
		(
			result.error.data as {
				message: string;
			}
		).message === 'jwt expired'
	) {
		if (!isRefreshing) {
			isRefreshing = true; // Indicate refresh is in progress
			const refreshPromise = Promise.resolve(
				baseQuery(
					{
						url: '/auth/token',
						method: 'POST',
						headers: {
							'Content-Type': 'application/json;charset=utf-8',
						},
						body: JSON.stringify({
							token: localStorage.getItem('refreshToken'),
						}),
					},
					api,
					extraOptions
				)
			)
				.then((refreshResult) => {
					console.log('refresh');
					if (refreshResult.data) {
						const refreshTokenResult = refreshResult.data as TRefreshData;

						// Store the new tokens
						localStorage.setItem('accessToken', refreshTokenResult.accessToken);
						localStorage.setItem(
							'refreshToken',
							refreshTokenResult.refreshToken
						);
						isRefreshing = false;
						return refreshTokenResult;
					} else {
						localStorage.removeItem('accessToken');
						localStorage.removeItem('refreshToken');
						isRefreshing = false;
						if (refreshResult?.error) {
							return refreshResult?.error;
						}
						return null;
					}
				})
				.catch((error: Error) => {
					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
					console.error('Error refreshing token', error);
					isRefreshing = false; // Reset flag on error
				});
			await refreshPromise; // Wait for the refresh token request to complete
		}
		result = await baseQuery(args, api, extraOptions); // Retry the initial query
	}

	return result;
};

export const apiDefendedSlice = createApi({
	reducerPath,
	baseQuery: baseQueryWithReauth,
	endpoints(create) {
		return {
			order: create.mutation<
				string | TOrder,
				{
					ingredients: string[];
				}
			>({
				query: (q: { ingredients: string[] }) => {
					return {
						url: '/orders',
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(q),
					};
				},
			}),
			listOrders: create.query<TOrder[], void>({
				query: () => '/orders/list',
			}),
			getUser: create.query<{ success: boolean; user: TUser }, void>({
				query: () => {
					return {
						url: '/auth/user',
						method: 'GET',
					};
				},
				keepUnusedDataFor: 30,
			}),
			saveUser: create.mutation<
				{ success: boolean; message?: string; user: TUser },
				TUser
			>({
				query: (q: TUser) => {
					return {
						url: '/auth/user',
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(q),
					};
				},
			}),
		};
	},
});
