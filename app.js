document.addEventListener('DOMContentLoaded', function () {
    // Load expenses from local storage on page load
    loadExpenses();

    // Add event listener to the form
    document.getElementById('expenseForm').addEventListener('submit', function (e) {
        e.preventDefault();
    });

    // Add event listener to the "Add Expense" button
    document.getElementById('expenseAmount').addEventListener('input', function () {
        validateAmountInput();
    });

    // Add event listener to the "Add Expense" button
    document.querySelector('button').addEventListener('click', function () {
        addExpense();
    });
});

function validateAmountInput() {
    const amountInput = document.getElementById('expenseAmount');
    const isValid = /^\d+(\.\d{1,2})?$/.test(amountInput.value);

    if (!isValid) {
        amountInput.setCustomValidity('Enter a valid amount (e.g., 25.50)');
    } else {
        amountInput.setCustomValidity('');
    }
}

function addExpense() {
    // Get user input
    const description = document.getElementById('expenseDescription').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);

    // Validate input
    if (!description || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid description and amount.');
        return;
    }

    // Create expense object
    const expense = {
        description,
        amount
    };

    // Get existing expenses from local storage
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Add the new expense to the list
    expenses.push(expense);

    // Save the updated list to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Clear the form
    document.getElementById('expenseForm').reset();

    // Reload the expense list
    loadExpenses();
}

function loadExpenses() {
    const expenseList = document.getElementById('expenseList');
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Clear existing content
    expenseList.innerHTML = '';

    // Display each expense
    expenses.forEach(function (expense) {
        const expenseItem = document.createElement('div');
        expenseItem.classList.add('expense-item');
        expenseItem.innerHTML = `<strong>${expense.description}</strong>: $${expense.amount.toFixed(2)}`;
        expenseList.appendChild(expenseItem);
    });
}
