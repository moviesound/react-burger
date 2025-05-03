import styles from './user-order-feed.module.css';
import { TIngredient, TIngredientListProps } from '../../features/types/types';
import React, { useEffect, useState } from 'react';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { apiSlice } from '../../features/api/api-slice';

const FeedOrderUserItem = ({
	orderData,
}: TIngredientListProps): React.JSX.Element => {
	const { data: result } = apiSlice.useGetIngredientsQuery();
	const ingredientsList = result?.data ?? [];
	const [ingredientsToShow, setIngredientsToShow] = useState<TIngredient[]>([]);
	const [content, setContent] = useState<React.ReactNode>(undefined);
	const [sum, setSum] = useState<number>(0);
	useEffect(() => {
		if (orderData && ingredientsList && ingredientsList.length > 0) {
			const list: TIngredient[] = [];
			let sumEf = 0;
			orderData.ingredients.forEach((ingredientOrder) => {
				ingredientsList.forEach((ingredient) => {
					if (ingredient._id === ingredientOrder) {
						list.push(ingredient);
						sumEf += ingredient.price;
					}
				});
			});
			setSum(sumEf);
			setIngredientsToShow(list);
		}
	}, [orderData, ingredientsList]);

	useEffect(() => {
		if (ingredientsToShow) {
			let bun = false;
			setContent(
				ingredientsToShow.map((ingredient: TIngredient, index: number) => {
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
						if (bun === false) {
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
				})
			);
		}
	}, [ingredientsToShow]);
	return (
		<div className={styles.orderDiv}>
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
				<div className={`${styles.status} text_type_main-default`}>
					{orderData &&
						orderData.status &&
						(orderData.status === 'done' ? (
							<span className='text_color_success'>Готово</span>
						) : orderData.status === 'pending' ? (
							<span>В работе</span>
						) : (
							<span>Создан</span>
						))}
				</div>
			</div>
			<div className={styles.bottom}>
				<div className={`${styles.ingredients}`}>{content}</div>

				<div className={`${styles.sum} text text_type_digits-default`}>
					<div className={styles.sum}>{sum}</div>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};

export default FeedOrderUserItem;
