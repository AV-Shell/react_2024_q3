import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx';
import { NotFoundPage } from './views/404Page/404page.tsx';
import { Provider } from 'react-redux';
import { configuredStore } from './store/store.ts';
import { MainPage } from './views/MainPage/MainPage.tsx';
import { ControlledFormPage } from './views/ControlledFormPage/ControlledFormPage';
import { UncontrolledFormPage } from './views/UncontrolledFormPage/UncontrolledFormPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/controlled',
    element: <ControlledFormPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/uncontrolled',
    element: <UncontrolledFormPage />,
    errorElement: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={configuredStore}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
);
