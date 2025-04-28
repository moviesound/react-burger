import React from 'react';
import styles from './loader.module.css';
import { LoaderProps } from '../../utils/types';

const Loader = ({ simple }: LoaderProps): React.JSX.Element => {
	return simple ? (
		<div className={styles.simpleLoader}>Загрузка...</div>
	) : (
		<div className={styles.loader}></div>
	);
};

export default Loader;
