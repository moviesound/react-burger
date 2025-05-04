import { useDispatch, useSelector } from '../../../app/hooks';
import styles from './done-order-details.module.css';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { apiSlice } from '../../../features/api/api-slice';
import { IOrdersList, TIngredient } from '../../../features/types/types';
import { showOrderInfo } from '../../../features/order';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';

const DoneOrderDetails = (): React.JSX.Element => {
	const { number } = useParams();
	const orders = useSelector((state) => state.order.orders);
	const privateOrders = useSelector((state) => state.order.privateOrders);
	const [getOrderInfo] = apiSlice.useLazyGetOrderInfoQuery();
	const [orderInfo, setOrderInfo] = useState<IOrdersList | null>(null);
	const [statusColor, setStatusColor] = useState<string>('');
	const [status, setStatus] = useState<string>('');
	const dispatch = useDispatch();
	const { data: result } = apiSlice.useGetIngredientsQuery();
	const ingredientsList = result?.data ?? [];
	const [sum, setSum] = useState<number>(0);
	useEffect(() => {
		if (!orders && !privateOrders) {
			//make query to url
			setOrderViaQuery();
		} else {
			setOrderFromStore();
		}
	}, [orders, privateOrders, number]);

	useEffect(() => {
		if (orderInfo) {
			dispatch(showOrderInfo({ orderModalInfo: orderInfo }));
			if (orderInfo.status === 'done') {
				setStatusColor('text_color_success');
				setStatus('Готово');
			} else if (orderInfo.status === 'created') {
				setStatus('Создан');
			} else {
				setStatus('В работе');
			}
		}
	}, [orderInfo]);
	const setOrderViaQuery = useCallback(() => {
		if (number) {
			getOrderInfo(number).then((response) => {
				setOrderInfo(
					response &&
						response.data &&
						response.data.orders &&
						response.data.orders.length > 0
						? response.data.orders[0]
						: null
				);
			});
		}
	}, [number]);

	const setOrderFromStore = useCallback(() => {
		if (number && orders && orders.length > 0) {
			orders.forEach((order) => {
				if (order.number == number) {
					setOrderInfo(order);
				}
			});
			if (orderInfo === null && privateOrders) {
				privateOrders.forEach((order) => {
					if (order.number == number) {
						setOrderInfo(order);
					}
				});
			}
			if (orderInfo === null) {
				setOrderViaQuery();
			}
		} else {
			setOrderViaQuery();
		}
	}, [orders, privateOrders, number]);

	const showIngredients = (
		ingredientsList: TIngredient[],
		orderInfo: IOrdersList
	): React.ReactNode => {
		if (
			orderInfo &&
			ingredientsList &&
			ingredientsList.length > 0 &&
			orderInfo.ingredients &&
			orderInfo.ingredients.length > 0
		) {
			let bun = false;
			let newSum = 0;
			const html = orderInfo.ingredients.map((ingredientId, index) => {
				return ingredientsList.map((ingredient) => {
					if (ingredient._id == ingredientId) {
						newSum += ingredient.price;
						if (ingredient.type === 'bun' && bun === false) {
							bun = true;
							return showIngredient(ingredient, index, 2);
						} else if (ingredient.type === 'bun' && bun === true) {
							return '';
						} else {
							return showIngredient(ingredient, index, 1);
						}
					} else {
						return '';
					}
				});
			});
			if (sum === 0) {
				setSum(newSum);
			}
			return html;
		}
		return '';
	};

	const showIngredient = (
		ingredient: TIngredient,
		key: number,
		count: number
	): React.ReactNode => {
		return (
			<div className={styles.ingredient} key={key}>
				<div className={styles.ingredientIcon}>
					<img
						alt='ingr'
						src={ingredient.image}
						className={styles.ingredientIconImg}
					/>
				</div>
				<div
					className={`${styles.ingredientDescription} text text_type_main-medium`}>
					{ingredient.name}
				</div>
				<div
					className={`${styles.ingredientSum} text text_type_digits-default`}>
					{count} x {ingredient.price}
				</div>
			</div>
		);
	};

	return (
		<div className={styles.doneOrderDetails}>
			<div className='text text_type_main-medium'>
				{orderInfo && orderInfo.name}
			</div>
			<div className={`${styles.status} ${statusColor} text_type_main-default`}>
				{status}
			</div>
			<div className={`${styles.ingredientsTitle} text_type_main-medium`}>
				Состав:
			</div>
			<div className={`${styles.scroll}  custom-scroll`}>
				<div className={`${styles.ingredientsList}`}>
					{orderInfo &&
						ingredientsList &&
						ingredientsList.length > 0 &&
						orderInfo.ingredients &&
						orderInfo.ingredients.length > 0 &&
						showIngredients(ingredientsList, orderInfo)}
				</div>
			</div>
			<div className={`${styles.orderSumTime}`}>
				{orderInfo && orderInfo.createdAt && (
					<FormattedDate
						date={
							typeof orderInfo.createdAt !== 'undefined'
								? new Date(orderInfo?.createdAt)
								: new Date()
						}
					/>
				)}
				<div className={`${styles.sum} text text_type_digits-default`}>
					<div className={styles.sum}>{sum}</div>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};

export default DoneOrderDetails;
