import { render, screen, waitFor } from '@testing-library/react';
import { afterAll, afterEach, describe, expect, test, vi } from 'vitest';
import PersonPage from '@/components/person-page/person-page';
import { checkbox1 } from '../testdata';
import React from 'react';

const mocks = vi.hoisted(() => {
  return {
    useRouter: vi.fn(),
    useSearchParams: vi.fn(),
    usePathname: vi.fn(),
  };
});

vi.mock('next/navigation', async () => {
  const mod = await vi.importActual('next/navigation');
  return {
    ...mod,
    useRouter: mocks.useRouter,
    useSearchParams: mocks.useSearchParams,
    usePathname: mocks.usePathname,
  };
});

afterEach(() => {
  vi.resetAllMocks();
  vi.unstubAllGlobals();
});
afterAll(() => {
  vi.resetAllMocks();
  vi.unstubAllGlobals();
});

describe('PersonPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('Should be render', async () => {
    const id = checkbox1.id;
    mocks.useRouter.mockImplementation(() => ({ asPath: `/?personId=${id}&page=${1}&search=${checkbox1.name[0]}` }));
    mocks.usePathname.mockImplementation(() => '/');
    mocks.useSearchParams.mockImplementation(() => [
      ['personId', id],
      ['page', 1],
      ['search', checkbox1.name[0]],
    ]);

    vi.mock('../../store/storeHooks', async () => {
      const mod = await vi.importActual('../../store/storeHooks');
      return {
        ...mod,
        useAppDispatch: () => () => {},
        useAppSelector: () => {},
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

    render(<PersonPage />);

    await waitFor(() => screen.getByText(checkbox1.created));
    expect(screen.getByText(checkbox1.created)).toHaveTextContent(checkbox1.created);
    expect(screen.getByText(checkbox1.birth_year)).toHaveTextContent(checkbox1.birth_year);
    expect(screen.getByText(checkbox1.eye_color)).toHaveTextContent(checkbox1.eye_color);

    const closeButton = screen.getByTestId('closeButton');
    expect(closeButton).toBeInTheDocument();

    vi.resetAllMocks();
  });
  test('Shouldnt be render without personId', async () => {
    mocks.useRouter.mockImplementation(() => ({ asPath: `/?page=${1}&search=${checkbox1.name[0]}` }));
    mocks.usePathname.mockImplementation(() => '/');
    mocks.useSearchParams.mockImplementation(() => [
      ['page', 1],
      ['search', checkbox1.name[0]],
    ]);

    vi.mock('../../store/storeHooks', async () => {
      const mod = await vi.importActual('../../store/storeHooks');
      return {
        ...mod,
        useAppDispatch: () => () => {},
        useAppSelector: () => {},
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

    render(<PersonPage />);

    const submitButton = screen.queryByText('Close');
    expect(submitButton).toBeNull();

    vi.resetAllMocks();
  });
});
