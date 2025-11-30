// src/components/Popups/AddIncomePopup.js

import { BasePopup } from './BasePopup.js';
import { Transaction } from '../../models/Transaction.js';
import { INCOME_CATEGORIES } from '../../utils/constants.js';

export class AddIncomePopup extends BasePopup {
    /**
     * @param {HTMLElement} container
     * @param {import('../../services/TransactionService.js').TransactionService} transactionService
     */
    constructor(container, transactionService) {
        super('add-income-popup', 'Добавить Доход', container);
        this.transactionService = transactionService;
        this.setupSaveHandler();
    }

    renderContent() {
        // Создаем опции для выпадающего списка
        const categoryOptions = INCOME_CATEGORIES.map(cat => 
            `<option value="${cat}">${cat}</option>`
        ).join('');

        return `
            <form class="popup-form" id="income-form">
                <label for="income-amount">Сумма:</label>
                <input type="number" id="income-amount" required min="1" step="0.01">

                <label for="income-category">Категория:</label>
                <select id="income-category" required>
                    ${categoryOptions}
                </select>

                <label for="income-comment">Комментарий (необязательно):</label>
                <textarea id="income-comment" rows="2"></textarea>
            </form>
        `;
    }

    setupSaveHandler() {
        const saveBtn = this.overlay.querySelector(`#${this.id}-save-btn`);
        saveBtn.addEventListener('click', () => {
            const form = this.overlay.querySelector('form');
            if (!form.checkValidity()) {
                // Триггерим стандартную валидацию HTML5
                form.reportValidity();
                return;
            }
            
            const amount = parseFloat(document.getElementById('income-amount').value);
            const category = document.getElementById('income-category').value;
            const comment = document.getElementById('income-comment').value;

            const newTransaction = new Transaction(amount, 'income', category, comment);
            this.transactionService.addTransaction(newTransaction);
            
            this.hide();
        });
    }
}