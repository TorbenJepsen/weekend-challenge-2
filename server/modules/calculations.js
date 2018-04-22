/**
 * [{num1: 3, num2: 5, answer: 8, type: 'add' }]
 */
const calculations = [
    {
        num1: 3,
        num2: 5,
        answer: 8,
        type: 'add'
    }

];

// accepts two numbers and operation 'type', and returns the answer
function performCalculation(num1, num2, type) {
    switch (type) {
        case 'add':
            return num1 + num2;
        case 'subtract':
            return num1 - num2;
        case 'multiply':
            return num1 * num2;
        case 'divide':
            return num1 / num2;
    }
}

function clearHistory() {
    calculations.splice(0, calculations.length);
}

module.exports = {
    performCalculation: performCalculation,
    calculations: calculations,
    clearHistory: clearHistory
}