import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { NotFoundPage } from '../../views/404Page/404page';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

describe('NotFoundPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('Router Error', async () => {
    const testTest1 = 'Page not found';
    const FAKE_EVENT = { name: 'test event' };
    const routes = [
      {
        path: '/events',
        element: <NotFoundPage />,
        loader: () => FAKE_EVENT,
      },
    ];

    vi.mock('react-router-dom', async () => {
      const mod = await vi.importActual('react-router-dom');
      return {
        ...mod,
        useRouteError: () => ({
          statusText: 'custom statustest',
          status: 123,
        }),
        isRouteErrorResponse: () => true,
      };
    });

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', '/events'],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByText(testTest1));
    expect(screen.getByText(testTest1)).toHaveTextContent(testTest1);

    vi.clearAllMocks();
  });
});
