import { formatCurrency } from '../utils/helpers.js';
import { Chart } from './Chart.js';

/**
 * Компонент, управляющий отображением главного экрана и сводки.
 */
export class MainScreen {
    /**
     * @param {TransactionService} transactionService
     */
    constructor(transactionService) {
        this.service = transactionService;

        // Элементы DOM
        this.monthTitleEl = document.getElementById('month-title');
        this.totalIncomeEl = document.getElementById('total-income');
        this.totalExpenseEl = document.getElementById('total-expense');
        this.totalBalanceEl = document.getElementById('total-balance');
        this.chartContainerEl = document.getElementById('expense-chart');
        
        this.chart = new Chart(this.chartContainerEl);

        // Подписка на глобальное событие обновления данных (требование 9)
        window.addEventListener('transactionsUpdated', this.render.bind(this));
        
        this.render(); // Первичный рендеринг
    }

    /**
     * Обновляет все элементы главного экрана.
     */
    render() {
        this.monthTitleEl.textContent = this.service.getCurrentMonthName();
        
        const summary = this.service.calculateSummary();

        // 3. Сумма всех приходов
        this.totalIncomeEl.textContent = formatCurrency(summary.totalIncome);
        
        // 4. Сумма всех расходов
        this.totalExpenseEl.textContent = formatCurrency(summary.totalExpense);
        
        // 5. Итоговый баланс
        this.totalBalanceEl.textContent = formatCurrency(summary.totalBalance);
        this.totalBalanceEl.style.color = summary.totalBalance >= 0 ? 
            'var(--color-success)' : 'var(--color-danger)';
        
        // 2. График
        this.chart.render(summary.categoryDistribution);
    }
}