import { afterAll, afterEach, describe, expect, test, vi } from 'vitest';
import { SearchPanel } from '../../components/SearchPanel/SearchPanel';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import * as reactRouterDom from 'react-router-dom';
import { storage } from '../../services/localstorage.service';
import { SEARCH_STRING } from '../../utils/const';

describe('SearchPanel.test', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  afterAll(() => {
    vi.resetAllMocks();
  });
  test('Should be search', async () => {
    const setSearchParams = vi.fn();
    const spyPage = vi.fn();
    const spySearch = vi.fn();

    setSearchParams.mockImplementation((aFn: ((a: URLSearchParams) => URLSearchParams) | URLSearchParams) => {
      let page;
      if (typeof aFn === 'function') {
        const params = aFn(new URLSearchParams());
        page = params.get('page');
        return spySearch(params.get('search'));
      } else {
        page = aFn.get('page');
      }
      return spyPage(page);
    });

    vi.spyOn(reactRouterDom, 'useSearchParams').mockReturnValue([new URLSearchParams('?page=1'), setSearchParams]);

    const routes = [
      {
        path: '/',
        element: <SearchPanel />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', `/?page=1`],
      initialIndex: 1,
    });

    const testItemValue1 = 'searchStringValue';
    const testItemValue2 = 'searchStringNewValue';
    storage.setItem(SEARCH_STRING, testItemValue1);

    render(<RouterProvider router={router} />);

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
    expect(spySearch).toHaveBeenCalledWith(testItemValue2);
  });
});
