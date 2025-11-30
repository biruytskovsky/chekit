/**
 * Возвращаетт ключ месяца и года 
 * @param {Date} date 
 */
export function getMonthKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
}

/**
 * Форматирует число до двух десятичных знаков
 * @param {number} amount
 * @returns {string}
 */
export function formatAmount(amount) {
    if (isNaN(amount) || amount === null) {
        return '0.00';
    }
    return parseFloat(amount).toFixed(2);
}

/**
 * Форматирует сумму в виде валюты
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
    return `${formatAmount(amount)} ₽`; 
}

/**
 * Форматирует дату 
 * @param {Date} date
 * @returns {string}
 */
export function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
}