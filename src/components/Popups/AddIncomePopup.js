import { BasePopup } from './BasePopup.js';
import { INCOME_CATEGORIES } from '../../utils/constants.js';
import { Transaction } from '../../models/Transaction.js';

export class AddIncomePopup extends BasePopup {
    constructor(container, transactionService) {
        super('income-popup', 'Добавить Доход', container);
        this.transactionService = transactionService;
        this.form = this.overlay.querySelector('form');
        this.setupFormSubmission();
    }

    renderContent() {
        const form = document.createElement('form');
        form.className = 'popup-form';
        form.innerHTML = `
            <label for="income-amount">Сумма (обязательно):</label>
            <input type="number" id="income-amount" step="0.01" required>

            <label for="income-category">Категория (обязательно):</label>
            <select id="income-category" required>
                <option value="" disabled selected>Выберите категорию</option>
                ${INCOME_CATEGORIES.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
            </select>

            <label for="income-comment">Комментарий (необязательно):</label>
            <textarea id="income-comment" rows="2"></textarea>
            
            <div class="popup-actions">
                <button type="button" class="cancel-btn" id="income-cancel">Отмена</button>
                <button type="submit" class="save-btn">Сохранить</button>
            </div>
        `;
        return form;
    }

    setupFormSubmission() {
        this.form.querySelector('#income-cancel').addEventListener('click', () => this.hide());
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const amount = this.form.querySelector('#income-amount').value;
            const category = this.form.querySelector('#income-category').value;
            const comment = this.form.querySelector('#income-comment').value;

            if (!amount || !category) {
                alert('Пожалуйста, введите сумму и выберите категорию.');
                return;
            }

            const newTransaction = new Transaction(
                'income',
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