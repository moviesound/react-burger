import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from './types/types';

interface IConstructorState {
	ingredientList: TIngredient[];
	bun: TIngredient | undefined;
	sum: number;
	bunWasAdded: boolean;
}

interface IConstructorActions {
	bun?: TIngredient;
	ingredient?: TIngredient;
	id?: number | string;
	index?: number | string;
	ingredients?: TIngredient[];
}

const initialState: IConstructorState = {
	ingredientList: [],
	bun: undefined,
	sum: 0,
	bunWasAdded: false,
};

const constructorSlice = createSlice({
	name: 'constructor',
	initialState,
	reducers: {
		addBunToConstructor(state, action: PayloadAction<IConstructorActions>) {
			if (typeof action.payload.bun !== 'undefined') {
				state.bun = action.payload.bun;
				state.bunWasAdded = true;
			}
		},
		addIngredientToConstructor(
			state,
			action: PayloadAction<IConstructorActions>
		) {
			if (typeof action.payload.ingredient !== 'undefined') {
				if (typeof state.ingredientList === 'undefined') {
					state.ingredientList = [
						{
							...action.payload.ingredient,
							id: action.payload.id,
						},
					];
				} else {
					state.ingredientList.push({
						...action.payload.ingredient,
						id: action.payload.id,
					});
				}
			}
		},
		removeIngredientFromConstructor(
			state,
			action: PayloadAction<IConstructorActions>
		) {
			state.ingredientList = state.ingredientList.filter(
				(ingredient: TIngredient, index: number): boolean => {
					if (
						typeof action === 'undefined' ||
						typeof action.payload === 'undefined' ||
						typeof action.payload.ingredient === 'undefined' ||
						typeof action.payload.ingredient._id === 'undefined'
					) {
						return false;
					}
					return (
						ingredient._id !== action.payload.ingredient._id ||
						index !== action.payload.index
					);
				}
			);
		},
		countSum(state) {
			state.sum =
				state.ingredientList.reduce((acc: number, val: TIngredient): number => {
					return acc + val.price;
				}, 0) + (state.bun && state.bun.price ? state.bun.price * 2 : 0);
		},
		sortIngredients(state, action: PayloadAction<IConstructorActions>) {
			if (typeof action.payload.ingredients !== 'undefined') {
				state.ingredientList = action.payload.ingredients;
			}
		},
	},
});

export const {
	addBunToConstructor,
	addIngredientToConstructor,
	removeIngredientFromConstructor,
	countSum,
	sortIngredients,
} = constructorSlice.actions;

export default constructorSlice.reducer;
