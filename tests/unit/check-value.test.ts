import { checkValue } from '@/services/article-service';

describe('testing function checkValue', () => {
  it('should throw an error when value is invalid', () => {
    expect(() => checkValue(null)).toThrow();
    expect(() => checkValue(undefined)).toThrow();
    expect(() => checkValue(NaN)).toThrow();
  });
});
