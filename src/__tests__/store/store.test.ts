import { describe, expect, it } from 'vitest';
import { configuredStore } from '../../store/store';

describe('Redux Store Tests', () => {
  it('Store must to be', () => {
    expect(configuredStore).toBeTruthy();
  });
});
