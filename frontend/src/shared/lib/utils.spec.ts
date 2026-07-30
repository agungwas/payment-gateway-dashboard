import { describe, it, expect } from 'vitest';
import { cleanParams } from './utils';

describe('cleanParams', () => {
  it('should remove empty strings, null, and undefined', () => {
    const input = {
      name: 'test',
      status: '',
      id: null,
      sort: undefined,
    };
    const result = cleanParams(input);
    expect(result).toEqual({ name: 'test' });
  });

  it('should keep 0, false, and valid strings', () => {
    const input = {
      amount: 0,
      active: false,
      status: 'completed',
    };
    const result = cleanParams(input);
    expect(result).toEqual({
      amount: 0,
      active: false,
      status: 'completed',
    });
  });
});
