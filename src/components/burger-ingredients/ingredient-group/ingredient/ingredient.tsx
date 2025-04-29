import React, { useCallback, useEffect, useRef } from 'react';
//import { useDispatch } from '../../../../services/store';
import { useDispatch } from '../../../../app/hooks';
import ingredientStyles from './ingredient.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { Link, useBeforeUnload, useLocation, useNavigate } from 'react-router';
import {
	TDragCollectedProps,
	TDragObject,
	TIngredientProps,
} from '../../../../features/types/types';
import { showModal } from '../../../../features/modal';

const Ingredient = ({ ingredient }: TIngredientProps): React.JSX.Element => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const id: string | undefined = ingredient._id;
	const type: string = ingredient.type === 'bun' ? 'bun' : 'not-bun';
	const location = useLocation();

	const [{ opacity }, ingredientBoxDrag] = useDrag<
		TDragObject,
		unknown,
		TDragCollectedProps
	>({
		type: type,
		item: { id },
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0.5 : 1,
		}),
	});
	//blue circle with counter in  burger constructor in the right top cornet of an ingredient
	let amountBox;
	if (ingredient.count) {
		if (ingredient.count > 0) {
			amountBox = <Counter count={ingredient.count} size='default' />;
		}
	} else {
		amountBox = '';
	}
	const ingredientBox = useRef<HTMLLIElement>(null);
	useBeforeUnload(() => {
		if (ingredientBox && ingredientBox.current) {
			ingredientBox.current.removeEventListener('click', showIngredientInfo);
		}
	});
	useEffect(() => {
		if (ingredientBox && ingredientBox.current) {
			ingredientBox.current.addEventListener('click', showIngredientInfo);
		}
		return () => {
			if (ingredientBox && ingredientBox.current) {
				ingredientBox.current.removeEventListener('click', showIngredientInfo);
			}
		};
	}, [navigate]);

	const showIngredientInfo = useCallback((): void => {
		//here will be the query to server in future sprints
		dispatch(
			showModal({
				modalType: 'ingredient',
				modalHeader: 'Детали ингредиента',
				modalContent: { type: 'ingredient' },
			})
		);
	}, [dispatch]);
	return (
		<li
			className={ingredientStyles.box}
			ref={ingredientBox}
			style={{
				MozOpacity: opacity,
				KhtmlOpacity: opacity,
				opacity: opacity,
			}}>
			<Link
				draggable={false}
				key={id}
				// Тут мы формируем динамический путь для нашего ингредиента
				to={`/ingredients/${id}`}
				// а также сохраняем в свойство background роут,
				// на котором была открыта наша модалка
				state={{ background: location }}
				className={ingredientStyles.ref}>
				<div ref={ingredientBoxDrag}>
					<img
						className={ingredientStyles.image}
						src={ingredient.image}
						alt={ingredient.name}
					/>
				</div>
				<div
					className={`${ingredientStyles.sum} text text_type_digits-default`}>
					{ingredient.price} <CurrencyIcon type='primary' />
				</div>
				<div className={`${ingredientStyles.name} text text_type_main-default`}>
					{ingredient.name}
				</div>
				<span>{amountBox}</span>
			</Link>
		</li>
	);
};

export default Ingredient;
