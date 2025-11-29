/**
 * Класс, представляющий финансовую транзакцию (доход или расход).
 * Соответствует требованию ООП-стиля.
 */
export class Transaction {
    /**
     * @param {'income'|'expense'} type - Тип транзакции.
     * @param {string} category - Категория транзакции.
     * @param {number} amount - Сумма транзакции.
     * @param {string} comment - Комментарий.
     * @param {string} [date=new Date().toISOString()] - Дата и время в ISO-формате.
     */
    constructor(type, category, amount, comment, date = new Date().toISOString()) {
        // Уникальный ID на основе timestamp для обеспечения уникальности и порядка
        this.id = Date.now().toString() + Math.floor(Math.random() * 1000); 
        this.type = type;
        this.category = category;
        this.amount = parseFloat(amount);
        this.comment = comment;
        this.date = date; 
    }
}