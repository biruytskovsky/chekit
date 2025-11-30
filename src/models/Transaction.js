// src/models/Transaction.js

/**
 * Модель данных для финансовой транзакции.
 */
export class Transaction {
    /**
     * @param {number} amount - Сумма транзакции.
     * @param {'income'|'expense'} type - Тип: 'income' или 'expense'.
     * @param {string} category - Категория.
     * @param {string} [comment=''] - Комментарий.
     * @param {Date} [date=new Date()] - Дата транзакции.
     */
    constructor(amount, type, category, comment = '', date = new Date()) {
        this.id = Date.now().toString() + Math.random().toString(16).slice(2);
        this.amount = amount;
        this.type = type;
        this.category = category;
        this.comment = comment;
        this.date = date.toISOString(); // Храним в ISO формате для легкой сортировки и восстановления
    }
}