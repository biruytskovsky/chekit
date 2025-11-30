import { formatAmount } from '../src/utils/helpers.js';

describe('Format helpers (formatAmount)', () => {
    
    test('should correctly format integer amount', () => {
        expect(formatAmount(100)).toBe('100.00');
    });

    test('should correctly format decimal amount and round up', () => {
        expect(formatAmount(123.456)).toBe('123.46');
    });

    test('should handle zero amount', () => {
        expect(formatAmount(0)).toBe('0.00');
    });
    
    test('should return "0.00" for non-numeric input (NaN, null)', () => {
        expect(formatAmount(NaN)).toBe('0.00');
        expect(formatAmount(null)).toBe('0.00');
    });
});