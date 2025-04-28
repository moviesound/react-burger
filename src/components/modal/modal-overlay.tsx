import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { TModalOverlay } from '../../utils/types';

const ModalOverlay = (props: TModalOverlay): React.JSX.Element => {
	return (
		<div className={styles.modalOverlay} ref={props.overlayRef}>
			{props.children}
		</div>
	);
};
ModalOverlay.propTypes = {
	children: PropTypes.node.isRequired,
	overlayRef: PropTypes.object.isRequired,
};
export default ModalOverlay;
