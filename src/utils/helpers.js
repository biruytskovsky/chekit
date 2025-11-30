// src/utils/helpers.js

/**
 * Возвращает ключ месяца и года в формате YYYY-MM.
 * @param {Date} date 
 */
export function getMonthKey(date) {
    const year = date.getFullYear();
    // getMonth возвращает 0-11, добавляем 1 и форматируем
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
}

/**
 * Форматирует число до двух десятичных знаков. (ТЕСТИРУЕМАЯ ФУНКЦИЯ)
 * @param {number} amount
 * @returns {string}
 */
export function formatAmount(amount) {
    if (isNaN(amount) || amount === null) {
        return '0.00';
    }
    // Используем toFixed для округления и форматирования до 2 знаков
    return parseFloat(amount).toFixed(2);
}

/**
 * Форматирует сумму в виде валюты (с использованием formatAmount).
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
    return `${formatAmount(amount)} ₽`; 
}

/**
 * Форматирует дату в виде DD.MM.YYYY.
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