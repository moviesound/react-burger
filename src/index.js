import { React } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '/src/app';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import './styles.css';

let root = ReactDOM.createRoot(document.getElementById('root'));// as HTMLDivElement;
root.render(
	<App />
);
