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
import LoaderError from '../loader-error/loader-error';
import { useBeforeUnload } from 'react-router';
import { Scrolling } from '../../features/types/types';
import { apiSlice } from '../../features/api/api-slice';
import { useDispatch } from '../../app/hooks';
import { loadIngredients } from '../../features/ingredients';

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
	const {
		data: result,
		isLoading,
		isError,
	} = apiSlice.useGetIngredientsQuery();
	const ingredientsList = result?.data ?? [];
	useEffect(() => {
		dispatch(loadIngredients({ ingredients: ingredientsList }));
	}, [ingredientsList]);

	const content = useMemo(() => {
		return isLoading ? (
			<Loader />
		) : isError ? (
			<LoaderError />
		) : (
			<>
				<IngredientGroup
					refId={infoBun}
					refIdContent={infoBunContent}
					type='bun'
				/>
				<IngredientGroup
					refId={infoSauce}
					refIdContent={infoSauceContent}
					type='sauce'
				/>
				<IngredientGroup type='main' />
			</>
		);
	}, [isLoading, isError, ingredientsList]);

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
