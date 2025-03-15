import React from 'react';
import AppHeader from '../components/app-header/app-header';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import style from './app.module.scss';
import Modal from '../components/modal/modal';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';

export const App = () => {
	//Modal logic
	//flag on modal is visible or removed from DOM
	const modalIsVisible = useSelector((state) => {
		return state.modalReducer.modalIsVisible;
	});

	return (
		<>
			<div className={style.mainContainer}>
				<AppHeader />
				<section className={style.content}>
					<DndProvider backend={HTML5Backend}>
						<div className={style.leftBox}>
							<BurgerIngredients />
						</div>
						<div className={style.rightBox}>
							<BurgerConstructor />
						</div>
					</DndProvider>
				</section>
			</div>
			{modalIsVisible && <Modal />}
		</>
	);
};
