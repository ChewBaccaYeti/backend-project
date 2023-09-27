// router-2.js
const fs = require('fs').promises;
const morgan = require('morgan');
const express = require('express');
const app = express();

// HANDLING MIDDLEWARE FOR REQUEST LOGGING BY morgan
app.use(morgan('combined'));

// POST-REQUEST PROCESSING FROM ROUTER 1
app.post('/', async (req, res) => {
    const requestBody = req.body;
    console.log('Получен запрос от Роутера 1:');
    console.log(requestBody);

    try {
        // REQUEST PROCESSING AND SENDING RESPONSE
        const response = await processRequest(requestBody);
        res.send(response);
    } catch (error) {
        // SENDING RESPONSE TO ROUTER 1
        res.status(500).send(`Ошибка: ${error.message}`);
    }
});

// SERVER LAUNCHING ON 4002 HOST
app.listen(4002, () => {
    console.log('Сервер Роутера 2 запущен на порту 4002');
});

async function processRequest(request) {
    const { command } = request;

    // COMMAND TYPE CHECKING
    if (command === 'ping') {
        return 'Ответ на ping';
    } else if (command === 'status') {
        return 'Статус: активен';
    } else {
        return 'Неизвестная команда';
    }
}
