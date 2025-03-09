import styles from '../burger-constructor.module.css';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { memo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

export const ConstructorIngredient = memo(function ConstructorIngredient({
	index,
	id,
	notBunSelectedClass,
	ingredient,
	removeIngredient,
	moveIngredient,
}) {
	const ref = useRef(null);
	const [originalIndex, setOriginalIndex] = useState(index);
	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: 'sortable',
			item: () => {
				return { id, index };
			},
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
			end: (item, monitor) => {
				const { index: droppedId } = item;
				const didDrop = monitor.didDrop();
				if (!didDrop) {
					moveIngredient(droppedId, originalIndex);
				}
			},
		}),
		[id, index, moveIngredient]
	);
	const [, drop] = useDrop(
		() => ({
			accept: 'sortable',
			hover: (item, monitor) => {
				if (!ref.current) {
					return;
				}
				const dragIndex = item.index;
				const hoverIndex = index;
				// Don't replace items with themselves
				if (dragIndex === hoverIndex) {
					return;
				}
				// Determine rectangle on screen
				const hoverBoundingRect = ref.current?.getBoundingClientRect();
				// Get vertical middle
				const hoverMiddleY =
					(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
				// Determine mouse position
				const clientOffset = monitor.getClientOffset();
				// Get pixels to the top
				const hoverClientY = clientOffset.y - hoverBoundingRect.top;
				// Only perform the move when the mouse has crossed half of the items height
				// When dragging downwards, only move when the cursor is below 50%
				// When dragging upwards, only move when the cursor is above 50%
				// Dragging downwards
				if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
					return;
				}
				// Dragging upwards
				if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
					return;
				}
				// Time to actually perform the action
				moveIngredient(dragIndex, hoverIndex);
				// Note: we're mutating the monitor item here!
				// Generally it's better to avoid mutations,
				// but it's good here for the sake of performance
				// to avoid expensive index searches.
				item.index = hoverIndex;
			},
		}),
		[moveIngredient]
	);
	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));
	return (
		<li ref={ref} style={{ opacity: opacity }}>
			<div className={styles.moveBox}>
				<DragIcon type='primary' />
			</div>
			<div className={`${notBunSelectedClass} ${styles.ownelement}`}>
				<ConstructorElement
					text={ingredient.name}
					price={ingredient.price}
					thumbnail={ingredient.image_mobile}
					handleClose={() => {
						removeIngredient(ingredient, index);
					}}
				/>
			</div>
		</li>
	);
});
