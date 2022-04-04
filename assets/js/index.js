const calculator = document.querySelector('.calculator');

const displayInput = calculator.querySelector('#count');
const initialValue = displayInput.value;

const displayOutput = calculator.querySelector('#calculation');

const numbers = calculator.querySelectorAll('.number');
numbers.forEach((element) => {
    element.addEventListener('click', (event) => {
        if (displayInput.value.length === 8) return;
        
        displayInput.value = displayInput.value === '0'
        ? event.target.innerText 
        : displayInput.value + event.target.innerText;
    });
});

let calc = [];

const operators = calculator.querySelectorAll('.operator');
operators.forEach((element) => {
    element.addEventListener('click', (event) => {
        if (!calc.length && displayInput.value !== '0') {
            insertIntoCalc(displayInput.value);
        }

        if (typeof calc[calc.length - 1] === 'number') {
            calc.push(event.target.innerText);
        } else {
            calc.pop();
            calc.push(event.target.innerText);
        }

        displayInput.value = initialValue;
    });
});

const showResult = calculator.querySelector('#result-button');
showResult.addEventListener('click', () => {
    if (!calc.length) return;

    insertIntoCalc(displayInput.value);

    const secondNumber = calc.pop();
    const operation = calc.pop();
    const firstNumber = calc.pop();

    if (firstNumber === undefined || secondNumber === undefined 
        || operation === undefined) {
        displayOutput.value = `ERR`;
        return;
    }

    let result = makeResult(firstNumber, secondNumber, operation);

    if (!Number.isInteger(result)) {
        result = result.toFixed(3);
    }

    calc.push(result);
    displayOutput.value = calc[0];
    displayInput.value = `${firstNumber} ${operation} ${secondNumber}`;
});

const deleteCharacter = calculator.querySelector('.delete');
deleteCharacter.addEventListener('click', () => {
    if (displayInput.value === initialValue) return;
    
    const input = displayInput.value;  
    displayInput.value = deleteChar(input);
});

const clearDisplay = calculator.querySelector('#clear-button');
clearDisplay.addEventListener('click', clear);

function clear() {
    calc = [];
    displayInput.value = initialValue;
    displayOutput.value = '';
}

function deleteChar(str) {
    if (str.length > 1) {
        return str.substring(0, str.length - 1);
    } 
    
    return initialValue;
}

function insertIntoCalc(digit) {
    calc.push(Number(digit));
    return;
}

function makeResult (firstNumber, secondNumber, operator) {
    if (operator === '+') {
        return firstNumber + secondNumber;
    } else if (operator === '-') {
        return firstNumber - secondNumber;
    } else if (operator === 'x') {
        return firstNumber * secondNumber;
    } else {
        return firstNumber / secondNumber;
    }
}
