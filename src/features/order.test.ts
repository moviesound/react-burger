import reducer, {
	initialState,
	addBunToOrder,
	addIngredientToOrder,
	removeIngredientFromOrder,
	sortIngredients,
	addOrderInfo,
	loadOrders,
	loadPrivateOrders,
	showOrderInfo,
} from './order';
import { ingredients } from '../fixtures/ingredients.mock';
import { describe, expect, test } from '@jest/globals';
import { TIngredient, TOrder } from './types/types';
import { ordersList } from '../fixtures/orders.mock';

describe('testing slice order', () => {
	test('should return the initial state', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	test('should add bun to order with no ingredients', () => {
		const randomBun: TIngredient = ingredients.filter(
			(ingredient) => ingredient.type === 'bun'
		)[0];
		expect(reducer(undefined, addBunToOrder({ bun: randomBun }))).toEqual({
			...initialState,
			bunWasAdded: randomBun._id,
			orderIngredients: [randomBun._id, randomBun._id],
		});
	});

	test('should add bun to order with already added ingredient', () => {
		const randomBun: TIngredient = ingredients.filter(
			(ingredient) => ingredient.type === 'bun'
		)[0];
		const bunIds: string[] = ingredients.map((ingredient) =>
			ingredient.type === 'bun' ? ingredient._id : ''
		);
		const ingredient: TIngredient = ingredients.filter(
			(ingredient) => ingredient.type !== 'bun'
		)[0];
		expect(
			reducer(
				{
					...initialState,
					orderIngredients: [ingredient._id],
				},
				addBunToOrder({ bun: randomBun, bunIds })
			)
		).toEqual({
			...initialState,
			bunWasAdded: randomBun._id,
			orderIngredients: [randomBun._id, ingredient._id, randomBun._id],
		});
	});

	test('should save order info', () => {
		const orderInfo: TOrder = {
			success: true,
			name: 'Order of special burger',
			order: {
				_id: 'xxx',
				owner: {
					name: 'name',
					email: 'test@test.com',
					createdAt: '1',
					updatedAt: '1',
				},
				status: 'success',
				name: 'Order of special burger',
				createdAt: '1',
				updatedAt: '1',
				number: 1,
				price: 1,
				ingredients,
			},
		};
		expect(reducer(undefined, addOrderInfo({ orderInfo }))).toEqual({
			...initialState,
			order: orderInfo,
		});
	});

	test('should add ingredient to order with no buns', () => {
		const ingredient: TIngredient = ingredients.filter(
			(ingredient) => ingredient.type !== 'bun'
		)[0];

		expect(reducer(undefined, addIngredientToOrder({ ingredient }))).toEqual({
			...initialState,
			orderIngredients: [ingredient._id],
		});
	});

	test('should add ingredient to order with buns', () => {
		const ingredient: TIngredient = ingredients.filter(
			(ingredient) => ingredient.type !== 'bun'
		)[0];
		const bun: TIngredient = ingredients.filter(
			(ingredient) => ingredient.type === 'bun'
		)[0];
		const state = {
			...initialState,
			orderIngredients: [bun._id, bun._id],
			bunWasAdded: bun._id,
		};

		expect(reducer(state, addIngredientToOrder({ ingredient }))).toEqual({
			...state,
			orderIngredients: [bun._id, ingredient._id, bun._id],
		});
	});

	test('should remove ingredient of index [1] from order with buns and 2 ingredients', () => {
		const ingredientList: TIngredient[] = ingredients.filter(
			(ingredient) => ingredient.type !== 'bun'
		);
		const bun: TIngredient = ingredients.filter(
			(ingredient) => ingredient.type === 'bun'
		)[0];
		const state = {
			...initialState,
			orderIngredients: [
				bun._id,
				ingredientList[0]._id,
				ingredientList[1]._id,
				bun._id,
			],
			bunWasAdded: bun._id,
		};
		expect(
			reducer(
				state,
				removeIngredientFromOrder({ ingredient: ingredientList[1], index: 1 })
			)
		).toEqual({
			...state,
			orderIngredients: [bun._id, ingredientList[0]._id, bun._id],
		});
	});

	test('should remove ingredient of index [1] from order with no buns and 2 ingredients', () => {
		const ingredientList: TIngredient[] = ingredients.filter(
			(ingredient) => ingredient.type !== 'bun'
		);
		const state = {
			...initialState,
			orderIngredients: [ingredientList[0]._id, ingredientList[1]._id],
		};
		expect(
			reducer(
				state,
				removeIngredientFromOrder({ ingredient: ingredientList[1], index: 1 })
			)
		).toEqual({
			...state,
			orderIngredients: [ingredientList[0]._id],
		});
	});

	test('should save sorted ingredients without bun after dragging', () => {
		const ingredientList: TIngredient[] = ingredients.filter(
			(ingredient) => ingredient.type !== 'bun'
		);
		const ingredientIds: string[] = ingredientList.map(
			(ingredient) => ingredient._id
		);
		expect(
			reducer(undefined, sortIngredients({ ingredients: ingredientList }))
		).toEqual({
			...initialState,
			orderIngredients: ingredientIds,
		});
	});

	test('should save sorted ingredients with buns after dragging', () => {
		const ingredientList: TIngredient[] = ingredients.filter(
			(ingredient) => ingredient.type !== 'bun'
		);
		const bun: TIngredient = ingredients.filter(
			(ingredient) => ingredient.type === 'bun'
		)[0];
		const state = {
			...initialState,
			bunWasAdded: bun._id,
		};
		const ingredientIds: string[] = ingredientList.map(
			(ingredient) => ingredient._id
		);
		expect(
			reducer(state, sortIngredients({ ingredients: ingredientList }))
		).toEqual({
			...state,
			orderIngredients: [bun._id, ...ingredientIds, bun._id],
		});
	});

	test('should save common orders list', () => {
		//loadOrders
		const orders = ordersList;
		const total = 10;
		const totalToday = 5;
		expect(
			reducer(
				undefined,
				loadOrders({ orders: { orders, totalToday, total, success: true } })
			)
		).toEqual({
			...initialState,
			orders,
			todayOrdersCount: totalToday,
			totalOrdersCount: total,
		});
	});

	test("should save private user's orders list", () => {
		//loadOrders
		const privateOrders = ordersList;
		const total = 10;
		const totalToday = 5;
		expect(
			reducer(
				undefined,
				loadPrivateOrders({
					orders: { orders: privateOrders, totalToday, total, success: true },
				})
			)
		).toEqual({
			...initialState,
			privateOrders: privateOrders,
		});
	});

	test('should save order info for modal window', () => {
		const orderModalInfo = ordersList[0];
		expect(
			reducer(
				undefined,
				showOrderInfo({
					orderModalInfo,
				})
			)
		).toEqual({
			...initialState,
			orderModalInfo,
		});
	});
});
