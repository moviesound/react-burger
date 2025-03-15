import React from 'react';
import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import Loader from '../../loader/loader';

const IngredientDetails = () => {
	const ingredient = useSelector((state) => {
		return state.ingredientReducer.ingredient;
	});
	return ingredient ? (
		<div className={styles.container}>
			<img
				alt='img'
				className={`${styles.image}`}
				src={ingredient.image_large}
			/>
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
	) : (
		<Loader />
	);
};

export default IngredientDetails;
