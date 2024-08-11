import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Loader } from '../../components/loader/loader';
import { ThemeContextProvider } from '@/context/theme.context';

describe('Loader', () => {
  test('must be rendered', () => {
    const { container } = render(
      <ThemeContextProvider>
        <Loader />
      </ThemeContextProvider>,
    );
    expect(container.getElementsByClassName('loader-wrapper')).toBeDefined();
  });
});
