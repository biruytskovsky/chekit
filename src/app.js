/**
 * app.js: Главный модуль приложения.
 * Вся логика, включая обработку кнопок, находится здесь с корректными БЭМ-селекторами.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Получение DOM-элементов по ID
    const balanceValueEl = document.getElementById('balance-value');
    const transactionsListEl = document.getElementById('transactions-list');
    
    // Главные кнопки, которые были проблемой (используем ID, чтобы быть уверенными)
    const addIncomeBtn = document.getElementById('add-income-btn');
    const addExpenseBtn = document.getElementById('add-expense-btn');

    // Элементы модального окна
    const popupOverlay = document.getElementById('popup-overlay');
    const descInput = document.getElementById('transaction-description');
    const amountInput = document.getElementById('transaction-amount');
    const saveBtn = document.getElementById('save-transaction-btn');
    const cancelBtn = document.getElementById('cancel-transaction-btn');
    const popupTitleEl = document.querySelector('#popup-overlay h3');

    // 2. Состояние приложения
    let currentBalance = 0.00;
    let transactionType = 'income'; // 'income' или 'expense'

    // 3. Основные Функции

    function updateBalance() {
        balanceValueEl.textContent = `${currentBalance.toFixed(2)} ₽`;
    }

    function renderTransaction(transaction) {
        const itemEl = document.createElement('li');
        // Используем БЭМ класс для элемента списка
        itemEl.classList.add('transactions__item');

        // Выбираем правильный модификатор БЭМ для суммы
        const amountClass = transaction.type === 'income' 
            ? 'transactions__amount--income' 
            : 'transactions__amount--expense';

        const sign = transaction.type === 'income' ? '+' : '-';
        
        itemEl.innerHTML = `
            <span class="transactions__description">${transaction.description}</span>
            <span class="transactions__amount ${amountClass}">
                ${sign}${transaction.amount.toFixed(2)} ₽
            </span>
        `;
        transactionsListEl.prepend(itemEl);
    }

    function openPopup(type) {
        transactionType = type;
        popupTitleEl.textContent = type === 'income' ? 'Добавить Доход' : 'Добавить Расход';
        
        // Переключаем стили кнопки "Сохранить" в модальном окне в зависимости от типа транзакции
        saveBtn.classList.remove('button--income', 'button--expense');
        if (type === 'income') {
            saveBtn.classList.add('button--income');
        } else {
            // При сохранении расхода используем класс расхода: button--expense
            saveBtn.classList.add('button--expense');
        }
        
        // Сброс полей и показ
        descInput.value = '';
        amountInput.value = '';
        popupOverlay.style.display = 'block';
        descInput.focus();
    }

    function closePopup() {
        popupOverlay.style.display = 'none';
    }

    function saveTransaction() {
        const description = descInput.value.trim();
        let amount = parseFloat(amountInput.value);

        if (!description || isNaN(amount) || amount <= 0) {
            alert('Пожалуйста, введите корректное описание и сумму.');
            return;
        }

        // Обновление баланса
        if (transactionType === 'income') {
            currentBalance += amount;
        } else {
            currentBalance -= amount;
        }

        const transaction = {
            description,
            amount,
            type: transactionType
        };
        
        renderTransaction(transaction);
        updateBalance();
        closePopup();
    }

    // 4. Обработчики Событий

    // Назначаем обработчики на главные кнопки
    addIncomeBtn.addEventListener('click', () => openPopup('income'));
    addExpenseBtn.addEventListener('click', () => openPopup('expense'));

    // Назначаем обработчики на кнопки в модальном окне
    saveBtn.addEventListener('click', saveTransaction);
    cancelBtn.addEventListener('click', closePopup);

    // Первоначальная инициализация
    updateBalance();
});