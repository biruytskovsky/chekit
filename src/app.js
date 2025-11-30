// src/app.js

import { TransactionService } from './services/TransactionService.js';
import { MainScreen } from './components/MainScreen.js';
import { AddIncomePopup } from './components/Popups/AddIncomePopup.js';
import { AddExpensePopup } from './components/Popups/AddExpensePopup.js';
import { TransactionsPopup } from './components/Popups/TransactionsPopup.js';

// Инициализация сервиса данных
const transactionService = new TransactionService();

// Контейнер для Popups
const popupsContainer = document.getElementById('popups-container');

// Инициализация компонентов Popups
const incomePopup = new AddIncomePopup(popupsContainer, transactionService);
const expensePopup = new AddExpensePopup(popupsContainer, transactionService);
const transactionsPopup = new TransactionsPopup(popupsContainer, transactionService);

// Инициализация Главного Экрана
const mainScreen = new MainScreen(transactionService);

/**
 * Установка обработчиков событий для кнопок на Главном Экране.
 */
function setupEventListeners() {
    document.getElementById('add-income-btn').addEventListener('click', () => {
        incomePopup.show();
    });

    document.getElementById('add-expense-btn').addEventListener('click', () => {
        expensePopup.show();
    });

    document.getElementById('show-transactions-btn').addEventListener('click', () => {
        transactionsPopup.show();
    });
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    console.log('Приложение учета финансов запущено.');
});