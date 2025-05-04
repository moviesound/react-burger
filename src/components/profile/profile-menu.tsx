import { Link, NavLink, useNavigate } from 'react-router';
import style from '../../pages/profile/profile.module.css';
import React, { useEffect } from 'react';
import { TProfileMenuProps } from '../../features/types/types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { apiSlice } from '../../features/api/api-slice';
import { apiDefendedSlice } from '../../features/api/api-defended-slice';

const ProfileMenu = ({
	item,
	description,
}: TProfileMenuProps): React.JSX.Element => {
	const [logout] = apiSlice.useLazyLogoutQuery();
	const [updateUser] = apiDefendedSlice.useLazyGetUserQuery();
	const logoutHandler = (): void => {
		logout().then((data) => {
			if (data.isSuccess === true) {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				updateUser(undefined, false);
			}
		});
	};
	return (
		<>
			<Link
				to='/profile'
				className={
					item == 'profile'
						? `${style.ref} text text_type_main-medium`
						: `${style.ref} text text_type_main-medium ${style.inactive}`
				}>
				Профиль
			</Link>
			<Link
				to='/profile/orders'
				className={
					item == 'orders'
						? `${style.ref} text text_type_main-medium`
						: `${style.ref} text text_type_main-medium ${style.inactive}`
				}>
				История заказов
			</Link>
			<Button
				htmlType='button'
				onClick={logoutHandler}
				className={`${style.ref} ${style.inactive} text text_type_main-medium`}>
				Выход
			</Button>
			<div
				className={`${style.description} text text_color_inactive text_type_main-default`}>
				{description}
			</div>
		</>
	);
};

export default ProfileMenu;
