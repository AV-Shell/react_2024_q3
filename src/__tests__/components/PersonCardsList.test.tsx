import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { PersonCardsList } from '../../components/person-cards-list/person-cards-list';
import { checkbox1, checkbox2 } from '../testdata';
import React from 'react';

describe('PersonCardsList', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('Should be render without cards', async () => {
    const text = 'No results';

    render(<PersonCardsList results={[]} />);

    await waitFor(() => screen.getByText(text));
    expect(screen.getByText(text)).toBeInTheDocument();

    vi.resetAllMocks();
  });
  test('Should be render with cards', async () => {
    vi.mock('../../store/storeHooks', async () => {
      const mod = await vi.importActual('../../store/storeHooks');
      return {
        ...mod,
        useAppDispatch: () => () => {},
        useAppSelector: () => ({ 4: true }),
      };
    });

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

    mocks.useRouter.mockImplementation(() => ({ asPath: `/?personId=1&page=${1}&search=${'d'}` }));
    mocks.usePathname.mockImplementation(() => '/');
    mocks.useSearchParams.mockImplementation(() => [
      ['personId', '1'],
      ['page', 1],
      ['search', 'd'],
    ]);

    render(<PersonCardsList results={[checkbox1, checkbox2]} />);

    await waitFor(() => screen.getByText(checkbox2.name));
    expect(screen.getByText(checkbox2.name)).toBeInTheDocument();

    const checkbox = screen.getAllByRole('checkbox');
    checkbox.forEach(c => fireEvent.click(c));

    vi.resetAllMocks();
  });
});
