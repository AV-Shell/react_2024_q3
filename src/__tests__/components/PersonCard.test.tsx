import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterAll, describe, expect, test, vi } from 'vitest';
import { PersonCard } from '../../components/person-card/person-card';
import { checkbox1 } from '../testdata';
import React, { ReactNode } from 'react';
import Link from 'next/link';

const mocks = vi.hoisted(() => {
  return {
    useRouter: vi.fn(),
    spyClick: vi.fn(),
  };
});

vi.mock('../../store/storeHooks', async () => {
  const mod = await vi.importActual('../../store/storeHooks');
  return {
    ...mod,
    useAppDispatch: () => () => {},
    useAppSelector: () => ({ 4: true }),
  };
});
vi.mock('next/router', async () => {
  const mod = await vi.importActual('next/router');
  return {
    ...mod,
    useRouter: mocks.useRouter,
  };
});
vi.mock('next/link', async () => {
  const myNavLink: React.FC<{ href: string; onClick: () => void; children: ReactNode }> = ({
    href,
    onClick,
    children,
  }) => {
    console.log(String(onClick) && '');

    return (
      <div>
        <span onClick={onClick} className={href} data-testid="navlink">
          customNavLink
        </span>
        <div>{children}</div>
      </div>
    );
  };

  return {
    __esModule: true,
    default: myNavLink,
  };
});

describe('PersonCard', () => {
  afterAll(() => {
    vi.resetAllMocks();
  });
  test('Should be render1', async () => {
    mocks.useRouter.mockImplementation(() => ({ asPath: `/?data=1` }));

    render(<PersonCard person={checkbox1} />);

    await waitFor(() => screen.getByText(checkbox1.name));
    expect(screen.getByText(checkbox1.name)).toHaveTextContent(checkbox1.name);
    vi.resetAllMocks();
  });
  test('Should be render', async () => {
    const page = '1';
    const search = 'd';

    mocks.useRouter.mockImplementation(() => ({ asPath: `/?personId=1&page=${page}&search=${search}` }));
    render(<PersonCard person={checkbox1} />);

    await waitFor(() => screen.getByText(checkbox1.name));
    expect(screen.getByText(checkbox1.name)).toHaveTextContent(checkbox1.name);
    expect(screen.getByText(checkbox1.skin_color)).toHaveTextContent(checkbox1.skin_color);
    expect(screen.getByText(checkbox1.gender)).toHaveTextContent(checkbox1.gender);

    const link = screen.getByTestId('navlink');
    fireEvent.click(link);
    expect(link).toHaveAttribute('class', `?personId=${checkbox1.id}&page=${page}&search=${search}`);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(link).toHaveAttribute('class', `?personId=${checkbox1.id}&page=${page}&search=${search}`);
    console.log(String(Link) && '');
    vi.clearAllMocks();
  });
});
