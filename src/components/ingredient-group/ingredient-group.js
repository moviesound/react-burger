import React from 'react';
import styles from '../ingredient-group/ingredient-group.module.css';
import Ingredient from '../ingredient/ingredient';
import PropTypes from 'prop-types';

const IngredientGroup = (props) => {
	//the list of elements of one group: buns, sauces or mains in burger constructor container
	return (
		<>
			<h2
				className={`${styles.header} text text_type_main-medium`}
				id={props.type}>
				{props.type == 'bun'
					? 'Булки'
					: props.type == 'sauce'
					? 'Соусы'
					: 'Начинки'}
			</h2>
			<section className={styles.ingredient} id={`${props.type}-content`}>
				{props.ingredients.map((ingredient) => (
					<ul className={styles.box} key={ingredient._id}>
						<Ingredient
							openModal={props.openModal}
							ingredient={ingredient}
							amount={ingredient._id == '643d69a5c3f7b9001cfa093c' ? 1 : 0}
						/>
					</ul>
				))}
			</section>
		</>
	);
};

IngredientGroup.propTypes = {
	ingredients: PropTypes.arrayOf(PropTypes.shape({
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
	})).isRequired,
	openModal: PropTypes.func.isRequired,
};

export default IngredientGroup;
