// __tests__/helpers.test.js

import { formatAmount } from '../src/utils/helpers.js';

describe('Format helpers (formatAmount)', () => {
    
    // Тест 1: Проверка целого числа
    test('should correctly format integer amount', () => {
        expect(formatAmount(100)).toBe('100.00');
    });

    // Тест 2: Проверка десятичного числа с округлением
    test('should correctly format decimal amount and round up', () => {
        expect(formatAmount(123.456)).toBe('123.46');
    });

    // Тест 3: Проверка нуля
    test('should handle zero amount', () => {
        expect(formatAmount(0)).toBe('0.00');
    });
    
    // Тест 4: Проверка недопустимых значений
    test('should return "0.00" for non-numeric input (NaN, null)', () => {
        expect(formatAmount(NaN)).toBe('0.00');
        expect(formatAmount(null)).toBe('0.00');
    });
});