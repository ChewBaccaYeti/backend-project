// router-3.js
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
        // VALIDATION AND AUTHENTICATION PROCESS
        if (await validateAndAuthenticate(requestBody)) {
            res.send('Разрешенный ответ для клиента');
        } else {
            // IF CLIENT FAILED HIS VALIDATION/AUTHENTICATION PROCESS - REFUSE HIS REQUEST
            res.status(403).send('Отказано в доступе');
        }
    } catch (error) {
        res.status(500).send(`Ошибка: ${error.message}`);
    }
});

// SERVER LAUNCHING ON 4003 HOST
app.listen(4003, () => {
    console.log('Сервер Роутера 3 запущен на порту 4003');
});

async function validateAndAuthenticate(request) {
    const { username, password } = request;

    if (username === 'user' && password === 'password') {
        return true;
    } else {
        return false;
    }
}
