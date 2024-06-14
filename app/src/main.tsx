import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { store } from './redux/store.ts';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<NextUIProvider>
			<Provider store={store}>
			<RouterProvider router={router} />
			</Provider>
		</NextUIProvider>
	</React.StrictMode>
);
