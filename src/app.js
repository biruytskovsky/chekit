import { TransactionService } from './services/TransactionService.js';
import { MainScreen } from './components/MainScreen.js';
import { AddIncomePopup } from './components/Popups/AddIncomePopup.js';
import { AddExpensePopup } from './components/Popups/AddExpensePopup.js';
import { TransactionsPopup } from './components/Popups/TransactionsPopup.js';

const transactionService = new TransactionService();

const popupsContainer = document.getElementById('popups-container');

const incomePopup = new AddIncomePopup(popupsContainer, transactionService);
const expensePopup = new AddExpensePopup(popupsContainer, transactionService);
const transactionsPopup = new TransactionsPopup(popupsContainer, transactionService);

const mainScreen = new MainScreen(transactionService);

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

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    console.log('Приложение учета финансов запущено.');
});