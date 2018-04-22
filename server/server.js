const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

const calcHistory = require('./modules/calculations');

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/numbers', (req, res) => {
    res.send(calcHistory.calculations);
});

app.post('/numbers', (req, res) => {
    // todo
    // 1. get the inputs from the post request
    // 2. calculate them
    // 3. put them into an object
    // 4. push them into the array
    console.log(req.body);
    let answer = calcHistory.performCalculation (
        parseInt(req.body.num1),
        parseInt(req.body.num2),
        req.body.type);
    let itemToAdd = {
        num1: req.body.num1,
        num2: req.body.num2,
        type: req.body.type,
        answer: answer
    };
    calcHistory.calculations.push(itemToAdd);
    res.sendStatus(201);
});

app.delete('/numbers', (req, res) => {
    calcHistory.clearHistory();
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`Up and Running on port ${PORT}`);
});

