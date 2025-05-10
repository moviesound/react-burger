import reducer, {
	initialState,
	addBunToConstructor,
	addIngredientToConstructor,
	removeIngredientFromConstructor,
	countSum,
	sortIngredients,
} from './constructor';
import { describe, expect, test } from '@jest/globals';
import { TIngredient } from './types/types';
import { ingredients } from '../fixtures/ingredients.mock';

describe('testing slice constructor', () => {
	test('should add bun to constructor', () => {
		const bun: TIngredient = ingredients.filter(
			(ingredient) => ingredient.type === 'bun'
		)[0];
		expect(reducer(undefined, addBunToConstructor({ bun }))).toEqual({
			...initialState,
			bun,
			bunWasAdded: true,
		});
	});

	test('should add ingredient to constructor without been added ingredients', () => {
		const ingredient: TIngredient = ingredients.filter(
			(ingredient) => ingredient.type !== 'bun'
		)[0];
		expect(
			reducer(undefined, addIngredientToConstructor({ ingredient }))
		).toEqual({
			...initialState,
			ingredientList: [ingredient],
		});
	});

	test('should add ingredient to constructor with already been added ingredients', () => {
		const ingredientAdded: TIngredient = ingredients.filter(
			(ingredient) => ingredient.type !== 'bun'
		)[0];
		const ingredientNew: TIngredient = ingredients.filter(
			(ingredient) => ingredient.type !== 'bun'
		)[1];
		const state = { ...initialState, ingredientList: [ingredientAdded] };
		expect(
			reducer(state, addIngredientToConstructor({ ingredient: ingredientNew }))
		).toEqual({
			...state,
			ingredientList: [ingredientAdded, ingredientNew],
		});
	});

	test('should remove ingredients from constructor', () => {
		const ingredientAdded1: TIngredient = ingredients.filter(
			(ingredient) => ingredient.type !== 'bun'
		)[0];
		const ingredientAdded2: TIngredient = ingredients.filter(
			(ingredient) => ingredient.type !== 'bun'
		)[1];
		const state = {
			...initialState,
			ingredientList: [ingredientAdded1, ingredientAdded2],
		};
		const newState = {
			...state,
			ingredientList: [ingredientAdded2],
		};
		expect(
			reducer(
				state,
				removeIngredientFromConstructor({
					ingredient: ingredientAdded1,
					index: 0,
				})
			)
		).toEqual(newState);

		expect(
			reducer(
				newState,
				removeIngredientFromConstructor({
					ingredient: ingredientAdded2,
					index: 0,
				})
			)
		).toEqual({
			...newState,
			ingredientList: [],
		});
	});

	test('should count sum of ingredients from constructor without buns', () => {
		const ingredientAdded1 = ingredients.filter(
			(ingredient: TIngredient) => ingredient.type !== 'bun'
		)[0];
		const ingredientAdded2 = ingredients.filter(
			(ingredient: TIngredient) => ingredient.type !== 'bun'
		)[1];
		const state = {
			...initialState,
			ingredientList: [
				{ ...ingredientAdded1, price: 10 },
				{ ...ingredientAdded2, price: 20 },
			],
		};
		expect(reducer(state, countSum())).toEqual({
			...state,
			sum: 10 + 20,
		});
	});

	test('should count sum of buns in constructor without ingredients', () => {
		const bun = ingredients.filter(
			(ingredient) => ingredient.type === 'bun'
		)[0];
		const state = {
			...initialState,
			bun: { ...bun, price: 10 },
			bunWasAdded: true,
		};
		expect(reducer(state, countSum())).toEqual({
			...state,
			sum: 10 * 2 /*two buns*/,
		});
	});

	test('should count sum of buns and ingredients in constructor', () => {
		const ingredientAdded1 = ingredients.filter(
			(ingredient) => ingredient.type !== 'bun'
		)[0];
		const ingredientAdded2 = ingredients.filter(
			(ingredient) => ingredient.type !== 'bun'
		)[1];
		const bun = ingredients.filter(
			(ingredient) => ingredient.type === 'bun'
		)[0];
		const state = {
			...initialState,
			ingredientList: [
				{ ...ingredientAdded1, price: 10 },
				{ ...ingredientAdded2, price: 20 },
			],
			bun: { ...bun, price: 15 },
			bunWasAdded: true,
		};
		expect(reducer(state, countSum())).toEqual({
			...state,
			sum: 10 + 20 + 15 * 2,
		});
	});

	test('should save new list of ingredients after sorting in component after dragging', () => {
		const ingredientList = ingredients.filter(
			(ingredient: TIngredient) => ingredient.type !== 'bun'
		);
		expect(
			reducer(undefined, sortIngredients({ ingredients: ingredientList }))
		).toEqual({
			...initialState,
			ingredientList,
		});
	});
});
