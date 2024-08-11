import { useQueryParams } from '../../hooks/useQueryParams';
import { describe, expect, test, beforeAll, afterEach, afterAll, vi } from 'vitest';

import {} from 'vitest';

const mocks = vi.hoisted(() => {
  return {
    useRouter: vi.fn(),
  };
});
vi.mock('next/router', async () => {
  const mod = await vi.importActual('next/router');
  return {
    ...mod,
    useRouter: mocks.useRouter,
  };
});

describe('useLocalStorage', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  beforeAll(() => {
    vi.resetAllMocks();
  });
  afterAll(() => {
    vi.resetAllMocks();
  });
  test('should return the initial value', () => {
    mocks.useRouter.mockImplementation(() => ({ asPath: '/?search=LiLuDallas&he=KorbinDallas&page=1' }));

    let data = useQueryParams();
    expect(data.search).toEqual('LiLuDallas');
    expect(data.he).toEqual('KorbinDallas');
    expect(data.page).toEqual('1');

    mocks.useRouter.mockImplementation(() => ({ asPath: '/?what=Multipassport&where=FhlostonParadise' }));

    data = useQueryParams();
    expect(data.what).toEqual('Multipassport');
    expect(data.where).toEqual('FhlostonParadise');
  });
});
