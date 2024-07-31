import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { PersonCardsList } from '../../components/PersonCardsList/PersonCardsList';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { checkbox1, checkbox2 } from '../testdata';
import React, { ReactNode } from 'react';

describe('PersonCardsList', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('Should be render without cards', async () => {
    const text = 'No results';
    const path = '?page=1&search=d';

    const routes = [
      {
        path: `/`,
        element: <PersonCardsList results={[]} />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', `/${path}`],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByText(text));
    expect(screen.getByText(text)).toBeInTheDocument();

    vi.clearAllMocks();
  });
  test('Should be render with cards', async () => {
    const path = '?page=1&search=d';

    const routes = [
      {
        path: `/`,
        element: <PersonCardsList results={[checkbox1, checkbox2]} />,
      },
    ];

    vi.mock('../../store/storeHooks', async () => {
      const mod = await vi.importActual('../../store/storeHooks');
      return {
        ...mod,
        useAppDispatch: () => () => {},
        useAppSelector: () => ({ 4: true }),
      };
    });

    vi.mock('react-router-dom', async () => {
      const mod = await vi.importActual('react-router-dom');
      const myNavLink: React.FC<{ to: string; onClick: () => void; children: ReactNode }> = ({
        to,
        onClick,
        children,
      }) => {
        return (
          <div>
            <span onClick={onClick} className={to}>
              customNavLink
            </span>
            <div>{children}</div>
          </div>
        );
      };

      return {
        ...mod,
        NavLink: myNavLink,
      };
    });

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', `/${path}`],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByText(checkbox2.name));
    expect(screen.getByText(checkbox2.name)).toBeInTheDocument();

    const checkbox = screen.getAllByRole('checkbox');
    checkbox.forEach(c => fireEvent.click(c));

    vi.clearAllMocks();
  });
});
