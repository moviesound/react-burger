import { Link, NavLink } from 'react-router';
import style from '../../pages/profile/profile.module.css';
import React from 'react';
import { logout } from '../../services/actions/auth';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

const ProfileMenu = ({ item }) => {
	const dispatch = useDispatch();
	const logoutHandler = () => {
		dispatch(logout());
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
			<Link
				onClick={logoutHandler}
				className={`${style.ref} ${style.inactive} text text_type_main-medium`}>
				Выход
			</Link>
			<div
				className={`${style.description} text text_color_inactive text_type_main-default`}>
				В этом разделе вы можете
				<br />
				изменить свои персональные данные
			</div>
		</>
	);
};

ProfileMenu.propTypes = {
	item: PropTypes.string.isRequired,
};

export default ProfileMenu;
