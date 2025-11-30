// src/components/Popups/TransactionsPopup.js

import { BasePopup } from './BasePopup.js';
import { formatCurrency, formatDate, getMonthKey } from '../../utils/helpers.js';

export class TransactionsPopup extends BasePopup {
    constructor(container, transactionService) {
        super('transactions-popup', 'Детали Транзакций за Месяц', container);
        this.transactionService = transactionService;
        this.transactionsListEl = this.overlay.querySelector('.transactions-list');
        
        window.addEventListener('transactionsUpdated', () => this.renderList());
    }
    
    // ... (renderContent остается без изменений, кроме стилей кнопок) ...

    show() {
        super.show();
        this.renderList();
    }

    /**
     * Рендерит список транзакций (с классами БЭМ).
     */
    renderList() {
        if (!this.transactionsListEl) {
             this.transactionsListEl = this.overlay.querySelector('.transactions-list');
        }

        const transactions = this.transactionService.getTransactions();
        this.transactionsListEl.innerHTML = '';

        if (transactions.length === 0) {
            this.transactionsListEl.innerHTML = '<p style="text-align: center; color: var(--color-text-light); padding: 20px;">Транзакций за этот месяц пока нет.</p>';
            return;
        }

        transactions.forEach(t => {
            const item = document.createElement('li');
            // БЭМ: transaction-item + модификатор типа
            item.className = `transaction-item transaction-item--${t.type}`; 

            const details = document.createElement('div');
            details.className = 'transaction-details';

            // Сумма (тип, сумма)
            const sumEl = document.createElement('div');
            // БЭМ: transaction-item__sum
            sumEl.className = 'transaction-item__sum'; 
            const sign = t.type === 'income' ? '+' : '-';
            sumEl.textContent = `${sign} ${formatCurrency(t.amount)}`;
            details.appendChild(sumEl);

            // Информация (категория, комментарий, дата)
            const infoEl = document.createElement('div');
            // БЭМ: transaction-item__info
            infoEl.className = 'transaction-item__info';
            const commentText = t.comment ? `: ${t.comment}` : '';
            infoEl.textContent = `${t.category}${commentText} (${formatDate(t.date)})`;
            details.appendChild(infoEl);
            
            item.appendChild(details);

            // Кнопка удаления
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