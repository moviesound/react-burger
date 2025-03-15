import React from 'react';
import styles from './loader-error.module.css';

const LoaderError = () => {
	return <div className={styles.loader}>Произошла ошибка при загрузке.</div>;
};

export default LoaderError;