import { FC } from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import './404page.css';

export const NotFoundPage: FC = () => {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText + ':  ' + error.status;
  } else {
    throw error;
  }

  return (
    <div id="error-page" className="errorPage">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p>Page not found</p>
      <p className="text-slate-400">
        <i>{errorMessage}</i>
      </p>
    </div>
  );
};
