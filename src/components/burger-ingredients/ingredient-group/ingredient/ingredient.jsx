import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import ingredientStyles from './ingredient.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import IngredientDetails from '../../../modal/ingredient-details/ingredient-details';
import { useDrag } from 'react-dnd';
import { loadModal } from '../../../../services/actions/modal';
import { LOAD_INGREDIENT } from '../../../../services/actions/ingredient';
import { Link, useBeforeUnload, useLocation, useNavigate } from 'react-router';

const Ingredient = ({ ingredient }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const id = ingredient._id;
	const type = ingredient.type === 'bun' ? 'bun' : 'not-bun';
	const location = useLocation();

	const [{ opacity, isDragging }, ingredientBoxDrag] = useDrag({
		type: type,
		item: { id },
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0.5 : 1,
			isDragging: !!monitor.isDragging(),
			x: console.log(monitor),
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
	const ingredientBox = useRef(null);
	useBeforeUnload(() => {
		ingredientBox.current.removeEventListener('click', showIngredientInfo);
	});
	useEffect(() => {
		ingredientBox.current.addEventListener('click', showIngredientInfo);
		return () => {
			if (ingredientBox && ingredientBox.current) {
				ingredientBox.current.removeEventListener('click', showIngredientInfo);
			}
		};
	}, [navigate]);

	const showIngredientInfo = useCallback(() => {
		dispatch({ type: LOAD_INGREDIENT, ingredient: ingredient });
		//here will be the query to server in future sprints
		const content = <IngredientDetails />;
		dispatch(loadModal('ingredient', 'Детали ингредиента', content, 'route'));
	}, [ingredient]);
	useEffect(() => {
		console.log('opacity=' + opacity);
	}, [opacity]);
	useEffect(() => {
		console.log('isDragging=' + isDragging);
	}, [isDragging]);
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
Ingredient.propTypes = {
	ingredient: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		calories: PropTypes.number.isRequired,
		carbohydrates: PropTypes.number.isRequired,
		fat: PropTypes.number.isRequired,
		proteins: PropTypes.number.isRequired,
		price: PropTypes.number.isRequired,
		type: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		image_large: PropTypes.string.isRequired,
		image_mobile: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		count: PropTypes.number,
	}),
};
export default Ingredient;
