import styles from './ingredient-details.module.css';
import Loader from '../../loader/loader';
import { useParams } from 'react-router';
import { apiSlice } from '../../../features/api/api-slice';

const IngredientDetails = (): React.JSX.Element => {
	const { ingredientId } = useParams();
	const { data: ingredientFiltered } = apiSlice.useGetIngredientsQuery(
		undefined,
		{
			selectFromResult: ({ data }) => ({
				data: data?.data?.filter((item) => item._id === ingredientId),
			}),
		}
	);
	return ingredientFiltered && ingredientFiltered[0] ? (
		<div className={styles.container}>
			<img
				alt='img'
				className={`${styles.image}`}
				src={ingredientFiltered[0].image_large}
			/>
			<div className={`${styles.description} text text_type_main-medium`}>
				{ingredientFiltered[0].name}
			</div>
			<div
				className={`${styles.infoContainer} text text_type_main-small text_color_inactive`}>
				<div className={`${styles.infoBox}`}>
					<span>Калории, ккал</span>
					<br />
					<span>{ingredientFiltered[0].calories}</span>
				</div>
				<div className={`${styles.infoBox}`}>
					<span>Белки, г</span>
					<br />
					<span>{ingredientFiltered[0].proteins}</span>
				</div>
				<div className={`${styles.infoBox}`}>
					<span>Жиры, г</span>
					<br />
					<span>{ingredientFiltered[0].fat}</span>
				</div>
				<div className={`${styles.infoBox}`}>
					<span>Углеводы, г</span>
					<br />
					<span>{ingredientFiltered[0].carbohydrates}</span>
				</div>
			</div>
		</div>
	) : (
		<Loader />
	);
};

export default IngredientDetails;
