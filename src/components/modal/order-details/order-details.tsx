import React, { useMemo } from 'react';
import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../../app/hooks';
import Loader from '../../loader/loader';

const OrderDetails = () => {
	const order = useSelector((state) => {
		return state.order.order;
	});
	const burgerName: '' | React.JSX.Element | undefined = useMemo(() => {
		return (
			order &&
			order.name && (
				<>
					<br />
					<div className='text text_type_main-medium text_color_accent'>
						{order.name}
					</div>
				</>
			)
		);
	}, [order]);
	return order ? (
		<div className={styles.container}>
			<div className={`${styles.orderNumber} text text_type_digits-large`}>
				{order.order.number}
			</div>
			<div className={`${styles.label} text text_type_main-medium`}>
				Идентификатор заказа
			</div>
			<div className={styles.approve}>
				<CheckMarkIcon type='primary' />
			</div>
			<div className={`${styles.textStatus1} text text_type_main-default`}>
				Ваш заказ начали готовить
				{burgerName}
			</div>
			<div
				className={`${styles.textStatus2} text text_type_main-default text_color_inactive`}>
				Дождитесь готовности на орбитальной станции
			</div>
		</div>
	) : (
		<Loader />
	);
};

export default OrderDetails;
