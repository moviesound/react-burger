import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
	useMemo,
} from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientGroup from './ingredient-group/ingredient-group';
import Loader from '../loader/loader';
import { useDispatch, useSelector } from 'react-redux';
import { downloadIngredients } from '../../services/actions/ingredients';
import LoaderError from '../loader-error/loader-error';
import { useBeforeUnload } from 'react-router';

const BurgerIngredients = () => {
	const dispatch = useDispatch();

	//Tabs
	const [currentTab, setCurrentTab] = useState('bun');
	const activateTab = useCallback((tabId) => {
		setCurrentTab(tabId);
		document.querySelector('#' + tabId).scrollIntoView({ behavior: 'smooth' });
	}, []);

	//content Ref for scrolling and resizing events
	const burgerIngredientsContent = useRef(null);
	//height of scrolling element: must be changed at resizing of window
	const [height, setHeight] = useState(0);
	//add listner on resizing
	useBeforeUnload(() => {
		window.removeEventListener('resize', onResizeWindow);
		burgerIngredientsContent.current.removeEventListener(
			'scroll',
			scrollerHandler
		);
	});
	useEffect(() => {
		window.addEventListener('resize', onResizeWindow);

		onResizeWindow();

		return () => {
			if (onResizeWindow) {
				window.removeEventListener('resize', onResizeWindow);
			}
		};
	}, []);
	//resizer
	const onResizeWindow = () => {
		const contentPosition =
			burgerIngredientsContent.current.getBoundingClientRect();
		setHeight(window.innerHeight - Math.ceil(contentPosition.top) - 50);
	};

	//add listner on scrolling ingredients
	useEffect(() => {
		burgerIngredientsContent.current.addEventListener(
			'scroll',
			scrollerHandler
		);
		return () => {
			if (scrollerHandler && burgerIngredientsContent.current) {
				burgerIngredientsContent.current.removeEventListener(
					'scroll',
					scrollerHandler
				);
			}
		};
	});

	var infoBun = useRef(null);
	var infoSauce = useRef(null);
	var infoBunContent = useRef(null);
	var infoSauceContent = useRef(null);

	const scrollerHandler = (e) => {
		var _infoContainer = e.currentTarget.getBoundingClientRect();
		var _infoSauce = infoSauce.current.getBoundingClientRect();
		var _infoBun = infoBun.current.getBoundingClientRect();
		var _infoBunContent = infoBunContent.current.getBoundingClientRect();
		var _infoSauceContent = infoSauceContent.current.getBoundingClientRect();
		if (
			_infoBun.bottom > _infoContainer.top ||
			_infoBunContent.bottom > _infoContainer.top + 50
		) {
			setCurrentTab('bun');
		} else if (
			(_infoSauce.top > _infoContainer.top &&
				_infoSauce.top < _infoContainer.top + 50) ||
			_infoSauceContent.bottom > _infoContainer.top + 50
		) {
			setCurrentTab('sauce');
		} else {
			setCurrentTab('main');
		}
	};

	//loading ingredients
	const { ingredients, requestProcess, requestError } = useSelector((state) => {
		return state.ingredientsReducer;
	});

	useEffect(() => {
		dispatch(downloadIngredients());
	}, [dispatch]);

	const content = useMemo(() => {
		return requestProcess ? (
			<Loader />
		) : requestError ? (
			<LoaderError />
		) : (
			<>
				<IngredientGroup
					ingredients={
						ingredients &&
						ingredients.filter((ingredient) => {
							return ingredient.type == 'bun';
						})
					}
					refId={infoBun}
					refIdContent={infoBunContent}
					type='bun'
				/>
				<IngredientGroup
					ingredients={
						ingredients &&
						ingredients.filter((ingredient) => {
							return ingredient.type == 'sauce';
						})
					}
					refId={infoSauce}
					refIdContent={infoSauceContent}
					type='sauce'
				/>
				<IngredientGroup
					ingredients={
						ingredients &&
						ingredients.filter((ingredient) => {
							return ingredient.type == 'main';
						})
					}
					type='main'
				/>
			</>
		);
	}, [requestProcess, requestError, ingredients]);

	return (
		<>
			<h1 className={`${styles.header} text text_type_main-large`}>
				Соберите бургер
			</h1>
			<nav className={styles.nav}>
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
				ref={burgerIngredientsContent}
				style={{
					height: height,
				}}
				className={`custom-scroll ${styles.scrollerStyle}`}>
				{content}
			</section>
		</>
	);
};

export default BurgerIngredients;
