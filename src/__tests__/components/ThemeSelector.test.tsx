import { afterAll, afterEach, describe, expect, test, vi } from 'vitest';
import { ThemeSelector } from '../../components/ThemeSelector/ThemeSelector';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

describe('ThemeSelector.test', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  afterAll(() => {
    vi.resetAllMocks();
  });
  test('Should be search', async () => {
    const handleChange = vi.fn();
    const defaultValue = true;

    const routes = [
      {
        path: '/',
        element: <ThemeSelector handleChange={handleChange} isChecked={defaultValue} />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByTestId('themeCheckbox'));
    const input = screen.getByTestId<HTMLInputElement>('themeCheckbox');

    expect(input).toBeInTheDocument();
    expect(input).toBeEmptyDOMElement();
    fireEvent.click(input);
    fireEvent.click(input);
    fireEvent.click(input);
    expect(handleChange).toHaveBeenCalledTimes(3);
  });
});
