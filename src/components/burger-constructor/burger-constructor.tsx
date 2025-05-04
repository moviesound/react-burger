import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ButtonOrder from '../button-order/button-order';
import { useSelector, useDispatch } from '../../app/hooks';
import { useDrop } from 'react-dnd';
import { ConstructorIngredient } from './constructor-ingredient/constructor-ingredient';
import { useBeforeUnload } from 'react-router';
import { TIngredient } from '../../features/types/types';
import { apiSlice } from '../../features/api/api-slice';
import { AppDispatch } from '../../app/store-types';
import {
	addBunToConstructor,
	addIngredientToConstructor,
	countSum,
	removeIngredientFromConstructor,
	sortIngredients as sortIngredientsConstructor,
} from '../../features/constructor';
import {
	addBunToOrder,
	addIngredientToOrder,
	removeIngredientFromOrder,
	sortIngredients as sortIngredientsOrder,
} from '../../features/order';
import { addIngredientCount } from '../../features/ingredients';

type DragCollectedProps1 = {
	isHoverTopBun: boolean;
	canDropTopBun: boolean;
};

type DragCollectedProps2 = {
	isHoverBottomBun: boolean;
	canDropBottomBun: boolean;
};

type DragObject = {
	id: string;
	index: number;
};

/*function changeIngredients(
	ingr: DragObject,
	ingredients: TIngredient[]
): TIngredient[] {
	let flagBun = false;
	for (const i in ingredients) {
		if (ingredients[i]._id === ingr.id) {
			flagBun = true;
		}
	}

	return ingredients.map((item) => {
		if (flagBun === true && item.type === 'bun') {
			//remove all buns count
			item.count = 0;
		}
		if (item.type === 'bun') {
			item.count += 2;
		} else {
			item.count += 1;
		}
		return item;
	});
}*/

function addBun(
	dispatch: AppDispatch,
	item: DragObject,
	ingredients: TIngredient[] | undefined,
	bunIds: string[] | undefined
) {
	if (typeof ingredients !== 'undefined') {
		for (const i in ingredients) {
			if (ingredients[i].type === 'bun' && ingredients[i].count > 0) {
				/*dispatch({
					type: 'REMOVE_BUN',
					bun: ingredients[i],
					ingredient: ingredients[i],
					bunIds: bunIds,
					key: parseInt(i, 10),
				});*/
			}
		}
		for (const i in ingredients) {
			if (ingredients[i]._id === item.id && ingredients[i].type === 'bun') {
				dispatch(addBunToConstructor({ bun: ingredients[i] }));
				dispatch(addBunToOrder({ bun: ingredients[i], bunIds: bunIds }));
				dispatch(
					addIngredientCount({ ingredient: ingredients[i], type: 'bun' })
				);
				dispatch(countSum());
				break;
			}
		}
	}
}

function addIngredient(
	dispatch: AppDispatch,
	item: DragObject,
	ingredients: TIngredient[] | undefined
) {
	if (typeof ingredients !== 'undefined') {
		for (const i in ingredients) {
			if (ingredients[i]._id === item.id && ingredients[i].type !== 'bun') {
				/*dispatch({
					type: 'ADD_INGREDIENT',
					ingredient: ingredients[i],
					bunIds: bunIds,
					key: parseInt(i, 10),
					id: Math.ceil(Math.random() * 10000000),
					count: ingredients[i].count + 1,
				});*/
				dispatch(
					addIngredientToConstructor({
						ingredient: ingredients[i],
						id: Math.ceil(Math.random() * 10000000),
					})
				);
				dispatch(
					addIngredientToOrder({
						ingredient: ingredients[i],
					})
				);
				dispatch(
					addIngredientCount({ ingredient: ingredients[i], type: 'ingredient' })
				);

				dispatch(countSum());

				break;
			}
		}
	}
}

