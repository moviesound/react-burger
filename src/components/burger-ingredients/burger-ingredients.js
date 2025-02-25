import React, { useEffect, useState, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ButtonOrder from '../button-order/button-order';

const burgerIngredients = (props) => {
	const [heightIngredients, setHeightIngredients] = useState(0);
	const [maxHeightIngredients, setMaxHeightIngredients] = useState(1000);
	const burgerIngredientsContent = useRef(null);

	//add listner on resizing
	useEffect(() => {
		window.addEventListener('resize', onResizeWindow);
		onResizeWindow();
		return () => {
			window.removeEventListener('resize', onResizeWindow);
		};
	}, [props]);

	//resizer
	const onResizeWindow = () => {
		//maxheight
		let amount = 0;
		for (var i in props.ingredients) {
			if (props.ingredients[i].type != 'bun') {
				amount += 1;
			}
		}
		setMaxHeightIngredients(90 * amount - 10);

		//height
		const contentPosition =
			burgerIngredientsContent.current.getBoundingClientRect();
		setHeightIngredients(
			window.innerHeight - Math.ceil(contentPosition.top) - 250
		);
	};

	return (
		<section className={styles.section}>
			<div className={styles.topIngredient}>
				{props && props.ingredients && props.ingredients.length > 0 && (
					<ConstructorElement
						type='top'
						isLocked={true}
						text={props.ingredients[0].name}
						price={props.ingredients[0].price}
						thumbnail={props.ingredients[0].image_mobile}
					/>
				)}
			</div>
			<ul
				className={`${styles.list} custom-scroll`}
				ref={burgerIngredientsContent}
				style={{
					height: heightIngredients,
					overflowY: 'auto',
					overflowX: 'hidden',
					maxHeight: maxHeightIngredients,
				}}>
				{props.ingredients.map(
					(ingredient, index) =>
						index !== 0 &&
						index !== props.ingredients.length - 1 && (
							<li key={ingredient._id}>
								<div className={styles.moveBox}>
									<DragIcon type='primary' />
								</div>
								<ConstructorElement
									text={ingredient.name}
									price={ingredient.price}
									thumbnail={ingredient.image_mobile}
								/>
							</li>
						)
				)}
			</ul>
			<div className={styles.bottomIngredient}>
				{props && props.ingredients && props.ingredients.length > 0 && (
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={props.ingredients[props.ingredients.length - 1].name}
						price={props.ingredients[props.ingredients.length - 1].price}
						thumbnail={
							props.ingredients[props.ingredients.length - 1].image_mobile
						}
					/>
				)}
			</div>
			<div style={{ textAlign: 'center' }}>
				<ButtonOrder
					ingredients={props.ingredients}
					openModal={props.openModal}
				/>
			</div>
		</section>
	);
};

burgerIngredients.propTypes = {
	ingredients: PropTypes.array.isRequired,
	openModal: PropTypes.func.isRequired,
};
export default burgerIngredients;
