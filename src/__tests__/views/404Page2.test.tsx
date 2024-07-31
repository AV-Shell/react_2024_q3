import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { NotFoundPage } from '../../views/404Page/404page';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

describe('NotFoundPage', () => {
  test('NotRouter Error', async () => {
    const testTest1 = 'Unexpected Application Error!';

    const FAKE_EVENT = { name: 'test event' };
    const routes = [
      {
        path: '/events',
        element: <NotFoundPage />,
        loader: () => FAKE_EVENT,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', '/events'],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByText(testTest1));
    expect(screen.getByText(testTest1)).toHaveTextContent(testTest1);
  });
});
