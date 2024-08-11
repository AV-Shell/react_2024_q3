import { afterAll, afterEach, describe, expect, test, vi } from 'vitest';
import { Pagination } from '@/components/pagination/pagination';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const mocks = vi.hoisted(() => {
  return {
    useAppSelector: vi.fn(),
    useRouter: vi.fn(),
    useSearchParams: vi.fn(),
    usePathname: vi.fn(),
    push: vi.fn(),
    useContext: vi.fn(),
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

vi.mock('react', async () => {
  const mod = await vi.importActual('react');
  return {
    ...mod,
    useContext: mocks.useContext,
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
    mocks.useAppSelector.mockImplementation(() => ({ isLoading: true, persons: { count: 0 } }));
    mocks.useRouter.mockImplementation(() => ({ asPath: '/?search=Lusadfsadf&page=1' }));
    mocks.usePathname.mockImplementation(() => '/');
    mocks.useSearchParams.mockImplementation(() => [
      ['search', 'Lusadfsadf'],
      ['page', '1'],
    ]);

    mocks.useContext.mockImplementation(() => ({ isDarkTheme: false }));

    render(<Pagination />);

    await waitFor(() => screen.getByTestId('paginationContainer'));
    const container = screen.getByTestId('paginationContainer');

    expect(container).toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
  });
  test('Should be render with disabled buttons', async () => {
    mocks.useAppSelector.mockImplementation(() => ({ isLoading: true, persons: { count: 82 } }));
    mocks.useRouter.mockImplementation(() => ({ asPath: '/?search=Lusadfsadf&page=1' }));
    mocks.usePathname.mockImplementation(() => '/');
    mocks.useSearchParams.mockImplementation(() => [
      ['search', 'Lusadfsadf'],
      ['page', '1'],
    ]);
    mocks.useContext.mockImplementation(() => ({ isDarkTheme: false }));

    render(<Pagination />);

    await waitFor(() => screen.getAllByRole('button'));

    const buttons = screen.getAllByRole('button');

    buttons.forEach(b => {
      expect(b).toHaveAttribute('disabled');
    });
    expect(buttons.length).toBe(9);
  });
  test('Should be render with not disabled buttons', async () => {
    mocks.useAppSelector.mockImplementation(() => ({ isLoading: false, persons: { count: 51 } }));
    mocks.useRouter.mockImplementation(() => ({ asPath: '/?search=L&page=1', push: mocks.push, route: '/' }));
    mocks.usePathname.mockImplementation(() => '/');
    mocks.useSearchParams.mockImplementation(() => [
      ['search', 'L'],
      ['page', '1'],
    ]);
    mocks.useContext.mockImplementation(() => ({ isDarkTheme: false }));

    render(<Pagination />);

    await waitFor(() => screen.getAllByRole('button'));

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(6);

    fireEvent.click(buttons[2]);
    expect(mocks.push).toHaveBeenCalledWith(`/?search=L&page=3`);
  });
  test('Should be render withithout search ang page', async () => {
    mocks.useAppSelector.mockImplementation(() => ({ isLoading: false, persons: { count: 51 } }));
    mocks.useContext.mockImplementation(() => ({ isDarkTheme: true }));
    mocks.useRouter.mockImplementation(() => ({ asPath: '/', push: mocks.push, route: '/' }));
    mocks.usePathname.mockImplementation(() => '/');
    mocks.useSearchParams.mockImplementation(() => []);

    render(<Pagination />);

    await waitFor(() => screen.getAllByRole('button'));

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(6);

    fireEvent.click(buttons[2]);
    expect(mocks.push).toHaveBeenCalledWith(`/?page=3`);
  });
});
