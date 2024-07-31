import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { SelectionPanel } from '../../components/SelectionPanel/SelectionPanex';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { checkbox1, checkbox2 } from '../testdata';

describe('SelectionPanel 2', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('Should be render with selected checkboxes', async () => {
    const path = '?page=1&search=d';
    const spanText = `2 items are selected`;

    vi.stubGlobal('URL', { createObjectURL: () => 'someUrl' });

    const routes = [
      {
        path: `/`,
        element: <SelectionPanel />,
      },
    ];

    vi.mock('../../store/storeHooks', async () => {
      const mod = await vi.importActual('../../store/storeHooks');
      return {
        ...mod,
        useAppDispatch: () => () => {},
        useAppSelector: () => ({ [checkbox1.id]: checkbox1, [checkbox2.id]: checkbox2 }),
      };
    });

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', `/${path}`],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getAllByText(spanText));
    expect(screen.getAllByText(spanText)[0]).toBeInTheDocument();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });
});
