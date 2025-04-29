import React, { LegacyRef } from 'react';
import styles from './ingredient-group.module.css';
import Ingredient from './ingredient/ingredient';
import { TIngredient } from '../../../features/types/types';
import { useSelector } from '../../../app/hooks';

type TIngredientGroup = {
	refId?: LegacyRef<HTMLHeadingElement>;
	refIdContent?: LegacyRef<HTMLDivElement>;
	type: string;
};

const IngredientGroup = ({
	refId,
	refIdContent,
	type,
}: TIngredientGroup): React.JSX.Element => {
	const ingredients = useSelector((state) => state.ingredients.ingredients);
	//the list of elements of one group: buns, sauces or mains in burger constructor container
	return (
		<>
			<h2
				className={`${styles.header} text text_type_main-medium`}
				ref={refId}
				id={type}>
				{type == 'bun' ? 'Булки' : type == 'sauce' ? 'Соусы' : 'Начинки'}
			</h2>
			<div
				className={styles.ingredient}
				id={`${type}-content`}
				ref={refIdContent}>
				{ingredients &&
					ingredients.map((ingredient: TIngredient) => {
						if (ingredient.type) {
							return ingredient.type == type ? (
								<ul className={styles.box} key={ingredient._id}>
									<Ingredient ingredient={ingredient} />
								</ul>
							) : (
								''
							);
						}
						return '';
					})}
			</div>
		</>
	);
};

export default IngredientGroup;
