import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ingredientStyles from './ingredient.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import IngredientDetails from '../../../modal/ingredient-details/ingredient-details';
import { useDrag } from 'react-dnd';
import { openModal } from '../../../../services/actions/modal';
import { LOAD_INGREDIENT } from '../../../../services/actions/ingredient';

const Ingredient = ({ ingredient }) => {
	const dispatch = useDispatch();
	const id = ingredient._id;
	const type = ingredient.type === 'bun' ? 'bun' : 'not-bun';

	const [{ opacity }, ingredientBoxDrag] = useDrag({
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

	const ingredientBox = useRef(null);
	useEffect(() => {
		ingredientBox.current.addEventListener('click', showIngredientInfo);
		return () => {
			ingredientBox.current.removeEventListener('click', showIngredientInfo);
		};
	}, []);

	const showIngredientInfo = useCallback(() => {
		dispatch({ type: LOAD_INGREDIENT, ingredient: ingredient });
		//here will be the query to server in future sprints
		const content = <IngredientDetails />;
		dispatch(openModal('ingredient', 'Детали ингредиента', content));
	}, [ingredient]);

	return (
		<li
			className={ingredientStyles.box}
			ref={ingredientBox}
			style={{ opacity }}>
			<span ref={ingredientBoxDrag}>
				<img
					className={ingredientStyles.image}
					src={ingredient.image}
					alt={ingredient.name}
				/>
			</span>
			<div className={`${ingredientStyles.name} text text_type_main-default`}>
				{ingredient.name}
			</div>
			<span>{amountBox}</span>
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
	}).isRequired,
};
export default Ingredient;
