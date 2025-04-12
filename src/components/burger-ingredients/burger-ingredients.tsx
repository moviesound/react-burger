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
import { useSelector, useDispatch } from '../../services/store';
import { downloadIngredients } from '../../services/actions/ingredients';
import LoaderError from '../loader-error/loader-error';
import { useBeforeUnload } from 'react-router';
import { Scrolling, TAppState, TIngredient } from '../../utils/types';

const BurgerIngredients = (): React.JSX.Element => {
	const dispatch = useDispatch();

	//Tabs
	const [currentTab, setCurrentTab] = useState<string>('bun');
	const activateTab = useCallback((tabId: string): void => {
		setCurrentTab(tabId);
		const el: HTMLHeadingElement | null = document.querySelector('#' + tabId);
		if (!el) return;
		el.scrollIntoView({ behavior: 'smooth' });
	}, []);

	//content Ref for scrolling and resizing events
	const burgerIngredientsContent = useRef<HTMLDivElement>(null);
	//height of scrolling element: must be changed at resizing of window
	const [height, setHeight] = useState<number>(0);

	const infoBun = useRef<HTMLHeadingElement>(null);
	const infoSauce = useRef<HTMLHeadingElement>(null);
	const infoBunContent = useRef<HTMLDivElement>(null);
	const infoSauceContent = useRef<HTMLDivElement>(null);

	const scrollerHandler = (e: React.WheelEvent<HTMLDivElement>): void => {
		if (!e.currentTarget) return;
		if (!infoSauce.current) return;
		if (!infoBun.current) return;
		if (!infoBunContent.current) return;
		if (!infoSauceContent.current) return;

		const _infoContainer = e.currentTarget.getBoundingClientRect();
		const _infoSauce = infoSauce.current.getBoundingClientRect();
		const _infoBun = infoBun.current.getBoundingClientRect();
		const _infoBunContent = infoBunContent.current.getBoundingClientRect();
		const _infoSauceContent = infoSauceContent.current.getBoundingClientRect();
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
	const ingredients: TIngredient[] = useSelector(
		(state: TAppState): TIngredient[] => {
			return state.ingredientsReducer.ingredients;
		}
	);
	const requestProcess: boolean = useSelector((state: TAppState): boolean => {
		return state.ingredientsReducer.requestProcess;
	});

	const requestFailed: boolean = useSelector((state: TAppState): boolean => {
		return state.ingredientsReducer.requestFailed;
	});

	useEffect(() => {
		dispatch(downloadIngredients());
	}, [dispatch]);

	const content = useMemo(() => {
		return requestProcess ? (
			<Loader />
		) : requestFailed ? (
			<LoaderError />
		) : (
			<>
				<IngredientGroup
					ingredients={
						ingredients &&
						ingredients.filter((ingredient: TIngredient): boolean => {
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
						ingredients.filter((ingredient: TIngredient): boolean => {
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
						ingredients.filter((ingredient: TIngredient): boolean => {
							return ingredient.type == 'main';
						})
					}
					type='main'
				/>
			</>
		);
	}, [requestProcess, requestFailed, ingredients]);

	//add listner on resizing
	useBeforeUnload((): void => {
		window.removeEventListener('resize', onResizeWindow);
		if (!burgerIngredientsContent.current) return;
		const el: Scrolling<HTMLDivElement> = burgerIngredientsContent.current;
		el.removeEventListener('scroll', scrollerHandler);
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
		if (!burgerIngredientsContent.current) return;
		const contentPosition =
			burgerIngredientsContent.current.getBoundingClientRect();
		setHeight(window.innerHeight - Math.ceil(contentPosition.top) - 50);
	};

	//add listner on scrolling ingredients
	useEffect(() => {
		window.removeEventListener('resize', onResizeWindow);
		if (!burgerIngredientsContent.current) return;
		const el: Scrolling<HTMLDivElement> = burgerIngredientsContent.current;
		el.addEventListener('scroll', scrollerHandler);
		return () => {
			if (scrollerHandler) {
				el.removeEventListener('scroll', scrollerHandler);
			}
		};
	});

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
			<div
				ref={burgerIngredientsContent}
				style={{
					height: height,
				}}
				className={`custom-scroll ${styles.scrollerStyle}`}>
				{content}
			</div>
		</>
	);
};

export default BurgerIngredients;
