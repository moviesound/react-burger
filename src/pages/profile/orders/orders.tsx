import style from '@pages/profile/profile.module.css';
import ProfileMenu from '../../../components/profile/profile-menu';
import React from 'react';
import UserOrderFeed from '../../../components/user-order-feed/user-order-feed';

const ProfileOrdersPage = (): React.JSX.Element => {
	const description = (
		<span>
			В этом разделе вы можете
			<br />
			просмотреть свою историю заказов
		</span>
	);
	return (
		<div className={style.container}>
			<section className={style.content}>
				<div className={style.leftBox}>
					<ProfileMenu item='orders' description={description} />
				</div>
				<div className={style.rightBox}>
					<UserOrderFeed />
				</div>
			</section>
		</div>
	);
};

export default ProfileOrdersPage;
