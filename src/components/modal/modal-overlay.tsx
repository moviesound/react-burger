import React from 'react';
import styles from './modal.module.css';
import { TModalOverlay } from '../../features/types/types';

const ModalOverlay = (props: TModalOverlay): React.JSX.Element => {
	return (
		<div
			role='presentation'
			className={styles.modalOverlay}
			ref={props.overlayRef}
			onClick={props.onClose}>
			{props.children}
		</div>
	);
};
export default ModalOverlay;
