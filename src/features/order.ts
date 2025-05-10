import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	TIngredient,
	TOrder,
	IOrdersList,
	WebSocketResponse,
} from './types/types';

interface IOrderState {
	order?: TOrder;
	orders?: Array<IOrdersList>;
	privateOrders?: Array<IOrdersList>;
	orderIngredients?: Array<string>;
	bunWasAdded: false | string;
	totalOrdersCount: number;
	todayOrdersCount: number;
	isRefreshing: boolean;
	orderModalInfo: IOrdersList | null;
}

interface IOrderActions {
	ingredient?: TIngredient;
	ingredients?: TIngredient[];
	bun?: TIngredient;
	bunIds?: Array<string>;
	index?: number;
	orderInfo?: TOrder;
	orderModalInfo?: IOrdersList | null;
	orders?: WebSocketResponse<IOrdersList>;
	privateOrders?: WebSocketResponse<IOrdersList>;
	total?: number;
	totalToday?: number;
	isRefreshing?: boolean;
}

export const initialState: IOrderState = {
	order: undefined,
	orderIngredients: undefined,
	bunWasAdded: false,
	totalOrdersCount: 0,
	todayOrdersCount: 0,
	isRefreshing: false,
	orderModalInfo: null,
};

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		addOrderInfo(state, action: PayloadAction<IOrderActions>) {
			state.order = action.payload.orderInfo;
		},
		addBunToOrder(state, action: PayloadAction<IOrderActions>) {
			if (typeof action.payload.bun !== 'undefined') {
				state.bunWasAdded = action.payload.bun._id;

				if (typeof state.orderIngredients !== 'undefined') {
					state.orderIngredients = [
						action.payload.bun._id, //first element must be bun
						...state.orderIngredients.filter(
							(item: string): boolean =>
								action.payload.bunIds
									? !action.payload.bunIds.includes(item)
									: false //ingredients
						),
						action.payload.bun._id, //last element must be bun
					];
				} else {
					state.orderIngredients = [
						action.payload.bun._id, //first element must be bun
						action.payload.bun._id, //last element must be bun
					];
				}
			}
		},
		addIngredientToOrder(state, action: PayloadAction<IOrderActions>) {
			if (typeof action.payload.ingredient !== 'undefined') {
				let newArray: Array<string> = [];
				if (typeof state.orderIngredients !== 'undefined') {
					newArray = [...state.orderIngredients, action.payload.ingredient._id];
				} else {
					newArray = [action.payload.ingredient._id];
				}

				if (newArray.length > 2) {
					if (state.bunWasAdded !== false) {
						const ingredientId: string = newArray[newArray.length - 1];
						newArray[newArray.length - 1] = newArray[newArray.length - 2];
						newArray[newArray.length - 2] = ingredientId;
					}
				}
				state.orderIngredients = newArray;
			}
		},
		removeIngredientFromOrder(state, action: PayloadAction<IOrderActions>) {
			if (typeof state.orderIngredients !== 'undefined') {
				state.orderIngredients = state.orderIngredients.filter(
					(item, index) => {
						if (
							typeof action.payload.ingredient !== 'undefined' &&
							typeof action.payload.index !== 'undefined'
						) {
							return (
								item !== action.payload.ingredient._id ||
								index !==
									action.payload.index + (state.bunWasAdded === false ? 0 : 1)
							);
						}
						return false;
					}
				);
			}
		},
		sortIngredients(state, action: PayloadAction<IOrderActions>) {
			if (typeof action.payload.ingredients !== 'undefined') {
				state.orderIngredients =
					state.bunWasAdded !== false
						? [
								//have buns
								state.bunWasAdded, //first element must be bun
								...action.payload.ingredients.map(
									(item: TIngredient) => item._id //ingredients
								),
								state.bunWasAdded, //last element must be bun
						  ]
						: [
								//no buns, only ingredients
								...action.payload.ingredients.map(
									(item: TIngredient) => item._id //ingredients
								),
						  ];
			}
		},
		loadOrders(state, action: PayloadAction<IOrderActions>) {
			state.orders = action.payload.orders?.orders;
			state.todayOrdersCount = action.payload.orders?.totalToday ?? 0;
			state.totalOrdersCount = action.payload.orders?.total ?? 0;
		},
		loadPrivateOrders(state, action: PayloadAction<IOrderActions>) {
			state.privateOrders = action.payload.orders?.orders;
		},
		showOrderInfo(state, action: PayloadAction<IOrderActions>) {
			if (action.payload.orderModalInfo) {
				state.orderModalInfo = action.payload.orderModalInfo;
			}
		},
	},
});

export const {
	addBunToOrder,
	addIngredientToOrder,
	removeIngredientFromOrder,
	sortIngredients,
	addOrderInfo,
	loadOrders,
	loadPrivateOrders,
	showOrderInfo,
} = orderSlice.actions;

export default orderSlice.reducer;
