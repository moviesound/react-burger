import reducer, {
	initialState,
	hideModal,
	showModal,
	showPopupModal,
	hidePopupModal,
} from './modal';
import { describe, expect, test } from '@jest/globals';
import { TIngredient } from './types/types';
import { ingredients } from '../fixtures/ingredients.mock';

describe('testing slice modal', () => {
	test('should remove modal info', () => {
		const state = {
			...initialState,
			modalType: 'x',
			modalContent: { type: 'x', content: 'x' },
			modalHeader: 'x',
		};
		expect(reducer(state, hideModal())).toEqual({ ...initialState });
	});

	test('should add modal info', () => {
		const modalData = {
			modalType: 'x',
			modalContent: { type: 'x', content: 'x' },
			modalHeader: 'x',
		};
		const state = {
			...initialState,
			modalType: 'x',
			modalContent: { type: 'x', content: 'x' },
			modalHeader: 'x',
		};
		expect(reducer(initialState, showModal(modalData))).toEqual({ ...state });
	});

	test('should mark popup to be shown', () => {
		expect(reducer(initialState, showPopupModal())).toEqual({
			...initialState,
			modalIsVisible: true,
		});
	});

	test('should mark popup to be hidden', () => {
		const state = {
			...initialState,
			modalIsVisible: true,
		};
		expect(reducer(state, hidePopupModal())).toEqual(initialState);
	});
});
