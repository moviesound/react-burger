import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';

const ModalOverlay = (props) => {
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
