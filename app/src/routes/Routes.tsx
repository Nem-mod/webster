import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { ErrorPage } from '../pages/ErrorPage/ErrorPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignUpPage from '../pages/SigUpPage/SignUpPage';
import VerificationPage from '../pages/VerificationPage/VerificationPage';
import SubmitVerificationPage from '../pages/SubmitVerificationPage/SubmitVerificationPage';
import HomePage from '../pages/HomePage/HomePage';
import CanvasPage from '../pages/CanvasPage/CanvasPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: 'signup',
		element: <SignUpPage />,
		children: [],
	},
	{
		path: 'signin',
		element: <SignInPage />,
	},
	{
		path: '/sign-up/success',
		element: <VerificationPage />,
	},
	{
		path: '/verify',
		element: <SubmitVerificationPage />,
	},
	{
		path: '/home',
		element: <HomePage />,
	},
	{
		path: '/workspace/:id',
		element: <CanvasPage/>
	},
]);
