import styles from './common-order-feed.module.css';
import { IOrdersList } from '../../features/types/types';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from '../../app/hooks';

interface IOrderNumsList {
	readyOrders: Array<number | string>;
	pendingOrders: Array<number | string>;
}

const Statistics = (): React.JSX.Element => {
	const totalOrdersCount = useSelector((state) => state.order.totalOrdersCount);
	const todayOrdersCount = useSelector((state) => state.order.todayOrdersCount);
	const [ordersNums, setOrdersNums] = useState<IOrderNumsList | undefined>(
		undefined
	);
	const orders = useSelector((state) => state.order.orders);
	useEffect(() => {
		if (orders) {
			setOrdersNums(listOrders(orders));
		}
	}, [orders]);
	const listOrders = (orders: IOrdersList[]): IOrderNumsList => {
		const orderNums: IOrderNumsList = { readyOrders: [], pendingOrders: [] };
		if (orders && orders.length > 0) {
			orders.forEach((order: IOrdersList) => {
				if (order.status === 'done') {
					orderNums.readyOrders[orderNums.readyOrders.length] = order.number;
				} else if (order.status === 'pending') {
					orderNums.pendingOrders[orderNums.pendingOrders.length] =
						order.number;
				}
			});
		}
		return orderNums;
	};
	const firstReadyOrderColumn = useRef(null);
	const secondReadyOrderColumn = useRef(null);
	const firstPendingOrderColumn = useRef(null);
	const secondPendingOrderColumn = useRef(null);
	return (
		<div className={styles.statDiv}>
			<div className={styles.orderQueue}>
				<div className={styles.orderQueueReady}>
					<div className='text_type_main-medium'>Готовы:</div>
					<div className={styles.orderQueueGroup}>
						<div className={styles.orderQueueList} ref={firstReadyOrderColumn}>
							{ordersNums?.readyOrders?.map(
								(number, index) =>
									index <= 9 && (
										<div
											key={index}
											className='text_type_digits-default text_color_success'>
											{number}
										</div>
									)
							)}
						</div>
						<div className={styles.orderQueueList} ref={secondReadyOrderColumn}>
							{ordersNums?.readyOrders?.map(
								(number, index) =>
									index >= 10 &&
									index <= 19 && (
										<div
											key={index}
											className='text_type_digits-default text_color_success'>
											{number}
										</div>
									)
							)}
						</div>
					</div>
				</div>
				<div className={styles.orderQueueProcess}>
					<div className='text_type_main-medium'>В работе:</div>
					<div className={styles.orderQueueGroup}>
						<div
							className={styles.orderQueueList}
							ref={firstPendingOrderColumn}>
							{ordersNums?.pendingOrders?.map(
								(number, index) =>
									index <= 9 && (
										<div key={index} className='text_type_digits-default'>
											{number}
										</div>
									)
							)}
						</div>
						<div
							className={styles.orderQueueList}
							ref={secondPendingOrderColumn}>
							{ordersNums?.pendingOrders?.map(
								(number, index) =>
									index >= 10 &&
									index <= 19 && (
										<div key={index} className='text_type_digits-default'>
											{number}
										</div>
									)
							)}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.ordersCounter}>
				<div className='text_type_main-medium'>Выполнено за всё время:</div>
				<div className={`${styles.neonText} text_type_digits-large`}>
					{totalOrdersCount}
				</div>
			</div>
			<div className={styles.ordersCounter}>
				<div className='text_type_main-medium'>Выполнено за сегодня:</div>
				<div className={`${styles.neonText} text_type_digits-large`}>
					{todayOrdersCount}
				</div>
			</div>
		</div>
	);
};

export default Statistics;
