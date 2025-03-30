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
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
	addIngredientToConstructor,
	REMOVE_INGREDIENT,
	SORT_INGREDIENTS,
} from '../../services/actions/constructor';
import { ConstructorIngredient } from './constructor-ingredient/constructor-ingredient';
import { useBeforeUnload } from 'react-router';

const BurgerConstructor = () => {
	const dispatch = useDispatch();
	//local component variables
	const [height, setHeight] = useState(0);
	const [maxHeight, setMaxHeight] = useState(1000);
	const burgerConstructorContent = useRef(null);
	//ingredients and buns data
	const ingredients = useSelector((state) => {
		return state.ingredientsReducer.ingredients;
	});
	const bunIds = useSelector((state) => {
		return state.ingredientsReducer.bunIds;
	});
	const ingredientList = useSelector((state) => {
		return state.constructorReducer.ingredientList;
	});
	const bun = useSelector((state) => {
		return state.constructorReducer.bun;
	});

	//drag-drop with animation
	const [{ isHoverTopBun, canDropTopBun }, bunTargetTop] = useDrop({
		accept: 'bun',
		drop(item) {
			dispatch(addIngredientToConstructor(item, ingredients, bunIds, 'bun'));
		},
		collect: (monitor) => ({
			isHoverTopBun: monitor.isOver(),
			canDropTopBun: monitor.canDrop(),
		}),
	});
	const [{ isHoverBottomBun, canDropBottomBun }, bunTargetBottom] = useDrop({
		accept: 'bun',
		drop(item) {
			dispatch(addIngredientToConstructor(item, ingredients, bunIds, 'bun'));
		},
		collect: (monitor) => ({
			isHoverBottomBun: monitor.isOver(),
			canDropBottomBun: monitor.canDrop(),
		}),
	});

	const getBunClass = (
		isHoverBox,
		canDropBox,
		canDropSiblingBox
	) => {
		if (isHoverBox && canDropBox) {
			return styles.active;
		} else if (canDropBox || canDropSiblingBox) {
			return styles.hovered;
		} else {
			return styles.normal;
		}
	};

	const bunSelectedTopClass = getBunClass(
		isHoverTopBun,
		canDropTopBun,
		canDropBottomBun
	);

	const bunSelectedBottomClass = getBunClass(
		isHoverBottomBun,
		canDropBottomBun,
		canDropTopBun
	);

	const [{ isHoverNotBun, canDropNotBun }, notBunTarget] = useDrop({
		accept: 'not-bun',
		drop(item) {
			dispatch(
				addIngredientToConstructor(item, ingredients, bunIds, 'not-bun')
			);
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
		(ingredient, index) => {
			dispatch({
				type: REMOVE_INGREDIENT,
				ingredient: ingredient,
				index: index,
			});
		},
		[ingredientList]
	);
	const moveIngredient = useCallback(
		(dragIndex, hoverIndex) => {
			const items = [];
			ingredientList.map((ingredient, index) => {
				items[index] = Object.assign(ingredient);
			});
			const dragItem = Object.assign(items[dragIndex]);
			items.splice(dragIndex, 1);
			items.splice(hoverIndex, 0, dragItem);
			dispatch({ type: SORT_INGREDIENTS, ingredients: items });
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
							{ingredientList.map((ingredient, index) => {
								return (
									<ConstructorIngredient
										key={ingredient.id}
										id={ingredient.id}
										index={index}
										ingredient={ingredient}
										removeIngredient={removeIngredient}
										notBunSelectedClass={notBunSelectedClass}
										moveIngredient={moveIngredient}
									/>
								);
							})}
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
		const contentPosition =
			burgerConstructorContent.current.getBoundingClientRect();
		setHeight(window.innerHeight - Math.ceil(contentPosition.top) - 250);
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
