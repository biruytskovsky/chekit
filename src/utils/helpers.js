/**
 * Форматирует число в валютный формат (₽).
 * @param {number} amount
 * @returns {string}
 */
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
    }).format(amount);
};

/**
 * Получает ключ месяца (YYYY-MM) для хранения в localStorage.
 * @param {Date} date
 * @returns {string}
 */
export const getMonthKey = (date = new Date()) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
};

/**
 * Форматирует дату для отображения.
 * @param {string} isoString
 * @returns {string}
 */
export const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};