import React, { useEffect } from 'react';
import styles from './ingredient-details.module.css';
import { useSelector, useDispatch } from '../../../services/store';
import Loader from '../../loader/loader';
import { downloadIngredient } from '../../../services/actions/ingredient';
import { useParams } from 'react-router';
import { TAppState, TIngredient } from '../../../utils/types';

const IngredientDetails = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const ingredient: TIngredient | null = useSelector(
		(state: TAppState): TIngredient | null => {
			return state.ingredientReducer.ingredient;
		}
	);
	const { ingredientId } = useParams();
	useEffect(() => {
		if (
			(!ingredient && ingredientId) ||
			(ingredient && ingredientId === ingredient['_id'])
		) {
			dispatch(downloadIngredient(ingredientId));
		}
	}, [dispatch, ingredient, ingredientId]);
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
