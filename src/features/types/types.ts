import { LegacyRef } from 'react';

export type TDragObject = {
	id?: string | number;
};

export type TDragCollectedProps = {
	opacity: number;
};

export type TIngredientProps = {
	ingredient: TIngredient;
};

export type TProtectedRouteProps = {
	isAuthorized?: boolean;
	component: React.JSX.Element;
};

export type ErrorProps = {
	text: string;
	height?: boolean;
};

export type LoaderProps = {
	simple?: boolean;
};

export type TProfileMenuProps = {
	item: string;
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

export type TError = {
	success: boolean;
	message: string;
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

export type TProfileInitialState = {
	requestProcess: boolean;
	requestFailed: boolean;
	errorText?: string;
};

export type TUser =
	| {
			name?: string | null;
			email?: string | null;
			password?: string | null;
	  }
	| null
	| undefined;
