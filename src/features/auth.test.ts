import reducer, { initialState, setUser, logout, authChecked } from './auth';
import { describe, expect, test } from '@jest/globals';

describe('testing slice auth', () => {
	test('should return the initial state', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	test('should add user info to state via reducer method setUser', () => {
		const user = {
			email: 'test@test.com',
			name: 'test',
		};
		expect(reducer(undefined, setUser({ user }))).toEqual({
			...initialState,
			user,
		});
	});

	test('should set authChecked to true via reducer method authChecked', () => {
		expect(reducer(undefined, authChecked())).toEqual({
			...initialState,
			isAuthChecked: true,
		});
	});

	test('should remove user, making it equal to null via reducer method logout', () => {
		expect(reducer(undefined, logout())).toEqual({
			...initialState,
			user: null,
		});
	});
});
