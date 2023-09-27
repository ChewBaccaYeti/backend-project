// server.js
const fs = require('fs').promises;
const commander = require('commander');
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const app = express();

// HANDLING MIDDLEWARE FOR REQUEST LOGGING BY morgan
app.use(morgan('combined'));

// ADD MIDDLEWARE FOR CORS ACCESS
app.use(cors());

// GET-REQUEST PROCESSING ON URL DIRECTION
app.get('/', (req, res) => {
    res.send('Добро пожаловать на сервер');
});

// POST-REQUEST PROCESSING BY commander
commander
    .command('post <message>')
    .description('Отправить сообщение на роутер')
    .action(async (message) => {
        try {
            // POST-REQUEST PROCESSING AND SENDING RESPONSE
            const response = await sendCommandToRouter(message, router1Config);
            res.send(response);
        } catch (error) {
            res.status(500).send(`Ошибка: ${error.message}`);
        }
    });

// LAUNCHING SERVER ON 3000 PORT
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});

const { Connection } = require('node-routeros');
const router1Config = {
    host: 'router1_ip_address',
    user: 'admin',
    password: 'password',
};

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
