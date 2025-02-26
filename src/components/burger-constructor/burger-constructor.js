import React, { useCallback, useEffect, useRef, useState } from 'react';
import constructorStyles from './burger-constructor.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientGroup from '../ingredient-group/ingredient-group';
import burgerIngredients from '../burger-ingredients/burger-ingredients';
import PropTypes from 'prop-types';

const BurgerConstructor = (props) => {
	//Tabs
	const [currentTab, setCurrentTab] = useState('bun');
	const activateTab = useCallback((tabId) => {
		setCurrentTab(tabId);
		document.querySelector('#' + tabId).scrollIntoView({ behavior: 'smooth' });
	}, []);

	//content Ref for scrolling and resizing events
	const burgerConstructorContent = useRef(null);
	//height of scrolling element: must be changed at resizing of window
	const [heightConstructor, setHeightConstructor] = useState(0);
	//add listner on resizing
	useEffect(() => {
		window.addEventListener('resize', onResizeWindow);

		onResizeWindow();

		return () => {
			window.removeEventListener('resize', onResizeWindow);
		};
	}, []);
	//resizer
	const onResizeWindow = () => {
		const contentPosition =
			burgerConstructorContent.current.getBoundingClientRect();
		setHeightConstructor(
			window.innerHeight - Math.ceil(contentPosition.top) - 50
		);
	};

	//add listner on scrolling constructor ingredients
	useEffect(() => {
		burgerConstructorContent.current.addEventListener(
			'scroll',
			scrollerHandler
		);
		return () => {
			window.removeEventListener('scroll', scrollerHandler);
		};
	});

	const scrollerHandler = (e) => {
		var infoContainer = e.currentTarget.getBoundingClientRect();
		var infoBun = document.getElementById('bun').getBoundingClientRect();
		var infoBunContent = document
			.getElementById('bun-content')
			.getBoundingClientRect();
		var infoSauce = document.getElementById('sauce').getBoundingClientRect();
		var infoSauceContent = document
			.getElementById('sauce-content')
			.getBoundingClientRect();
		if (
			infoBun.bottom > infoContainer.top ||
			infoBunContent.bottom > infoContainer.top + 250
		) {
			setCurrentTab('bun');
		} else if (
			(infoSauce.top > infoContainer.top &&
				infoSauce.top < infoContainer.top + 250) ||
			infoSauceContent.bottom > infoContainer.top + 250
		) {
			setCurrentTab('sauce');
		} else {
			setCurrentTab('main');
		}
	};

	return (
		<>
			<h1 className={`${constructorStyles.header} text text_type_main-large`}>
				Соберите бургер
			</h1>
			<nav className={constructorStyles.nav}>
				<Tab value='bun' active={currentTab === 'bun'} onClick={activateTab}>
					Булки
				</Tab>
				<Tab
					value='sauce'
					active={currentTab === 'sauce'}
					onClick={activateTab}>
					Соусы
				</Tab>
				<Tab value='main' active={currentTab === 'main'} onClick={activateTab}>
					Начинки
				</Tab>
			</nav>
			<section
				ref={burgerConstructorContent}
				style={{
					height: heightConstructor,
					overflowY: 'auto',
					overflowX: 'hidden',
				}}
				className='custom-scroll'>
				<IngredientGroup
					ingredients={props.ingredients.filter((ingredient) => {
						return ingredient.type == 'bun';
					})}
					type='bun'
					openModal={props.openModal}
				/>
				<IngredientGroup
					ingredients={props.ingredients.filter((ingredient) => {
						return ingredient.type == 'sauce';
					})}
					type='sauce'
					openModal={props.openModal}
				/>
				<IngredientGroup
					ingredients={props.ingredients.filter((ingredient) => {
						return ingredient.type == 'main';
					})}
					type='main'
					openModal={props.openModal}
				/>
			</section>
		</>
	);
};

burgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string.isRequired,
		calories: PropTypes.number.isRequired,
		carbohydrates: PropTypes.number.isRequired,
		fat: PropTypes.number.isRequired,
		proteins: PropTypes.number.isRequired,
		price: PropTypes.number.isRequired,
		type: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		image_large: PropTypes.string.isRequired,
		image_mobile: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	})).isRequired,
	openModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
