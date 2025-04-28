import { reducer } from '../services/reducers';
import React, { LegacyRef } from 'react';
import {
	AUTH_CHECKED,
	FORM_FAILED,
	LOGIN_FAILED,
	LOGIN_PROCESSING,
	LOGIN_SUCCESS,
	LOGOUT_PROCESSING,
	LOGOUT_SUCCESS,
	PASSWORD_RESET_FAILED,
	PASSWORD_RESET_PROCESSING,
	PASSWORD_RESET_SENDING_FAILED,
	PASSWORD_RESET_SENDING_PROCESSING,
	PASSWORD_RESET_SENDING_SUCCESS,
	PASSWORD_RESET_SUCCESS,
	REGISTER_FAILED,
	REGISTER_PROCESSING,
	REGISTER_SUCCESS,
	STATE_CLEAR,
	USER_SUCCESS,
} from '../services/actions/auth';
import {
	PROFILE_CHANGE_FAILED,
	PROFILE_CHANGE_PROCESSING,
	PROFILE_CHANGE_SUCCESS,
} from '../services/actions/profile';
import {
	ADD_BUN,
	ADD_INGREDIENT,
	COUNT_SUM,
	REMOVE_INGREDIENT,
	SORT_INGREDIENTS,
} from '../services/actions/constructor';
import {
	DOWNLOAD_INGREDIENT_FAILED,
	DOWNLOAD_INGREDIENT_IS_IN_PROCESS,
	DOWNLOAD_INGREDIENT_SUCCESS,
	LOAD_INGREDIENT,
} from '../services/actions/ingredient';
import {
	CLEAR_INGREDIENT,
	HIDE_MODAL,
	HIDE_POPUP_MODAL,
	LOAD_CONTENT,
	SHOW_MODAL,
	SHOW_POPUP_MODAL,
} from '../services/actions/modal';
import {
	DOWNLOAD_INGREDIENTS_FAILED,
	DOWNLOAD_INGREDIENTS_IS_IN_PROCESS,
	DOWNLOAD_INGREDIENTS_SUCCESS,
} from '../services/actions/ingredients';
import {
	ORDER_FAILED,
	ORDER_SENDING_IS_IN_PROCESS,
	ORDER_SUCCESS,
} from '../services/actions/order';

export type TNullString = string | null;
export type TUndefinedString = string | undefined;

export type TAppState = ReturnType<typeof reducer>;

export type TUser =
	| {
			name?: string | null;
			email?: string | null;
			password?: string | null;
	  }
	| null
	| undefined;

export type TIngredient = {
	_id: string;
	calories: number;
	carbohydrates: number;
	fat: number;
	proteins: number;
	price: number;
	type: string;
	image: string;
	image_large: string;
	image_mobile: string;
	name: string;
	count: number;
	v?: number;
	id?: number | string;
};

export type TDragObject = {
	id?: string | number;
};

export type TDragCollectedProps = {
	opacity: number;
};

export type TIngredientInitialState = {
	ingredient: TIngredient | null;
	requestProcess: boolean;
	requestFailed: boolean;
};

export type TIngredientActions = {
	type: string;
	ingredient: TIngredient;
};

export type TAuthInitialState = {
	user: TUser;
	requestProcess: boolean;
	requestFailed: boolean;
	errorText: string | undefined;
	isAuthChecked: boolean;
};

export type TAuthActions = {
	type: string;
	error?: string;
	user?: TUser;
};

export type TActions = TAuthActions & TIngredientActions;

export type TIngredientsInitialState = {
	ingredients: TIngredient[];
	bunIds: string[];
	requestProcess: boolean;
	requestFailed: boolean;
};

export type TIngredientsActions = {
	type: string;
	ingredients: TIngredient[];
	bun: TIngredient;
	ingredient: TIngredient;
	key: number;
	count: number;
};

export type TModalInitialState = {
	modalIsVisible: boolean;
	modalType?: string;
	modalHeader?: string;
	modalContent?: React.JSX.Element | string | number;
};

export type TModalActions = {
	type: string;
	modalType?: string;
	modalHeader?: string;
	modalContent?: React.JSX.Element | string | number;
};
export type Scrolling<Element> = {
	removeEventListener(
		type: 'scroll',
		listener: (event: React.WheelEvent<Element>) => void,
		options?: boolean | EventListenerOptions
	): void;

	addEventListener(
		type: 'scroll',
		listener: (event: React.WheelEvent<Element>) => void,
		options?: boolean | EventListenerOptions
	): void;
};

export type ErrorProps = {
	text: string;
	height?: boolean;
};

export type LoaderProps = {
	simple?: boolean;
};

export type TOderInitialState = {
	order?: TOrder;
	orderIngredients?: Array<string>;
	requestProcess: boolean;
	requestFailed: boolean;
	bunWasAdded: false | string;
};

