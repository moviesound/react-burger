import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TIngredient, TUser } from '../types/types';

const baseUrl = 'https://norma.nomoreparties.space/api';
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
		};
	},
});
