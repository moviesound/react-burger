import React, { useEffect, useState } from 'react';
import styles from './user-order-feed.module.css';
import { apiSlice } from '../../features/api/api-slice';
import FeedOrderUserItem from './feed-order-user-item';
import { Link, useBeforeUnload, useLocation } from 'react-router';
import { useSelector } from '../../app/hooks';

const CommonOrderFeed = (): React.JSX.Element => {
	const [height, setHeight] = useState<number>(0);
	const [content, setContent] = useState<React.JSX.Element | undefined>(
		undefined
	);
	const location = useLocation();
	apiSlice.useGetPrivateOrdersQuery();
	const orders = useSelector((state) => state.order.privateOrders);
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
								<FeedOrderUserItem key={index} orderData={order} />
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
		<div
			ref={feedContentRef}
			style={{
				height: height,
			}}
			className={`custom-scroll ${styles.scrollerStyle}`}>
			{content}
		</div>
	);
};

export default CommonOrderFeed;
