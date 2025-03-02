import React, { useCallback, useEffect, useRef } from 'react';
import ingredientStyles from './ingredient.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';

const Ingredient = (props) => {
	//blue circle with counter in  burger constructor in the right top cornet of an ingredient
	let amountBox;
	if (props.amount) {
		const amount = parseInt(props.amount, 10);
		if (amount > 0) {
			amountBox = <Counter count={amount} size='default' />;
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
		//here will be the query to server in future sprints
		const content = <IngredientDetails ingredient={props.ingredient} />;
		const data = { header: 'Детали ингредиента', content: content };
		props.openModal(data);
	});

	return (
		<li className={ingredientStyles.box} ref={ingredientBox}>
			<img
				className={ingredientStyles.image}
				src={props.ingredient.image}
				alt={props.ingredient.name}
			/>
			<div className={`${ingredientStyles.name} text text_type_main-default`}>
				{props.ingredient.name}
			</div>
			{amountBox}
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
	}).isRequired,
	amount: PropTypes.number.isRequired,
	openModal: PropTypes.func.isRequired,
};
export default Ingredient;
