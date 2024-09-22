document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let firstOperand = null;
    let operator = null;

    // Function to update the display and handle input
    function updateDisplay(value) {
        if (value === '' || value === '.') {
            display.value = '0';
        } else {
            display.value = value;
        }
    }

    // Handle button clicks
    function handleButtonClick(value) {
        if (value === 'AC') {
            currentInput = '';
            firstOperand = null;
            operator = null;
            updateDisplay('0');
        } else if (value === '+/-') {
            if (currentInput.startsWith('-')) {
                currentInput = currentInput.slice(1);
            } else {
                currentInput = '-' + currentInput;
            }
            updateDisplay(currentInput || '0');
        } else if (value === '%') {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay(currentInput);
        } else if (value === '=') {
            if (firstOperand != null && operator != null) {
                const secondOperand = parseFloat(currentInput);
                let result;

                switch (operator) {
                    case '+':
                        result = firstOperand + secondOperand;
                        break;
                    case '-':
                        result = firstOperand - secondOperand;
                        break;
                    case '*':
                        result = firstOperand * secondOperand;
                        break;
                    case '/':
                        result = firstOperand / secondOperand;
                        break;
                    default:
                        return;
                }

                updateDisplay(result);
                currentInput = result.toString();
                firstOperand = null;
                operator = null;
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            firstOperand = parseFloat(currentInput);
            operator = value;
            currentInput = '';
        } else {
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else {
                currentInput += value;
            }
            updateDisplay(currentInput);
        }
    }

    // Attach event listeners to buttons
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', () => {
            handleButtonClick(button.textContent);
        });
    });

    // Handle keyboard input
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (!isNaN(key)) {
            handleButtonClick(key);
        } else if (key === '.') {
            handleButtonClick('.');
        } else if (key === 'Enter') {
            handleButtonClick('=');
        } else if (key === 'Backspace') {
            handleButtonClick('AC');
        } else if (['+', '-', '*', '/'].includes(key)) {
            handleButtonClick(key);
        } else if (key === 'Escape') {
            handleButtonClick('AC');
        }
    });
});
