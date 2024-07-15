import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx';
import { PersonPage, PersonPageLoader } from './views/PersonPage/PersonPage.tsx';
import { NotFoundPage } from './views/404Page/404page.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,

    // loader: rootLoader,
    // action: rootAction,
    children: [
      {
        path: 'person/:personId',
        element: <PersonPage />,
        loader: PersonPageLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>,
);
