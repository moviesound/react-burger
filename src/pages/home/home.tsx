import React from 'react';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import style from './home.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from '../../services/store';
import ModalPopup from '../../components/modal/modal-popup';
import { TAppState } from '@utils/types';

const Home = (): React.JSX.Element => {
	//Modal logic
	//flag on modal is visible or removed from DOM
	const modalIsVisible: boolean = useSelector((state: TAppState): boolean => {
		return state.modalReducer.modalIsVisible;
	});

	return (
		<>
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
			{modalIsVisible && <ModalPopup />}
		</>
	);
};

export default Home;
