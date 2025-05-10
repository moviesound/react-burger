import reducer, {
	initialState,
	addIngredientCount,
	removeIngredientCount,
	loadIngredients,
} from './ingredients';
import { describe, expect, test } from '@jest/globals';
import { TIngredient } from './types/types';
import { ingredients } from '../fixtures/ingredients.mock';

describe('testing slice ingredients', () => {
	test('should save all loaded from rtk query ingredients in state', () => {
		expect(reducer(undefined, loadIngredients({ ingredients }))).toEqual({
			...initialState,
			ingredients,
		});
	});

	test('should add counter +1 for ingredient', () => {
		const state = { ...initialState, ingredients };
		let index: number | null = null;
		const ingredient: TIngredient = ingredients.filter((ingredient, iter) => {
			if (ingredient.type !== 'bun') {
				if (index === null) {
					index = iter;
				}
				return true;
			}
			return false;
		})[0];

		const newIngredients = ingredients.map((ingredient, iter) => {
			if (iter === index) {
				ingredient = { ...ingredient, count: 1 };
			}
			return ingredient;
		});
		expect(reducer(state, addIngredientCount({ ingredient }))).toEqual({
			...state,
			ingredients: newIngredients,
		});
	});

	test('should add counter +2 for bun', () => {
		const state = { ...initialState, ingredients };
		let index: number | null = null;
		const bun: TIngredient = ingredients.filter((ingredient, iter) => {
			if (ingredient.type === 'bun') {
				if (index === null) {
					index = iter;
				}
				return true;
			}
			return false;
		})[0];

		const newIngredients = ingredients.map((ingredient, iter) => {
			if (iter === index) {
				ingredient = { ...ingredient, count: 2 };
			}
			return ingredient;
		});
		expect(
			reducer(state, addIngredientCount({ ingredient: bun, type: 'bun' }))
		).toEqual({
			...state,
			ingredients: newIngredients,
		});
	});

	test('should decrease counter -1 for ingredient', () => {
		let index: number | null = null;
		const ingredient: TIngredient = ingredients.filter((ingredient, iter) => {
			if (ingredient.type !== 'bun') {
				if (index === null) {
					index = iter;
				}
				return true;
			}
			return false;
		})[0];

		const oldIngredients = ingredients.map((ingredient, iter) => {
			if (iter === index) {
				ingredient = { ...ingredient, count: 1 };
			}
			return ingredient;
		});
		const state = { ...initialState, ingredients: oldIngredients };

		const newIngredients = ingredients.map((ingredient, iter) => {
			if (iter === index) {
				ingredient = { ...ingredient, count: 0 };
			}
			return ingredient;
		});
		expect(reducer(state, removeIngredientCount({ ingredient }))).toEqual({
			...state,
			ingredients: newIngredients,
		});
	});
});