export type TOrderActions = {
	type: string;
	ingredient?: TIngredient;
	ingredients?: TIngredient[];
	bun?: TIngredient;
	bunIds?: Array<string>;
	index?: number;
	orderInfo: TOrder;
};

export type TOrder = {
	success: boolean;
	name: string;
	order: TOrderBody;
};

export type TOwner = {
	name: string;
	email: string;
	createdAt: string;
	updatedAt: string;
};

export type TOrderBody = {
	ingredients: Array<TIngredient>;
	_id: string;
	owner: TOwner;
	status: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
	price: number;
};

export type TModalProps = {
	closeBtnRef: LegacyRef<HTMLDivElement>;
	overlayRef: LegacyRef<HTMLDivElement>;
	modalRef: LegacyRef<HTMLDivElement>;
};

export type TModalOverlay = {
	children: React.ReactNode;
	overlayRef: LegacyRef<HTMLDivElement>;
};

export type TModalRouter = {
	onClose: () => void;
};

export type TProfileMenuProps = {
	item: string;
};

export type TProtectedRouteProps = {
	isAuthorized?: boolean;
	component: React.JSX.Element;
};

export type TIngredientProps = {
	ingredient: TIngredient;
};

export type TProfileInitialState = {
	requestProcess: boolean;
	requestFailed: boolean;
	errorText?: string;
};

export type TProfileActions = {
	type: string;
	error?: string;
};

export type TConstructorInitialState = {
	ingredientList: TIngredient[];
	bun: TIngredient | null;
	sum: number;
	bunWasAdded: boolean;
};
export type TConstructorActions = {
	type: string;
	bun: TIngredient;
	ingredient: TIngredient;
	id: number | string;
	index: number | string;
	ingredients: TIngredient[];
};

export type TStoreEvents =
	| { (dispatch: TStoreEvents): void }
	| { type: typeof AUTH_CHECKED }
	| {
			type: typeof REGISTER_PROCESSING;
	  }
	| {
			type: typeof LOGIN_PROCESSING;
	  }
	| {
			type: typeof PROFILE_CHANGE_PROCESSING;
	  }
	| {
			type: typeof PASSWORD_RESET_SENDING_PROCESSING;
	  }
	| {
			type: typeof PASSWORD_RESET_PROCESSING;
	  }
	| {
			type: typeof PASSWORD_RESET_PROCESSING;
	  }
	| {
			type: typeof LOGIN_SUCCESS;
			user: TUser;
	  };

export type TActionsTotalx =
	| typeof AUTH_CHECKED
	| typeof REGISTER_FAILED
	| typeof REGISTER_PROCESSING
	| typeof REGISTER_SUCCESS
	| typeof PASSWORD_RESET_FAILED
	| typeof PASSWORD_RESET_PROCESSING
	| typeof PASSWORD_RESET_SUCCESS
	| typeof PASSWORD_RESET_SENDING_FAILED
	| typeof PASSWORD_RESET_SENDING_SUCCESS
	| typeof LOGIN_FAILED
	| typeof LOGIN_PROCESSING
	| typeof LOGIN_SUCCESS
	| typeof LOGOUT_PROCESSING
	| typeof LOGOUT_SUCCESS
	| typeof USER_SUCCESS
	| typeof STATE_CLEAR
	| typeof FORM_FAILED
	| typeof ADD_BUN
	| typeof ADD_INGREDIENT
	| typeof REMOVE_INGREDIENT
	| typeof COUNT_SUM
	| typeof SORT_INGREDIENTS
	| typeof LOAD_INGREDIENT
	| typeof DOWNLOAD_INGREDIENT_IS_IN_PROCESS
	| typeof CLEAR_INGREDIENT
	| typeof DOWNLOAD_INGREDIENT_FAILED
	| typeof DOWNLOAD_INGREDIENT_SUCCESS
	| typeof DOWNLOAD_INGREDIENTS_IS_IN_PROCESS
	| typeof DOWNLOAD_INGREDIENTS_FAILED
	| typeof DOWNLOAD_INGREDIENTS_SUCCESS
	| typeof HIDE_MODAL
	| typeof SHOW_MODAL
	| typeof LOAD_CONTENT
	| typeof SHOW_POPUP_MODAL
	| typeof HIDE_POPUP_MODAL
	| typeof ORDER_SENDING_IS_IN_PROCESS
	| typeof ORDER_FAILED
	| typeof ORDER_SUCCESS
	| typeof PROFILE_CHANGE_FAILED
	| typeof PROFILE_CHANGE_SUCCESS
	| typeof PROFILE_CHANGE_PROCESSING;

export type TPayloadTotal = {
	modalContent?: string | number | React.JSX.Element | null;
	modalHeader?: string | number | React.JSX.Element | null;
	modalType?: string | number | React.JSX.Element | null;
};

export type TDispatchActionsTotal = {
	type: string;
} & TPayloadTotal;
