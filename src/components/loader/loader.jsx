import React from 'react';
import styles from './loader.module.css';
import * as propTypes from 'prop-types';

const Loader = ({ simple }) => {
	return simple ? (
		<div className={styles.simpleLoader}>Загрузка...</div>
	) : (
		<div className={styles.loader}></div>
	);
};

Loader.propTypes = {
	simple: propTypes.bool,
};

export default Loader;
