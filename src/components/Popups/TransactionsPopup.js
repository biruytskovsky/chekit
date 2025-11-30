import { BasePopup } from './BasePopup.js';
import { formatCurrency, formatDate, getMonthKey } from '../../utils/helpers.js';

export class TransactionsPopup extends BasePopup {
    constructor(container, transactionService) {
        super('transactions-popup', 'Детали Транзакций за Месяц', container);
        this.transactionService = transactionService;
        this.transactionsListEl = null; 
        
        window.addEventListener('transactionsUpdated', () => this.renderList());
    }
    
    renderContent() {
        return `
            <ul class="transactions-list" id="transactions-popup-list">
                </ul>
        `;
    }

    show() {
        super.show();
        if (!this.transactionsListEl) {
             this.transactionsListEl = this.overlay.querySelector('.transactions-list');
        }
        this.renderList();
    }

    renderList() {
        if (!this.transactionsListEl) return;
        
        const transactions = this.transactionService.getTransactions();
        this.transactionsListEl.innerHTML = '';

        if (transactions.length === 0) {
            this.transactionsListEl.innerHTML = '<p style="text-align: center; color: var(--color-text-light); padding: 20px;">Транзакций за этот месяц пока нет.</p>';
            return;
        }

        transactions.forEach(t => {
            const item = document.createElement('li');

            const typeModifier = t.type === 'income' ? 'income' : 'expense';
            item.className = `transaction-item transaction-item--${typeModifier}`; 

            const details = document.createElement('div');
            details.className = 'transaction-details';

            const sumEl = document.createElement('div');

            const sumModifier = t.type === 'income' ? 'income' : 'expense';
            sumEl.className = `transaction-item__sum transaction-item--${sumModifier}`; 
            const sign = t.type === 'income' ? '+' : '-';
            sumEl.textContent = `${sign} ${formatCurrency(t.amount)}`;
            details.appendChild(sumEl);

 
            const infoEl = document.createElement('div');

            infoEl.className = 'transaction-item__info';
            const commentText = t.comment ? `: ${t.comment}` : '';
            infoEl.textContent = `${t.category}${commentText} (${formatDate(t.date)})`;
            details.appendChild(infoEl);
            
            item.appendChild(details);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'transaction-delete-btn';
            deleteBtn.textContent = '✖'; 
            deleteBtn.title = 'Удалить транзакцию';
            deleteBtn.addEventListener('click', () => {
                this.transactionService.deleteTransaction(t.id, getMonthKey(new Date(t.date)));
            });

            item.appendChild(deleteBtn);
            this.transactionsListEl.appendChild(item);
        });
    }
}