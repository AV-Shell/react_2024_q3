import { afterAll, afterEach, describe, expect, test, vi } from 'vitest';
import { Pagination } from '../../components/Pagination/Pagination';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import * as reactRouterDom from 'react-router-dom';

const mocks = vi.hoisted(() => {
  return {
    useAppSelector: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

vi.mock('../../store/storeHooks', () => {
  return {
    useAppSelector: mocks.useAppSelector,
  };
});

describe('Pagination', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  afterAll(() => {
    vi.resetAllMocks();
  });
  test('Should be render without buttons', async () => {
    const routes = [
      {
        path: '/',
        element: <Pagination />,
      },
    ];

    mocks.useAppSelector.mockImplementation(() => ({ isLoading: true, persons: { count: 0 } }));

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', `/?page=1&search=d`],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByTestId('paginationContainer'));
    const container = screen.getByTestId('paginationContainer');

    expect(container).toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
  });
  test('Should be render with disabled buttons', async () => {
    const routes = [
      {
        path: '/',
        element: <Pagination />,
      },
    ];

    mocks.useAppSelector.mockImplementation(() => ({ isLoading: true, persons: { count: 82 } }));

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', `/?page=1&search=d`],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getAllByRole('button'));

    const buttons = screen.getAllByRole('button');

    buttons.forEach(b => {
      expect(b).toHaveAttribute('disabled');
    });
    expect(buttons.length).toBe(9);
  });
  test('Should be render with not disabled buttons', async () => {
    const setSearchParams = vi.fn();
    const spyPage = vi.fn();

    setSearchParams.mockImplementation((a: URLSearchParams) => spyPage(a.get('page')));
    vi.spyOn(reactRouterDom, 'useSearchParams').mockReturnValue([new URLSearchParams('?page=1'), setSearchParams]);

    mocks.useAppSelector.mockImplementation(() => ({ isLoading: false, persons: { count: 51 } }));

    const routes = [
      {
        path: '/',
        element: <Pagination />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', `/?page=1&search=d`],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getAllByRole('button'));

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(6);
    fireEvent.click(buttons[5]);
    expect(spyPage).toHaveBeenCalledWith('6');
  });
});
