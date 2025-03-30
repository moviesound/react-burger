import React, { useState } from 'react';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import appStyles from './app-header.module.css';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router';

const AppHeader = () => {
	const user = useSelector((state) => state.authReducer.user);
	return (
		<>
			<section className={appStyles.section} id='app-header'>
				<header className={appStyles.header}>
					<nav className={appStyles.nav}>
						<ul className={appStyles.leftMenu}>
							<li className='text text_type_main-default '>
								<NavLink
									className={({ isActive }) =>
										isActive
											? `${appStyles.ref} ${appStyles.isActive}`
											: `${appStyles.ref} text_color_inactive`
									}
									to='/'>
									{({ isActive }) => (
										<>
											<BurgerIcon type={isActive ? 'primary' : 'secondary'} />
											<div className={appStyles.menuText}>Конструктор</div>
										</>
									)}
								</NavLink>
							</li>
							<li className='text text_type_main-default '>
								<NavLink
									className={({ isActive }) =>
										isActive
											? `${appStyles.ref} ${appStyles.isActive}`
											: `${appStyles.ref} text_color_inactive`
									}
									to='/orders'>
									{({ isActive }) => (
										<>
											<ListIcon type={isActive ? 'primary' : 'secondary'} />
											<div className={appStyles.menuText}>Лента заказов</div>
										</>
									)}
								</NavLink>
							</li>
						</ul>
						<div className={appStyles.logoMenu}>
							<Logo />
						</div>
						<ul className={appStyles.rightMenu}>
							<li className='text text_type_main-default text_color_inactive'>
								<NavLink
									className={({ isActive }) =>
										isActive
											? `${appStyles.ref} ${appStyles.isActive}`
											: `${appStyles.ref} text_color_inactive`
									}
									to='/profile'>
									{({ isActive }) => (
										<>
											<ProfileIcon type={isActive ? 'primary' : 'secondary'} />
											<div className={appStyles.menuText}>Личный кабинет</div>
										</>
									)}
								</NavLink>
							</li>
						</ul>
					</nav>
				</header>
			</section>
		</>
	);
};

export default AppHeader;
