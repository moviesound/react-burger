import styles from './orders-details.module.css';
import DoneOrderDetails from '../../components/modal/done-order-details/done-order-details';
import { useSelector } from '../../app/hooks';

const OrderDetailsPage = (): React.JSX.Element => {
	const orderModalInfo = useSelector((state) => state.order.orderModalInfo);
	return (
		<div className={styles.container}>
			<div className={`${styles.number} text text_type_digits-medium`}>
				#{orderModalInfo && orderModalInfo.number}
			</div>
			<DoneOrderDetails />
		</div>
	);
};
export default OrderDetailsPage;
