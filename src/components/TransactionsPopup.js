import { BasePopup } from './BasePopup.js';
import { formatCurrency, formatDate, getMonthKey } from '../../utils/helpers.js';

export class TransactionsPopup extends BasePopup {
    constructor(container, transactionService) {
        super('transactions-popup', 'Детали Транзакций за Месяц', container);
        this.transactionService = transactionService;
        this.transactionsListEl = this.overlay.querySelector('.transactions-list');
        
        // Подписываемся на обновление данных
        window.addEventListener('transactionsUpdated', () => this.renderList());
    }

    renderContent() {
        const contentContainer = document.createElement('div');
        contentContainer.style.flexGrow = 1;
        contentContainer.style.display = 'flex';
        contentContainer.style.flexDirection = 'column';

        const list = document.createElement('ul');
        list.className = 'transactions-list';
        contentContainer.appendChild(list);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'popup-actions';
        actionsDiv.innerHTML = `
            <button type="button" class="cancel-btn" style="flex-grow: 0;" id="close-transactions-popup">Закрыть</button>
        `;
        actionsDiv.querySelector('#close-transactions-popup').addEventListener('click', () => this.hide());
        
        contentContainer.appendChild(actionsDiv);
        return contentContainer;
    }
    
    show() {
        super.show();
        this.renderList();
    }

    /**
     * Рендерит список транзакций (обновляется при каждом show/update).
     */
    renderList() {
        // Убедимся, что list элемент существует после BasePopup.createOverlay
        if (!this.transactionsListEl) {
             this.transactionsListEl = this.overlay.querySelector('.transactions-list');
        }

        const transactions = this.transactionService.getTransactions();
        this.transactionsListEl.innerHTML = '';

        if (transactions.length === 0) {
            this.transactionsListEl.innerHTML = '<p style="text-align: center; color: #757575; padding: 20px;">Транзакций за этот месяц пока нет.</p>';
            return;
        }

        transactions.forEach(t => {
            const item = document.createElement('li');
            item.className = `transaction-item ${t.type}-type`;

            const details = document.createElement('div');
            details.className = 'transaction-details';

            // Сумма (тип, сумма)
            const sumEl = document.createElement('div');
            sumEl.className = `transaction-sum ${t.type}-sum`;
            const sign = t.type === 'income' ? '+' : '-';
            sumEl.textContent = `${sign} ${formatCurrency(t.amount)}`;
            details.appendChild(sumEl);

            // Информация (категория, комментарий, дата)
            const infoEl = document.createElement('div');
            infoEl.className = 'transaction-info';
            // Используем textContent для безопасного вывода пользовательского ввода (XSS prevention)
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