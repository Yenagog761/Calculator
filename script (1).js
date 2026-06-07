let display = document.getElementById('display');
let expression = '';

function appendNumber(number) {
    if (number === '.' && expression.includes('.')) {
        return;
    }
    expression += number;
    updateDisplay();
}

function appendOperator(operator) {
    // Prevent multiple operators in a row
    if (expression === '') {
        return;
    }
    
    const lastChar = expression.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        expression = expression.slice(0, -1) + operator;
    } else {
        expression += operator;
    }
    updateDisplay();
}

function updateDisplay() {
    display.value = expression || '0';
}

function clearDisplay() {
    expression = '';
    updateDisplay();
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function calculate() {
    try {
        if (expression === '') {
            return;
        }
        
        // Evaluate the expression
        const result = Function('"use strict"; return (' + expression + ')')();
        
        // Format the result
        expression = String(result);
        updateDisplay();
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
}

// Allow keyboard input
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault();
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        event.preventDefault();
        clearDisplay();
    }
});

// Initialize display
updateDisplay();