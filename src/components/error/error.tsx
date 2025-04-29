import React from 'react';
import styles from './error.module.css';
import { ErrorProps } from '../../features/types/types';

const Error = ({ text, height }: ErrorProps): React.JSX.Element => {
	return (
		<div
			className={`${styles.loader} ${
				height === false ? styles.noHeight : ''
			} text text_type_main-default text_color_error`}>
			{text}
		</div>
	);
};

export default Error;
