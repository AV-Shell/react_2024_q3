import { afterAll, afterEach, describe, expect, test, vi } from 'vitest';
import { SearchPanel } from '../../components/search-panel/search-panel';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

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

    const mocks = vi.hoisted(() => {
      return {
        useRouter: vi.fn(),
      };
    });
    vi.mock('next/router', async () => {
      const mod = await vi.importActual('next/router');
      return {
        ...mod,
        useRouter: mocks.useRouter,
      };
    });

    mocks.useRouter.mockImplementation(() => ({
      asPath: `/?personId=1&page=${1}&search=${testItemValue1}`,
      push: spyFn,
      route: '/',
    }));

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
});