const BurgerConstructor = (): React.JSX.Element => {
	const dispatch = useDispatch();
	//local component variables
	const [height, setHeight] = useState<number>(0);
	const [maxHeight, setMaxHeight] = useState<number>(1000);
	const burgerConstructorContent = useRef<HTMLSpanElement>(null);
	//ingredients and buns data
	const { data: ingredients } = apiSlice.useGetIngredientsQuery(undefined, {
		selectFromResult: ({ data }) => ({
			data: data?.data,
		}),
	});

	const { data: bunIds } = apiSlice.useGetIngredientsQuery(undefined, {
		selectFromResult: ({ data }) => ({
			data: data?.data
				?.filter((item) => item.type === 'bun')
				.map((item) => item._id),
		}),
	});

	const ingredientList = useSelector((state) => {
		return state.burgerConstructor.ingredientList;
	});
	const bun = useSelector((state) => {
		return state.burgerConstructor.bun;
	});

	//drag-drop with animation
	const [{ isHoverTopBun, canDropTopBun }, bunTargetTop] = useDrop<
		DragObject,
		unknown,
		DragCollectedProps1
	>({
		accept: 'bun',
		drop(item: DragObject) {
			addBun(dispatch, item, ingredients, bunIds);
		},
		collect: (monitor) => ({
			isHoverTopBun: monitor.isOver(),
			canDropTopBun: monitor.canDrop(),
		}),
	});
	const [{ isHoverBottomBun, canDropBottomBun }, bunTargetBottom] = useDrop<
		DragObject,
		unknown,
		DragCollectedProps2
	>({
		accept: 'bun',
		drop(item: DragObject) {
			addBun(dispatch, item, ingredients, bunIds);
		},
		collect: (monitor) => ({
			isHoverBottomBun: monitor.isOver(),
			canDropBottomBun: monitor.canDrop(),
		}),
	});

	const getBunClass = (
		isHoverBox: boolean,
		canDropBox: boolean,
		canDropSiblingBox: boolean
	): string => {
		if (isHoverBox && canDropBox) {
			return styles.active;
		} else if (canDropBox || canDropSiblingBox) {
			return styles.hovered;
		} else {
			return styles.normal;
		}
	};

	const bunSelectedTopClass: string = getBunClass(
		isHoverTopBun,
		canDropTopBun,
		canDropBottomBun
	);

	const bunSelectedBottomClass: string = getBunClass(
		isHoverBottomBun,
		canDropBottomBun,
		canDropTopBun
	);

	const [{ isHoverNotBun, canDropNotBun }, notBunTarget] = useDrop({
		accept: 'not-bun',
		drop(item: DragObject) {
			addIngredient(dispatch, item, ingredients);
		},
		collect: (monitor) => ({
			isHoverNotBun: monitor.isOver(),
			canDropNotBun: monitor.canDrop(),
		}),
	});
	const notBunSelectedClass =
		isHoverNotBun && canDropNotBun
			? styles.active
			: canDropNotBun
			? styles.hovered
			: styles.normal;
	//function for removing ingredient from list
	const removeIngredient = useCallback(
		(ingredient: TIngredient, index: number): void => {
			dispatch(
				removeIngredientFromConstructor({
					ingredient: ingredient,
					index: index,
				})
			);
			dispatch(
				removeIngredientFromOrder({
					ingredient: ingredient,
					index: index,
				})
			);
		},
		[dispatch, ingredientList]
	);
	const moveIngredient = useCallback(
		(dragIndex: number, hoverIndex: number): void => {
			if (!ingredientList) {
				return;
			}
			const items: TIngredient[] = [];
			ingredientList.map((ingredient: TIngredient, index: number) => {
				items[index] = Object.assign(ingredient);
			});
			const dragItem = Object.assign(items[dragIndex]);
			items.splice(dragIndex, 1);
			items.splice(hoverIndex, 0, dragItem);
			dispatch(sortIngredientsConstructor({ ingredients: items }));
			dispatch(sortIngredientsOrder({ ingredients: items }));
		},
		[ingredientList, dispatch]
	);

	//ingredients content must be changed only at resizing (height, maxHeight change), dragging (styles changing),
	//dropping (adding ingredients, buns), removing ingredients/buns
	const content = useMemo(() => {
		const classEmpty = `${styles.emptyIngredient} constructor-element__row text text_type_main-small`;
		return (
			<>
				{bun ? (
					<div className={`${styles.topIngredient}`} ref={bunTargetTop}>
						<div
							className={`${bunSelectedTopClass} constructor-element_pos_top`}>
							<ConstructorElement
								type='top'
								isLocked={true}
								text={bun.name}
								price={bun.price}
								thumbnail={bun.image_mobile}
							/>
						</div>
					</div>
				) : (
					<div className={`${styles.topIngredient}`} ref={bunTargetTop}>
						<div
							className={`${bunSelectedTopClass} constructor-element constructor-element_pos_top`}>
							<span className={classEmpty}>Выберите булки</span>
						</div>
					</div>
				)}

				{ingredientList && ingredientList.length > 0 ? (
					<span ref={burgerConstructorContent}>
						<ul
							className={`${styles.list} custom-scroll`}
							ref={notBunTarget}
							style={{
								height: height,
								maxHeight: maxHeight,
							}}>
							{ingredientList.map(
								(ingredient: TIngredient, index: number): React.JSX.Element => {
									const num: number =
										ingredient &&
										ingredient.id &&
										typeof ingredient.id === 'number'
											? ingredient.id
											: index;
									return (
										<ConstructorIngredient
											key={num}
											id={num}
											index={index}
											ingredient={ingredient}
											removeIngredient={removeIngredient}
											notBunSelectedClass={notBunSelectedClass}
											moveIngredient={moveIngredient}
										/>
									);
								}
							)}
						</ul>
					</span>
				) : (
					<span ref={burgerConstructorContent}>
						<ul
							className={`${styles.listEmpty}`}
							ref={notBunTarget}
							style={{
								height: 94,
								maxHeight: 94,
							}}>
							<li>
								<div className={styles.moveBox}></div>
								<span className={`${notBunSelectedClass} ${styles.ownelement}`}>
									<div className='constructor-element constructor-element_pos_middle'>
										<span className={classEmpty}>Выберите ингредиенты</span>
									</div>
								</span>
							</li>
						</ul>
					</span>
				)}

				{bun ? (
					<div className={`${styles.bottomIngredient}`} ref={bunTargetBottom}>
						<div
							className={`${bunSelectedBottomClass} constructor-element_pos_bottom`}>
							<ConstructorElement
								type='bottom'
								isLocked={true}
								text={bun.name}
								price={bun.price}
								thumbnail={bun.image_mobile}
							/>
						</div>
					</div>
				) : (
					<div
						className={`${styles.bottomIngredient} constructor-element_pos_bottom`}
						ref={bunTargetBottom}>
						<div
							className={`${bunSelectedBottomClass} constructor-element constructor-element_pos_bottom`}>
							<span className={classEmpty}>Выберите булки</span>
						</div>
					</div>
				)}
			</>
		);
	}, [
		bun,
		ingredientList,
		notBunSelectedClass,
		bunSelectedTopClass,
		bunSelectedBottomClass,
		height,
		maxHeight,
	]);

	//resizer, is changing at ingredient list change
	const onResizeWindow = useCallback(() => {
		//maxheight
		let amount = 1;
		if (ingredientList && ingredientList.length > 1) {
			amount = ingredientList.length;
		}
		setMaxHeight(94 * amount - 10);

		//height
		if (
			typeof burgerConstructorContent.current !== 'undefined' &&
			burgerConstructorContent.current !== null
		) {
			const contentPosition: { top: number } =
				burgerConstructorContent.current.getBoundingClientRect();
			setHeight(window.innerHeight - Math.ceil(contentPosition.top) - 250);
		}
	}, [ingredientList]);
	useBeforeUnload(() => {
		window.removeEventListener('resize', onResizeWindow);
	});
	//add listner on resizing
	useEffect(() => {
		window.addEventListener('resize', onResizeWindow);
		onResizeWindow();
		return () => {
			if (onResizeWindow) {
				window.removeEventListener('resize', onResizeWindow);
			}
		};
	}, [ingredientList]);

	return (
		<section className={styles.section}>
			{content}
			<div style={{ textAlign: 'center' }}>
				<ButtonOrder />
			</div>
		</section>
	);
};

export default BurgerConstructor;
