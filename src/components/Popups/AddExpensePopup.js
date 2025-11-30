import { BasePopup } from './BasePopup.js';
import { Transaction } from '../../models/Transaction.js';
import { EXPENSE_CATEGORIES } from '../../utils/constants.js';

export class AddExpensePopup extends BasePopup {
    /**
     * @param {HTMLElement} container
     * @param {import('../../services/TransactionService.js').TransactionService} transactionService
     */
    constructor(container, transactionService) {
        super('add-expense-popup', 'Добавить Расход', container);
        this.transactionService = transactionService;
        this.setupSaveHandler();
    }

    renderContent() {
        
        const categoryOptions = EXPENSE_CATEGORIES.map(cat => 
            `<option value="${cat}">${cat}</option>`
        ).join('');

        return `
            <form class="popup-form" id="expense-form">
                <label for="expense-amount">Сумма:</label>
                <input type="number" id="expense-amount" required min="1" step="0.01">

                <label for="expense-category">Категория:</label>
                <select id="expense-category" required>
                    ${categoryOptions}
                </select>

                <label for="expense-comment">Комментарий (необязательно):</label>
                <textarea id="expense-comment" rows="2"></textarea>
            </form>
        `;
    }

    setupSaveHandler() {
        const saveBtn = this.overlay.querySelector(`#${this.id}-save-btn`);
        saveBtn.addEventListener('click', () => {
            const form = this.overlay.querySelector('form');
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            
            const amount = parseFloat(document.getElementById('expense-amount').value);
            const category = document.getElementById('expense-category').value;
            const comment = document.getElementById('expense-comment').value;

            const newTransaction = new Transaction(amount, 'expense', category, comment);
            this.transactionService.addTransaction(newTransaction);
            
            this.hide();
        });
    }
}