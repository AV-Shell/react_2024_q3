import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import { ErrorButton } from '../../components/ErrorButton/ErrorButton';

describe('Loader', () => {
  test('must be rendered', () => {
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
