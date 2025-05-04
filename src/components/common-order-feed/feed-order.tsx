import styles from './common-order-feed.module.css';
import { TIngredient, TIngredientListProps } from '../../features/types/types';
import React, { useEffect, useMemo, useState } from 'react';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { apiSlice } from '../../features/api/api-slice';

interface IIngredientsOrderInfo {
	list: TIngredient[];
	sum: number;
}

const FeedOrder = ({ orderData }: TIngredientListProps): React.JSX.Element => {
	const { data: result } = apiSlice.useGetIngredientsQuery();
	const ingredientsList = result?.data ?? [];
	const [content, setContent] = useState<React.ReactNode>(undefined);
	const { list, sum }: IIngredientsOrderInfo = useMemo(() => {
		const list: TIngredient[] = [];
		let sum = 0;
		if (orderData && ingredientsList && ingredientsList.length > 0) {
			orderData.ingredients.forEach((ingredientOrder) => {
				ingredientsList.forEach((ingredient) => {
					if (ingredient._id === ingredientOrder) {
						list.push(ingredient);
						sum += ingredient.price;
					}
				});
			});
		}
		return { list, sum };
	}, [orderData, ingredientsList]);
	const ingredientsHtml: Array<React.JSX.Element | string> = useMemo(() => {
		if (list) {
			let bun = false;
			return list.map((ingredient: TIngredient, index: number) => {
				if (index === 5) {
					return (
						<div key={index} className={`${styles.ingredient}`}>
							<img
								alt='ingr'
								className={`${styles.ingredientLast}`}
								src={`${ingredient.image_mobile}`}
							/>
							<div className={`${styles.ingredientTransparent}`}></div>
							<div
								className={`${styles.ingredientNumber} text_type_main-small`}>
								+3
							</div>
						</div>
					);
				} else if (index > 5) {
					return '';
				}
				if (ingredient.type === 'bun') {
					if (!bun) {
						bun = true;
						return (
							<img
								alt='ingr'
								key={index}
								className={`${styles.ingredient}`}
								src={`${ingredient.image_mobile}`}
							/>
						);
					} else {
						return '';
					}
				} else {
					return (
						<img
							alt='ingr'
							key={index}
							className={`${styles.ingredient}`}
							src={`${ingredient.image_mobile}`}
						/>
					);
				}
			});
		} else {
			return [''];
		}
	}, [list]);
	return (
		<div className={styles.orderDiv} role='presentation'>
			<div className={styles.number}>
				<div className={`${styles.top} text_type_digits-default`}>
					<div className={styles.orderId}>#{orderData?.number ?? ''}</div>
					<div
						className={`${styles.orderTime} text_color_inactive text_type_main-small`}>
						<FormattedDate
							date={
								typeof orderData.createdAt !== 'undefined'
									? new Date(orderData?.createdAt)
									: new Date()
							}
						/>
					</div>
				</div>
			</div>
			<div className={`${styles.title} text_type_main-medium`}>
				{orderData?.name ?? ''}
			</div>
			<div className={styles.bottom}>
				<div className={`${styles.ingredients}`}>{ingredientsHtml}</div>

				<div className={`${styles.sum} text text_type_digits-default`}>
					<div className={styles.sum}>{sum}</div>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};

export default FeedOrder;
