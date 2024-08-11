import { afterAll, afterEach, describe, expect, test, vi } from 'vitest';
import { SearchPanel } from '../../components/search-panel/search-panel';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { storage } from '../../services/localstorage.service';

const mocks = vi.hoisted(() => {
  return {
    useRouter: vi.fn(),
    useSearchParams: vi.fn(),
    usePathname: vi.fn(),
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

describe('SearchPanel.test', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  afterAll(() => {
    vi.resetAllMocks();
  });
  test('Should be search', async () => {
    const spyFn = vi.fn();

    const testItemValue1 = 'searchStringValue';
    const testItemValue2 = 'searchStringNewValue';

    mocks.useContext.mockImplementation(() => ({ isDarkTheme: false }));
    mocks.useRouter.mockImplementation(() => ({
      asPath: `/?personId=1&page=${1}&search=${testItemValue1}`,
      push: spyFn,
      route: '/',
    }));
    mocks.usePathname.mockImplementation(() => '/');
    mocks.useSearchParams.mockImplementation(() => [
      ['personId', 1],
      ['page', 1],
      ['search', testItemValue1],
    ]);

    render(<SearchPanel />);

    await waitFor(() => screen.getByTestId('searchInput'));
    const input = screen.getByTestId<HTMLInputElement>('searchInput');
    const form = screen.getByTestId<HTMLButtonElement>('searchForm');

    expect(input).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(input).toBeEmptyDOMElement();
    expect(input.value).toBe(testItemValue1);

    fireEvent.change(input, { target: { value: testItemValue2 } });
    expect(input.value).toBe(testItemValue2);
    fireEvent.submit(form, { target: { search: { value: testItemValue2 } } });
    expect(spyFn).toHaveBeenCalledWith(`/?personId=1&page=1&search=${testItemValue2}`);
  });
  test('Should be load from localstorage', async () => {
    const spyFn = vi.fn();

    const testItemValue2 = 'searchStringNewValue';

    storage.setItem('search', testItemValue2);

    mocks.useContext.mockImplementation(() => ({ isDarkTheme: false }));
    mocks.useRouter.mockImplementation(() => ({
      asPath: `/?personId=1&page=${1}`,
      push: spyFn,
      route: '/',
    }));
    mocks.usePathname.mockImplementation(() => '/');
    mocks.useSearchParams.mockImplementation(() => [
      ['personId', 1],
      ['page', 1],
    ]);

    expect(spyFn).toHaveBeenCalledTimes(0);
    render(<SearchPanel />);

    await waitFor(() => screen.getByTestId('searchInput'));
    expect(spyFn).toHaveBeenCalledTimes(1);
  });
});
