import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { ErrorPage } from "../pages/ErrorPage/ErrorPage";
import SignInPage from "../pages/SignInPage/SignInPage";

export const router = createBrowserRouter([
	{
			path: '/',
			element: <App />,
			errorElement: <ErrorPage />,
	},
	// {
	// 		path: 'signup',
	// 		element: <SignUpPage />,
	// 		children: [],
	// },
	{
			path: 'signin',
			element: <SignInPage />,
	},
	
]);