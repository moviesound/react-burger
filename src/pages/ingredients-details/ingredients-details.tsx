import IngredientDetails from '../../components/modal/ingredient-details/ingredient-details';
import styles from './ingredients-details.module.css';

const IngredientDetailsPage = (): React.JSX.Element => {
	return (
		<div className={styles.container}>
			<IngredientDetails />
		</div>
	);
};
export default IngredientDetailsPage;
