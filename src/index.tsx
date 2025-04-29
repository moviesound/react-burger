import React from 'react';
import { BrowserRouter as Router } from 'react-router';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import './styles.css';
import { Provider } from 'react-redux';
import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
);
