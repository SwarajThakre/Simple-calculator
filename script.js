// get elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.number');

// state variables
let currentInput = '';
let operator = '';
let previousInput = '';

// Number Map 
const numberMap = {
    'zero': '0',
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9' 
};

// Operator Map
const operatorMap = {
    'add': '+',
    'subtract': '-',
    'multiply': '*',
    'divide': '/'
};


// update display
function updateDisplay(value) {
    display.value = value;
}

// clear display
function clearDisplay(){
    currentInput = '';
    operator = '';
    previousInput = '';
    updateDisplay('');
}

// handle number input
function handleNumber(num){
    if(num === '.' && currentInput.includes('.')) return;
    currentInput += num;
    updateDisplay(currentInput);
}

// handle operator input
function handleOperator(op){
    if(currentInput === '' && previousInput !== '') {
        operator = op;
        return;
    };
    if(previousInput !== '' ){
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

// calculate result
function calculate(){
    if(previousInput === '' || currentInput === '') return;
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result = 0;
    switch(operator){
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                updateDisplay('Error');
                clearDisplay();
                return;
            }
            result = num1 / num2;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay(parseFloat(result.toFixed(6)));
}

// button click handler
buttons.forEach(button => {
    const id = button.id;
    button.addEventListener('click',()=>{
        if(numberMap[id]){
            handleNumber(numberMap[id]);
        } else if(operatorMap[id]){
            handleOperator(operatorMap[id]);
        } else if(id === 'clear'){
            clearDisplay();
        } else if(id === 'equals'){
            calculate();
        }  
    })
})