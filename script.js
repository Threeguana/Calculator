let display = '0';
let previousValue = null;
let operation = null;
let newNumber = true;

const currentDisplay = document.getElementById('currentDisplay');
const previousOperation = document.getElementById('previousOperation');

function updateDisplay() {
    currentDisplay.textContent = display;
    if (previousValue !== null && operation) {
        previousOperation.textContent = `${previousValue} ${operation}`;
    } else {
        previousOperation.textContent = '';
    }
}

function handleNumber(num) {
    if (newNumber) {
        display = num;
        newNumber = false;
    } else {
        display = display === '0' ? num : display + num;
    }
    updateDisplay();
}

function handleDecimal() {
    if (newNumber) {
        display = '0.';
        newNumber = false;
    } else if (!display.includes('.')) {
        display += '.';
    }
    updateDisplay();
}

function handleOperation(op) {
    const current = parseFloat(display);

    if (previousValue === null) {
        previousValue = current;
    } else if (operation) {
        const result = calculate(previousValue, current, operation);
        display = String(result);
        previousValue = result;
    }

    operation = op;
    newNumber = true;
    updateDisplay();
}

function calculate(prev, current, op) {
    switch (op) {
        case '+':
            return prev + current;
        case '-':
            return prev - current;
        case '×':
            return prev * current;
        case '÷':
            return prev / current;
        default:
            return current;
    }
}

function handleEquals() {
    if (operation && previousValue !== null) {
        const current = parseFloat(display);
        const result = calculate(previousValue, current, operation);
        display = String(result);
        previousValue = null;
        operation = null;
        newNumber = true;
        updateDisplay();
    }
}

function handleClear() {
    display = '0';
    previousValue = null;
    operation = null;
    newNumber = true;
    updateDisplay();
}

function handleBackspace() {
    if (display.length > 1) {
        display = display.slice(0, -1);
    } else {
        display = '0';
        newNumber = true;
    }
    updateDisplay();
}

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') handleNumber(e.key);
    else if (e.key === '.') handleDecimal();
    else if (e.key === '+') handleOperation('+');
    else if (e.key === '-') handleOperation('-');
    else if (e.key === '*') handleOperation('×');
    else if (e.key === '/') {
        e.preventDefault();
        handleOperation('÷');
    } else if (e.key === 'Enter') handleEquals();
    else if (e.key === 'Escape') handleClear();
    else if (e.key === 'Backspace') handleBackspace();
});
