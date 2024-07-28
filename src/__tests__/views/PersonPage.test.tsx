import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { PersonPage, PersonPageLoader } from '../../views/PersonPage/PersonPage';
import { createMemoryRouter, LoaderFunctionArgs, RouterProvider } from 'react-router-dom';
import { checkbox1 } from '../testdata';
import React, { ReactNode } from 'react';

describe('PersonPageLoader', () => {
  test('Should be getId', async () => {
    const testPersonId = '4';
    const params = { params: { personId: testPersonId } } as unknown as LoaderFunctionArgs;

    const { personId } = await PersonPageLoader(params);
    expect(personId).toBe(testPersonId);

    vi.clearAllMocks();
  });
});

describe('PersonPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('Should be render', async () => {
    const id = checkbox1.id;
    const text = 'PersonPage closed';
    const routes = [
      {
        path: '/person/:personId',
        element: <PersonPage />,
        loader: () => ({ personId: id }),
      },
      {
        path: '/',
        element: <div>{text}</div>,
        loader: () => ({ personId: id }),
      },
    ];

    vi.mock('../../store/storeHooks', async () => {
      const mod = await vi.importActual('../../store/storeHooks');
      return {
        ...mod,
        useAppDispatch: () => () => {},
        useAppSelector: () => {},
      };
    });

    vi.mock('react-router-dom', async () => {
      const mod = await vi.importActual('react-router-dom');
      const myNavLink: React.FC<{ to: string; children: ReactNode }> = ({ to, children }) => {
        return (
          <div>
            <span>{to}</span>
            <div>{children}</div>
          </div>
        );
      };

      return {
        ...mod,
        NavLink: myNavLink,
      };
    });

    vi.mock('../../store/swapiApi', async () => {
      const mod = await vi.importActual('../../store/swapiApi');
      return {
        ...mod,
        useGetPersonByIdQuery: () => ({
          data: checkbox1,
          isLoading: false,
          isFetching: false,
        }),
      };
    });

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', `/person/${id}?page=1&search=d`],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByText(checkbox1.created));
    expect(screen.getByText(checkbox1.created)).toHaveTextContent(checkbox1.created);
    expect(screen.getByText(checkbox1.birth_year)).toHaveTextContent(checkbox1.birth_year);
    expect(screen.getByText(checkbox1.eye_color)).toHaveTextContent(checkbox1.eye_color);

    const closeButton = screen.getByText('/?page=1&search=d');
    expect(closeButton).toHaveTextContent('/?page=1&search=d');

    vi.clearAllMocks();
  });
});
