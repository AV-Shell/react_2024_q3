import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { SelectionPanel } from '../../components/selection-panel/selection-panex';
import { checkbox1, checkbox2 } from '../testdata';

const mocks = vi.hoisted(() => {
  return {
    useAppSelector: vi.fn(),
  };
});

vi.mock('../../store/storeHooks', async () => {
  const mod = await vi.importActual('../../store/storeHooks');
  return {
    ...mod,
    useAppDispatch: () => () => {},
    useAppSelector: mocks.useAppSelector,
  };
});

describe('SelectionPanel 1', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('Should be render without selected boxes', async () => {
    const spanText1 = `0`;
    const spanText2 = `item is selected`;

    vi.stubGlobal('URL', { createObjectURL: () => 'someUrl' });
    mocks.useAppSelector.mockImplementation(() => ({}));
    render(<SelectionPanel />);

    await waitFor(() => screen.getAllByText(spanText1));
    expect(screen.getAllByText(spanText1)[0]).toBeInTheDocument();
    await waitFor(() => screen.getAllByText(spanText2));
    expect(screen.getAllByText(spanText2)[0]).toBeInTheDocument();

    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  test('Should be render with selected checkboxes', async () => {
    const spanText1 = `2`;
    const spanText2 = `items are selected`;

    vi.stubGlobal('URL', { createObjectURL: () => 'someUrl' });

    mocks.useAppSelector.mockImplementation(() => ({ [checkbox1.id]: checkbox1, [checkbox2.id]: checkbox2 }));
    render(<SelectionPanel />);

    await waitFor(() => screen.getAllByText(spanText1));
    expect(screen.getAllByText(spanText1)[0]).toBeInTheDocument();
    await waitFor(() => screen.getAllByText(spanText2));
    expect(screen.getAllByText(spanText2)[0]).toBeInTheDocument();

    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });
});
