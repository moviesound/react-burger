import React from 'react';
import styles from './error.module.css';
import PropTypes from 'prop-types';

const Error = ({ text, height }) => {
	return (
		<div
			className={`${styles.loader} ${
				height === false ? styles.noHeight : ''
			} text text_type_main-default text_color_error`}>
			{text}
		</div>
	);
};

Error.propTypes = {
	text: PropTypes.string.isRequired,
	height: PropTypes.bool,
};

export default Error;
