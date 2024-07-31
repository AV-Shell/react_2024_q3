import { describe, expect, test, vi } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { App } from '../../App';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { configuredStore } from '../../store/store';

describe('App', () => {
  test('must be', async () => {
    vi.stubGlobal('URL', { createObjectURL: () => 'someUrl' });

    const routes = [
      {
        path: '/',
        element: <App />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', `/?page=1&search=e`],
      initialIndex: 1,
    });

    render(
      <Provider store={configuredStore}>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </Provider>,
    );

    await waitFor(() => screen.getByTestId('appPage'));
    const page = screen.getByTestId<HTMLDivElement>('appPage');
    expect(page).toBeInTheDocument();
  });
});
