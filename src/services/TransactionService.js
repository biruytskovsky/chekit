import { getMonthKey } from '../utils/helpers.js';
import { Transaction } from '../models/Transaction.js';

const STORAGE_KEY = 'FINANCE_DATA';
const CURRENT_MONTH_KEY = getMonthKey(); 

/**
 * Сервис для управления транзакциями, работающий с localStorage.
 * Хранение организовано по ключу YYYY-MM, что позволяет легко добавить навигацию.
 */
export class TransactionService {
    constructor() {
        this.data = this._loadData();
    }

    /**
     * Загружает данные из localStorage.
     * @returns {Object<string, Transaction[]>} Объект с данными, сгруппированными по месяцам.
     */
    _loadData() {
        try {
            const json = localStorage.getItem(STORAGE_KEY);
            return json ? JSON.parse(json) : {};
        } catch (e) {
            console.error("Ошибка при загрузке данных из localStorage:", e);
            return {};
        }
    }

    /**
     * Сохраняет данные в localStorage.
     */
    _saveData() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        } catch (e) {
            console.error("Ошибка при сохранении данных в localStorage:", e);
        }
    }

    /**
     * Уведомляет все подписанные компоненты об изменении данных (требование 9).
     */
    _notifyChange() {
        window.dispatchEvent(new CustomEvent('transactionsUpdated'));
    }

    /**
     * Возвращает все транзакции за текущий месяц.
     * @returns {Transaction[]}
     */
    getTransactions(monthKey = CURRENT_MONTH_KEY) {
        // Транзакции выводятся в порядке убывания даты (самые новые вверху)
        return (this.data[monthKey] || [])
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    /**
     * Добавляет новую транзакцию.
     * @param {Transaction} transaction
     */
    addTransaction(transaction) {
        const key = getMonthKey(new Date(transaction.date));
        
        if (!this.data[key]) {
            this.data[key] = [];
        }
        
        this.data[key].push(transaction);
        this._saveData();
        this._notifyChange(); // Актуализация интерфейса
    }

    /**
     * Удаляет транзакцию по ID.
     * @param {string} id - ID транзакции.
     * @param {string} monthKey - Ключ месяца.
     */
    deleteTransaction(id, monthKey = CURRENT_MONTH_KEY) {
        if (!this.data[monthKey]) return;

        const initialLength = this.data[monthKey].length;
        this.data[monthKey] = this.data[monthKey].filter(t => t.id !== id);

        if (this.data[monthKey].length !== initialLength) {
            this._saveData();
            this._notifyChange(); // Актуализация интерфейса
        }
    }

    /**
     * Вычисляет сводку по доходам, расходам и распределению по категориям за месяц.
     * @returns {Object} Сводные данные.
     */
    calculateSummary(monthKey = CURRENT_MONTH_KEY) {
        const transactions = this.getTransactions(monthKey);
        let totalIncome = 0;
        let totalExpense = 0;
        const categoryExpenses = {};

        transactions.forEach(t => {
            if (t.type === 'income') {
                totalIncome += t.amount;
            } else if (t.type === 'expense') {
                totalExpense += t.amount;
                categoryExpenses[t.category] = (categoryExpenses[t.category] || 0) + t.amount;
            }
        });

        // Расчет процентов для графика
        const categoryDistribution = Object.keys(categoryExpenses).map(category => {
            const amount = categoryExpenses[category];
            const percent = totalExpense > 0 ? (amount / totalExpense) * 100 : 0;
            return {
                category,
                amount,
                percent: parseFloat(percent.toFixed(1))
            };
        }).sort((a, b) => b.percent - a.percent); // Сортировка по убыванию процента

        return {
            totalIncome,
            totalExpense,
            totalBalance: totalIncome - totalExpense,
            categoryDistribution
        };
    }

    /**
     * Возвращает название текущего месяца для отображения на главном экране.
     * @returns {string}
     */
    getCurrentMonthName() {
        const [year, month] = CURRENT_MONTH_KEY.split('-');
        const date = new Date(year, month - 1, 1);
        return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' });
    }
}