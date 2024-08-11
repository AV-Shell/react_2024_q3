import { useLocalStorage } from '../../hooks/useLocalStorage';
import { describe, expect, test, beforeAll, afterAll } from 'vitest';
import { storage } from '../../services/localstorage.service';

import { act, renderHook } from '@testing-library/react';

import {} from 'vitest';

describe('useLocalStorage', () => {
  const initialCount = 1;
  const changedValue = 20;
  const key = 'count';
  beforeAll(() => {
    storage.clearStorage();
  });

  afterAll(() => {
    storage.clearStorage();
  });
  test('should return the initial value', () => {
    let storagedValue = storage.getItem<number>(key);
    expect(storagedValue).toBe(null);

    const { result } = renderHook(() => useLocalStorage<number>(initialCount, key));
    const [count, setCount] = result.current;

    expect(result.current.length).toBe(2);
    expect(count).toBe(initialCount);
    expect(setCount).toBeTruthy();
    act(() => setCount(changedValue));
    expect(result.current[0]).toBe(changedValue);
    storagedValue = storage.getItem<number>(key);
    expect(storagedValue).toBe(changedValue);

    const { result: result2 } = renderHook(() => useLocalStorage<number>(initialCount, key));
    expect(result2.current[0]).toBe(changedValue);
  });
});
