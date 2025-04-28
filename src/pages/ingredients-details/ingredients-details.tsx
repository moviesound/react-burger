import IngredientDetails from '../../components/modal/ingredient-details/ingredient-details';
import { useParams } from 'react-router';
import { useDispatch } from '../../services/store';
import { downloadIngredient } from '@services/actions/ingredient';
import { useEffect } from 'react';
import styles from './ingredients-details.module.css';

const IngredientDetailsPage = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const { ingredientId } = useParams();
	useEffect(() => {
		if (typeof ingredientId === 'string') {
			dispatch(downloadIngredient(ingredientId));
		}
	}, [dispatch, ingredientId]);
	return (
		<div className={styles.container}>
			<IngredientDetails />
		</div>
	);
};
export default IngredientDetailsPage;
