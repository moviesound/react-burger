import React, { useEffect, useState } from 'react';
import styles from './common-order-feed.module.css';
import { apiSlice } from '../../features/api/api-slice';
import FeedOrder from './feed-order';
import { Link, useBeforeUnload, useLocation } from 'react-router';
import { useSelector } from '../../app/hooks';

const CommonOrderFeed = (): React.JSX.Element => {
	const [height, setHeight] = useState<number>(0);
	const [content, setContent] = useState<React.JSX.Element | undefined>(
		undefined
	);
	const location = useLocation();
	apiSlice.useGetOrdersQuery();
	const orders = useSelector((state) => state.order.orders);
	useEffect(() => {
		let c: React.JSX.Element | undefined = undefined;
		if (orders) {
			c = (
				<>
					{orders.map((order, index) => {
						return (
							<Link
								to={`/feed/${order?.number}`}
								state={{ background: location }}
								className={styles.ref}
								key={index}>
								<FeedOrder orderData={order} />
							</Link>
						);
					})}
				</>
			);
		}
		setContent(c);
	}, [orders]);

	//add listner on resizing
	useBeforeUnload((): void => {
		window.removeEventListener('resize', onResizeWindow);
	});
	useEffect(() => {
		window.addEventListener('resize', onResizeWindow);

		onResizeWindow();

		return () => {
			if (onResizeWindow) {
				window.removeEventListener('resize', onResizeWindow);
			}
		};
	}, []);
	//resizer
	const onResizeWindow = () => {
		if (!feedContentRef.current) return;
		const contentPosition = feedContentRef.current.getBoundingClientRect();
		setHeight(window.innerHeight - Math.ceil(contentPosition.top) - 50);
	};

	const feedContentRef = React.useRef<HTMLDivElement>(null);

	return (
		<>
			<h1 className={`${styles.header} text text_type_main-large`}>
				Лента заказов
			</h1>
			<div
				ref={feedContentRef}
				style={{
					height: height,
				}}
				className={`custom-scroll ${styles.scrollerStyle}`}>
				{content}
			</div>
		</>
	);
};

export default CommonOrderFeed;
