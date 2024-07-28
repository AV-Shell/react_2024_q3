import { describe, expect, it } from 'vitest';
import { storage } from '../services/localstorage.service';

describe('Services Tests', () => {
  const testItemName1 = 'TestItemName1';
  const testItemValue1 = 'TestItemValue1';
  const testItemName2 = 'TestItemName2';
  const testItemValue2 = 'TestItemValue2';
  const testItemName3 = 'TestItemValue3';

  it('storage must to be', () => {
    expect(storage).toBeTruthy();
  });
  it('clearStorage must work', () => {
    expect(storage.clearStorage()).toBeFalsy();
    expect(storage.getItem<string>(testItemName1)).toBe(null);
    expect(storage.getItem<string>(testItemName2)).toBe(null);
    expect(storage.getItem<string>(testItemName3)).toBe(null);
  });
  it('setPrefix is to be', () => {
    expect(storage.isUsePrefix(true)).toBeFalsy();
    expect(storage.getKey(testItemName3)).not.toBe(testItemName3);
    expect(storage.isUsePrefix(false)).toBeFalsy();
    expect(storage.getKey(testItemName3)).toBe(testItemName3);
    expect(storage.isUsePrefix(true)).toBeFalsy();
  });
  it('setItem is to be', () => {
    expect(storage.setItem(testItemName1, testItemValue1)).toBeFalsy();
    expect(storage.setItem(testItemName2, testItemValue2)).toBeFalsy();
  });
  it('getItem must work', () => {
    expect(storage.getItem<string>(testItemName1)).toBe(testItemValue1);
    expect(storage.getItem<string>(testItemName2)).toBe(testItemValue2);
    expect(storage.getItem<string>(testItemName3)).toBe(null);

    const testKey = storage.getKey(testItemName3);
    localStorage.setItem(testKey, `{"value":f`);
    expect(storage.getItem<string>(testItemName3)).toBe(null);
  });
  it('removeItem must work', () => {
    expect(storage.removeItem(testItemName1)).toBeFalsy();
    expect(storage.getItem<string>(testItemName1)).toBe(null);
    expect(storage.getItem<string>(testItemName2)).toBe(testItemValue2);
    expect(storage.getItem<string>(testItemName3)).toBe(null);

    const testKey = storage.getKey(testItemName3);
    localStorage.setItem(testKey, `{"value":f`);
    expect(storage.getItem<string>(testItemName3)).toBe(null);
  });
  it('clearStorage must work', () => {
    expect(storage.clearStorage()).toBeFalsy();
    expect(storage.getItem<string>(testItemName1)).toBe(null);
    expect(storage.getItem<string>(testItemName2)).toBe(null);
    expect(storage.getItem<string>(testItemName3)).toBe(null);
  });
});
