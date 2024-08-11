import { afterAll, afterEach, describe, expect, test, vi } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import PersonsPage from '@/components/persons-page/persons-page';
import { Provider } from 'react-redux';
import { configuredStore } from '@/store/store';

describe('PersonsPage', () => {
  afterEach(() => {
    vi.resetAllMocks();
    vi.unstubAllGlobals();
  });
  afterAll(() => {
    vi.resetAllMocks();
    vi.unstubAllGlobals();
  });

  test('must be rendered', async () => {
    class mockUrl {
      searchParams;

      constructor() {
        this.searchParams = {
          entries: () => [
            ['personId', '1'],
            ['page', '1'],
            ['search', '1'],
          ],
        };
      }

      static createObjectURL() {
        return `/?personId=1&page=1&search=1`;
      }
    }

    vi.stubGlobal('URL', mockUrl);

    const mocks = vi.hoisted(() => {
      return {
        useAppSelector: vi.fn(),
        useAppDispatch: vi.fn(),
        useRouter: vi.fn(),
        useSearchParams: vi.fn(),
        usePathname: vi.fn(),
        push: vi.fn(),
        Inter: vi.fn(),
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

    vi.mock('../../store/storeHooks', async () => {
      const mod = await vi.importActual('../../store/storeHooks');
      return {
        ...mod,
        useAppDispatch: () => () => {},
        useAppSelector: mocks.useAppSelector,
      };
    });

    vi.mock('next/font/google', async () => {
      const mod = await vi.importActual('next/font/google');
      return {
        ...mod,
        Inter: () => ({ className: '' }),
      };
    });

    mocks.Inter.mockImplementation(() => ({ className: '' }));
    mocks.useRouter.mockImplementation(() => ({
      asPath: `/?personId=1&page=1&search=1`,
      push: mocks.push,
      route: '/',
    }));
    mocks.usePathname.mockImplementation(() => '/');
    mocks.useSearchParams.mockImplementation(() => [
      ['personId', 1],
      ['page', 1],
      ['search', '1'],
    ]);
    mocks.useAppDispatch.mockImplementation(() => {});
    mocks.useAppSelector.mockImplementation(() => ({ isLoading: true, persons: { count: 0 } }));

    render(
      <Provider store={configuredStore}>
        <PersonsPage />
      </Provider>,
    );

    await waitFor(() => screen.getByTestId('personsPage'));

    const page = screen.getByTestId<HTMLDivElement>('personsPage');
    expect(page).toBeInTheDocument();
  });
  vi.unstubAllGlobals();
});
