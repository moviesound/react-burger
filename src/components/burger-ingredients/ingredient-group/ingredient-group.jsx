import React from 'react';
import styles from './ingredient-group.module.css';
import Ingredient from './ingredient/ingredient';
import PropTypes from 'prop-types';

const IngredientGroup = ({ ingredients, refId, refIdContent, type }) => {
	//the list of elements of one group: buns, sauces or mains in burger constructor container
	return (
		<>
			<h2
				className={`${styles.header} text text_type_main-medium`}
				ref={refId}
				id={type}>
				{type == 'bun' ? 'Булки' : type == 'sauce' ? 'Соусы' : 'Начинки'}
			</h2>
			<section
				className={styles.ingredient}
				id={`${type}-content`}
				ref={refIdContent}>
				{ingredients.map((ingredient) => (
					<ul className={styles.box} key={ingredient._id}>
						<Ingredient ingredient={ingredient} />
					</ul>
				))}
			</section>
		</>
	);
};

IngredientGroup.propTypes = {
	ingredients: PropTypes.arrayOf(
		PropTypes.shape({
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
		})
	).isRequired,
	type: PropTypes.string.isRequired,
	refId: PropTypes.object,
	refIdContent: PropTypes.object,
};

export default IngredientGroup;
