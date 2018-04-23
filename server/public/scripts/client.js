console.log('JS is ready');

$(document).ready(onReady);

function onReady() {
    console.log('jQuery is ready');
    $('#addition').on('click', performCalc.bind(performCalc, 'add'));
    $('#subtraction').on('click', performCalc.bind(performCalc, 'subtract'));
    $('#multiply').on('click', performCalc.bind(performCalc, 'multiply'));
    $('#divide').on('click', performCalc.bind(performCalc, 'divide'));
    $('#clearButton').on('click', deleteHistory);
    getCalc();
}

function getCalc() {
    $.ajax({
        method: 'GET',
        url: '/numbers'
    })
        .then(function (response) {
           //to do
           // 1. clear out old history
           // 2. loop through the response
           // 3. Find string representation of type
           // 4. show object on the DOM
           $('#history').empty();
           console.log(response);
           response.forEach(appendItemToHistory);

        });
}

function performCalc(operator) {
    const newCalc = {
        num1: parseInt($('#num1').val()),
        num2: parseInt($('#num2').val()),
        type: operator
    };
    console.log('New calculation', newCalc);
    $.ajax({
        method: 'POST',
        url: '/numbers',
        data: newCalc
    })
        .then(function (response) {
            console.log(response);
            getCalc();
            $('input').val('');
        });

}

function appendItemToHistory (item) {
    let operator = convertTypeToOperator(item.type)
    $('#history').append(`<li> ${item.num1} ${operator} ${item.num2} = ${item.answer} </li>`);
}

function convertTypeToOperator (type) {
    switch(type) {
        case 'add':
        return '+';
        case 'subtract':
        return '-';
        case 'multiply':
        return 'x';
        case 'divide':
        return '/';
    }
}

function deleteHistory() {
    $.ajax({
        method: 'DELETE',
        url: '/numbers',
    })
    .then(function (response) {
        getCalc();
    });
}
