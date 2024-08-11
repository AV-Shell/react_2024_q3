import { useQueryParams } from '../../hooks/useQueryParams';
import { describe, expect, test, beforeAll, afterEach, afterAll, vi } from 'vitest';

import {} from 'vitest';

const mocks = vi.hoisted(() => {
  return {
    useRouter: vi.fn(),
    useSearchParams: vi.fn(),
  };
});
vi.mock('next/navigation', async () => {
  const mod = await vi.importActual('next/navigation');
  return {
    ...mod,
    useRouter: mocks.useRouter,
    useSearchParams: mocks.useSearchParams,
  };
});

describe('useQueryParams.test', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  beforeAll(() => {
    vi.resetAllMocks();
  });
  afterAll(() => {
    vi.resetAllMocks();
  });
  test('should return query params', () => {
    mocks.useRouter.mockImplementation(() => ({ asPath: '/?search=LiLuDallas&he=KorbinDallas&page=1' }));
    mocks.useSearchParams.mockImplementation(() => [
      ['search', 'LiLuDallas'],
      ['he', 'KorbinDallas'],
      ['page', '1'],
    ]);

    let data = useQueryParams();
    expect(data.search).toEqual('LiLuDallas');
    expect(data.he).toEqual('KorbinDallas');
    expect(data.page).toEqual('1');

    mocks.useRouter.mockImplementation(() => ({ asPath: '/?what=Multipassport&where=FhlostonParadise' }));
    mocks.useSearchParams.mockImplementation(() => [
      ['what', 'Multipassport'],
      ['where', 'FhlostonParadise'],
      ['page', '2'],
    ]);

    data = useQueryParams();
    expect(data.what).toEqual('Multipassport');
    expect(data.where).toEqual('FhlostonParadise');
  });
});
