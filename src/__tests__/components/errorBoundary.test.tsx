import { fireEvent, render, screen } from '@testing-library/react';
import { afterAll, describe, expect, test, vi } from 'vitest';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary';
import { ErrorButton } from '../../components/error-button/error-button';

describe('Loader', () => {
  afterAll(() => {
    vi.resetAllMocks();
  });

  test('must be rendered', () => {
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const expectedText = 'Something went wrong';
    const { container } = render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>,
    );

    let errorButton = screen.getByText('Error Button');
    expect(errorButton).toBeInTheDocument();

    fireEvent.click(errorButton);

    const errorMessage = screen.getByText(expectedText);
    expect(errorMessage).toBeInTheDocument();
    expect(container.getElementsByClassName('errorMessageWrapper')).toBeDefined();

    const resetError = screen.getByText('Reset error');
    expect(resetError).toBeInTheDocument();
    fireEvent.click(resetError);

    errorButton = screen.getByText('Error Button');
    expect(errorButton).toBeInTheDocument();
  });
});
