import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import {CustomNavBar} from "../../components/NavBar/CustomNavBar.tsx";
export const ErrorPage= () => {
    const error = useRouteError();
    let errorMessage: string;

    if (isRouteErrorResponse(error)) {
        // @ts-ignore
        errorMessage = error.error?.message || error.statusText;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        console.error(error);
        errorMessage = 'Unknown error';
    }

    return (
        <div className={'flex flex-col h-screen'}>
          <CustomNavBar/>
          <div id='error-page' className='flex flex-col gap-8 justify-center items-center grow'>
              <h1 className='text-4xl font-bold'>Oops!</h1>
              <p>Sorry, an unexpected error has occurred.</p>
              <p className='text-slate-400'>
                  <i>{errorMessage}</i>
              </p>
          </div>
        </div>
    );
};