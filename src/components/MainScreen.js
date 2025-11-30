// src/components/MainScreen.js

import { Chart } from './Chart.js';
import { formatCurrency, getMonthKey } from '../utils/helpers.js';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../utils/constants.js';

export class MainScreen {
    /**
     * @param {import('../services/TransactionService.js').TransactionService} transactionService
     */
    constructor(transactionService) {
        this.transactionService = transactionService;
        this.chart = new Chart(document.getElementById('expense-chart'));
        
        // Текущий месяц для отображения
        this.currentMonthKey = getMonthKey(new Date());

        // Подписка на событие обновления
        window.addEventListener('transactionsUpdated', () => this.updateView());

        // Первичное обновление
        this.updateView();
    }

    updateView() {
        const summary = this.transactionService.getMonthlySummary(this.currentMonthKey);
        
        // 1. Обновление заголовка месяца
        this.updateMonthTitle();

        // 2. Обновление сводки
        this.updateSummary(summary);

        // 3. Обновление графика
        this.updateChart(summary);
    }

    updateMonthTitle() {
        const date = new Date();
        const monthName = date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
        document.getElementById('month-title').textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    }

    /**
     * @param {{totalIncome: number, totalExpense: number, expenseDistribution: {category: string, amount: number}[]}} summary
     */
    updateSummary(summary) {
        const balance = summary.totalIncome - summary.totalExpense;

        document.getElementById('total-income').textContent = formatCurrency(summary.totalIncome);
        document.getElementById('total-expense').textContent = formatCurrency(summary.totalExpense);
        document.getElementById('total-balance').textContent = formatCurrency(balance);
        
        // Установка цвета баланса
        const balanceEl = document.getElementById('total-balance');
        balanceEl.classList.remove('text-success', 'text-danger');
        if (balance > 0) {
            balanceEl.classList.add('text-success'); // Используйте класс из CSS, если нужно
        } else if (balance < 0) {
            balanceEl.classList.add('text-danger');
        }
    }

    /**
     * @param {{totalIncome: number, totalExpense: number, expenseDistribution: {category: string, amount: number}[]}} summary
     */
    updateChart(summary) {
        const totalExpense = summary.totalExpense;
        
        const distributionWithPercent = summary.expenseDistribution
            .map(item => ({
                ...item,
                percent: totalExpense > 0 ? (item.amount / totalExpense) * 100 : 0
            }))
            .sort((a, b) => b.amount - a.amount); // Сортировка по убыванию суммы

        this.chart.render(distributionWithPercent);
    }
}