import { BasePopup } from './BasePopup.js';
import { EXPENSE_CATEGORIES } from '../../utils/constants.js';
import { Transaction } from '../../models/Transaction.js';

export class AddExpensePopup extends BasePopup {
    constructor(container, transactionService) {
        super('expense-popup', 'Добавить Расход', container);
        this.transactionService = transactionService;
        this.form = this.overlay.querySelector('form');
        this.setupFormSubmission();
    }

    renderContent() {
        const form = document.createElement('form');
        form.className = 'popup-form';
        form.innerHTML = `
            <label for="expense-amount">Сумма (обязательно):</label>
            <input type="number" id="expense-amount" step="0.01" required>

            <label for="expense-category">Категория (обязательно):</label>
            <select id="expense-category" required>
                <option value="" disabled selected>Выберите категорию</option>
                ${EXPENSE_CATEGORIES.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
            </select>

            <label for="expense-comment">Комментарий (необязательно):</label>
            <textarea id="expense-comment" rows="2"></textarea>
            
            <div class="popup-actions">
                <button type="button" class="cancel-btn" id="expense-cancel">Отмена</button>
                <button type="submit" class="save-btn">Сохранить</button>
            </div>
        `;
        return form;
    }

    setupFormSubmission() {
        this.form.querySelector('#expense-cancel').addEventListener('click', () => this.hide());
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const amount = this.form.querySelector('#expense-amount').value;
            const category = this.form.querySelector('#expense-category').value;
            const comment = this.form.querySelector('#expense-comment').value;

            if (!amount || !category) {
                alert('Пожалуйста, введите сумму и выберите категорию.');
                return;
            }

            const newTransaction = new Transaction(
                'expense',
                category,
                amount,
                comment
            );

            this.transactionService.addTransaction(newTransaction);
            this.form.reset();
            this.hide();
        });
    }
}