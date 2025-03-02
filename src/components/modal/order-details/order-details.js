import React from 'react';
import PropTypes from 'prop-types';
import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderDetails = (props) => {
	return (
		<div className={styles.container}>
			<div className={`${styles.orderNumber} text text_type_digits-large`}>
				{props.orderId}
			</div>
			<div className={`${styles.label} text text_type_main-medium`}>
				Идентификатор заказа
			</div>
			<div className={styles.approve}>
				<CheckMarkIcon type='primary' />
			</div>
			<div className={`${styles.textStatus1} text text_type_main-default`}>
				Ваш заказ начали готовить
			</div>
			<div
				className={`${styles.textStatus2} text text_type_main-default text_color_inactive`}>
				Дождитесь готовности на орбитальной станции
			</div>
		</div>
	);
};

OrderDetails.propTypes = {
	orderId: PropTypes.string.isRequired,
};
export default OrderDetails;
