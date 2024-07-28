import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { PersonCard } from '../../components/PersonCard/PersonCard';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { checkbox1 } from '../testdata';
import React, { ReactNode } from 'react';

describe('PersonCard', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('Should be render', async () => {
    const text = 'PersonPage opened';
    const path = '?page=1&search=d';

    const routes = [
      {
        path: `/`,
        element: <PersonCard person={checkbox1} />,
      },
      {
        path: '/person/:personId',
        element: <div>{text}</div>,
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

    await waitFor(() => screen.getByText(checkbox1.name));
    expect(screen.getByText(checkbox1.name)).toHaveTextContent(checkbox1.name);
    expect(screen.getByText(checkbox1.skin_color)).toHaveTextContent(checkbox1.skin_color);
    expect(screen.getByText(checkbox1.gender)).toHaveTextContent(checkbox1.gender);

    const link = screen.getByText('customNavLink');
    fireEvent.click(link);
    expect(link).toHaveAttribute('class', `person/${checkbox1.id}${path}`);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(link).toHaveAttribute('class', `person/${checkbox1.id}${path}`);

    vi.clearAllMocks();
  });
});
