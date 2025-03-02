import React, { useCallback, useEffect, useRef, useState } from 'react';
import AppHeader from '../components/app-header/app-header';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import style from './app.module.scss';
import Modal from '../components/modal/modal';

export const App = () => {
	//ingredients
	const [ingredients, setIngredients] = useState([]);
	//get ingredients
	useEffect(() => {
		fetch('https://norma.nomoreparties.space/api/ingredients')
			.then((res) => {
				if (!res.ok) {
					throw new Error(`Something went wrong: ${res.status}`);
				}
				return res.json();
			})
			.then((ingredients) => setIngredients(ingredients.data))
			.catch((err) => console.log(err));
	}, []);

	//Modal logic
	//flag on modal is visible or removed from DOM
	const [modalIsVisible, setModalIsVisible] = useState(false);
	//modal parameter: header, content, handler-callback on opening, refs on modal elements
	const [modalHeader, setModalHeader] = useState('');
	const [modalContent, setModalContent] = useState(<></>);
	const [modalHandle, setModalHandle] = useState(null);
	const modalRef = useRef(null);
	const overlayRef = useRef(null);
	const closeBtnRef = useRef(null);

	//open modal event
	const openModal = useCallback((params) => {
		//set modal content, headers and callback handler at opening modal, if handler exists
		setModalHeader(params.header ? params.header : '');
		setModalContent(params.content ? params.content : {});
		setModalHandle(params.handler ? params.handler : null);
		//show modal
		setModalIsVisible(true);
		return '';
	}, []);

	//close modal event
	const closeModal = useCallback(() => {
		//remove event listeners of modal window
		closeBtnRef.current.removeEventListener('click', closeModal);
		overlayRef.current.removeEventListener('click', closeModal);
		modalRef.current.removeEventListener('click', (event) => {
			event.stopPropagation();
		});
		//hide modal
		setModalIsVisible(false);
	}, [closeBtnRef, overlayRef, modalRef]);

	// modal object for DOM
	const modal = (
		<Modal
			overlayRef={overlayRef}
			closeBtnRef={closeBtnRef}
			modalRef={modalRef}
			header={modalHeader}
			handler={modalHandle}
			closeModal={closeModal}>
			{modalContent}
		</Modal>
	);

	return (
		<>
			<div className={style.mainContainer}>
				<AppHeader />
				<section className={style.content}>
					<div className={style.leftBox}>
						<BurgerConstructor
							openModal={openModal}
							ingredients={ingredients}
						/>
					</div>
					<div className={style.rightBox}>
						<BurgerIngredients
							openModal={openModal}
							ingredients={ingredients}
						/>
					</div>
				</section>
			</div>
			{modalIsVisible && modal}
		</>
	);
};
