import { getMonthKey } from '../utils/helpers.js';

export class TransactionService {
    constructor() {
        this.storageKey = 'financeTransactions';
        this.data = this.loadData();
    }

    loadData() {
        try {
            const json = localStorage.getItem(this.storageKey);
            return json ? JSON.parse(json) : {};
        } catch (e) {
            console.error("Ошибка загрузки данных из localStorage:", e);
            return {};
        }
    }

    saveData() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
            window.dispatchEvent(new Event('transactionsUpdated'));
        } catch (e) {
            console.error("Ошибка сохранения данных в localStorage:", e);
        }
    }

    /**
     * Добавляет новую транзакцию.
     * @param {import('../models/Transaction.js').Transaction} transaction
     */
    addTransaction(transaction) {
        const monthKey = getMonthKey(new Date(transaction.date));
        
        if (!this.data[monthKey]) {
            this.data[monthKey] = [];
        }
        this.data[monthKey].push(transaction);
        this.saveData();
    }

    /**
     * Удаляет транзакцию по ID.
     * @param {string} transactionId
     * @param {string} monthKey - Ключ месяца, в котором находится транзакция.
     */
    deleteTransaction(transactionId, monthKey) {
        if (this.data[monthKey]) {
            this.data[monthKey] = this.data[monthKey].filter(t => t.id !== transactionId);
            this.saveData();
        }
    }

    /**
     * Возвращает список транзакций за текущий месяц.
     * @returns {import('../models/Transaction.js').Transaction[]}
     */
    getTransactions() {
        const currentMonthKey = getMonthKey(new Date());
        // Сортируем от новых к старым
        return (this.data[currentMonthKey] || []).sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    /**
     * Рассчитывает сводку доходов, расходов и их распределение за месяц.
     * @param {string} monthKey - Ключ месяца (YYYY-MM).
     */
    getMonthlySummary(monthKey) {
        const transactions = this.data[monthKey] || [];
        let totalIncome = 0;
        let totalExpense = 0;
        const expenseMap = {};

        transactions.forEach(t => {
            if (t.type === 'income') {
                totalIncome += t.amount;
            } else if (t.type === 'expense') {
                totalExpense += t.amount;
                
                const category = t.category || 'Без категории';
                expenseMap[category] = (expenseMap[category] || 0) + t.amount;
            }
        });

        const expenseDistribution = Object.keys(expenseMap).map(category => ({
            category,
            amount: expenseMap[category]
        }));

        return {
            totalIncome,
            totalExpense,
            expenseDistribution
        };
    }
}