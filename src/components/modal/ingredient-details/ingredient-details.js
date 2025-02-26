import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';

const IngredientDetails = ({ ingredient }) => {
	return (
		<div className={styles.container}>
			<img className={`${styles.image}`} src={ingredient.image_large} />
			<div className={`${styles.description} text text_type_main-medium`}>
				{ingredient.name}
			</div>
			<div
				className={`${styles.infoContainer} text text_type_main-small text_color_inactive`}>
				<div className={`${styles.infoBox}`}>
					<span>Калории, ккал</span>
					<br />
					<span>{ingredient.calories}</span>
				</div>
				<div className={`${styles.infoBox}`}>
					<span>Белки, г</span>
					<br />
					<span>{ingredient.proteins}</span>
				</div>
				<div className={`${styles.infoBox}`}>
					<span>Жиры, г</span>
					<br />
					<span>{ingredient.fat}</span>
				</div>
				<div className={`${styles.infoBox}`}>
					<span>Углеводы, г</span>
					<br />
					<span>{ingredient.carbohydrates}</span>
				</div>
			</div>
		</div>
	);
};

IngredientDetails.propTypes = {
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
};
export default IngredientDetails;
