import React from 'react';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import appStyles from './app-header.module.css';

const AppHeader = () => {
	return (
		<>
			<section className={appStyles.section} id='app-header'>
				<header className={appStyles.header}>
					<nav className={appStyles.nav}>
						<ul className={appStyles.leftMenu}>
							<li className='text text_type_main-default'>
								<BurgerIcon type='primary' />
								<div className={appStyles.menuText}>Конструктор</div>
							</li>
							<li className='text text_type_main-default text_color_inactive'>
								<ListIcon type='secondary' />
								<div className={appStyles.menuText}>Лента заказов</div>
							</li>
						</ul>
						<div className={appStyles.logoMenu}>
							<Logo />
						</div>
						<ul className={appStyles.rightMenu}>
							<li className='text text_type_main-default text_color_inactive'>
								<ProfileIcon type='secondary' />
								<div className={appStyles.menuText}>Личный кабинет</div>
							</li>
						</ul>
					</nav>
				</header>
			</section>
		</>
	);
};

export default AppHeader;
