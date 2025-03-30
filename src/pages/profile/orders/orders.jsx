import style from '@pages/profile/profile.module.css';
import ProfileMenu from '../../../components/profile/profile-menu';
import React from 'react';

const ProfileOrdersPage = () => {
	return (
		<div className={style.container}>
			<section className={style.content}>
				<div className={style.leftBox}>
					<ProfileMenu item='orders' />
				</div>
				<div className={style.rightBox}>Здесь будет список заказов</div>
			</section>
		</div>
	);
};

export default ProfileOrdersPage;
