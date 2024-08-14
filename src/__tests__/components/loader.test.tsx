import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Loader } from '../../components/loader/loader';

describe('Loader', () => {
  test('must be rendered', () => {
    const { container } = render(<Loader />);
    expect(container.getElementsByClassName('loader-wrapper')).toBeDefined();
  });
});
