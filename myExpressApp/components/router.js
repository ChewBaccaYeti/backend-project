// router-1.js
const fs = require('fs').promises;
const morgan = require('morgan');
const express = require('express');
const { Connection } = require('node-routeros'); // Импортируем Connection из node-routeros
const app = express();

// HANDLING MIDDLEWARE FOR REQUEST LOGGING BY morgan
app.use(morgan('combined'));

// ROUTER 2 NAVIGATION
const router2Config = {
    host: 'router2_ip_address',
    user: 'admin',
    password: 'password',
};

// POST-REQUEST PROCESSING FROM SERVER
app.post('/', async (req, res) => {
    const requestBody = req.body;
    console.log('Получен запрос от сервера:');
    console.log(requestBody);

    try {
        // SENDING REQUEST TO ROUTER 2 AND RECEIVING RESPONSE
        const response = await sendCommandToRouter(requestBody, router2Config);
        res.send(response);
    } catch (error) {
        res.status(500).send(`Ошибка: ${error.message}`);
    }
});

// SERVER LAUNCHING ON 4001 HOST
app.listen(4001, () => {
    console.log('Сервер Роутера 1 запущен на порту 4001');
});

async function sendCommandToRouter(command, routerConfig) {
    try {
        const connection = new Connection(routerConfig);
        await connection.connect();

        const response = await connection.exec(command);

        connection.close();

        return response;
    } catch (error) {
        throw new Error(
            `Ошибка при отправке команды на роутер: ${error.message}`
        );
    }
}
