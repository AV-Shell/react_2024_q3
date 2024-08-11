import { afterAll, afterEach, describe, expect, test, vi } from 'vitest';
import { ThemeSelector } from '../../components/theme-selector/theme-selector';
import { render, screen, waitFor } from '@testing-library/react';

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

    render(<ThemeSelector handleChange={handleChange} isChecked={defaultValue} className="" />);

    await waitFor(() => screen.getByTestId('themeCheckbox'));
    const input = screen.getByTestId<HTMLInputElement>('themeCheckbox');

    expect(input).toBeInTheDocument();
    expect(input).toBeEmptyDOMElement();
  });
});
