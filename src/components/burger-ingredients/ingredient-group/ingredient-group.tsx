import React, { LegacyRef } from 'react';
import styles from './ingredient-group.module.css';
import Ingredient from './ingredient/ingredient';
import { TIngredient } from '../../../utils/types';

type TIngredientGroup = {
	ingredients: TIngredient[];
	refId?: LegacyRef<HTMLHeadingElement>;
	refIdContent?: LegacyRef<HTMLDivElement>;
	type: string;
};

const IngredientGroup = ({
	ingredients,
	refId,
	refIdContent,
	type,
}: TIngredientGroup): React.JSX.Element => {
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
				{ingredients.map((ingredient: TIngredient) => (
					<ul className={styles.box} key={ingredient._id}>
						<Ingredient ingredient={ingredient} />
					</ul>
				))}
			</div>
		</>
	);
};

export default IngredientGroup;
