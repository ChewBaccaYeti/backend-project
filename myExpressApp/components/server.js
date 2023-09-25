const fs = require('fs');
const commander = require('commander');
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const app = express();

// Добавляем middleware для логирования запросов с использованием Morgan
app.use(morgan('combined'));

// Добавляем middleware для разрешения CORS
app.use(cors());

// Обрабатываем GET-запросы на корневой URL
app.get('/', (req, res) => {
    res.send('Добро пожаловать на сервер');
});

// Обрабатываем POST-запросы с использованием команды commander
commander
    .command('post <message>')
    .description('Отправить сообщение на роутер')
    .action((message) => {
        // Обрабатываем POST-запрос и отправляем сообщение на роутер
        sendCommandToRouter(message, router1Config)
            .then((response) => {
                res.send(response);
            })
            .catch((error) => {
                res.status(500).send(`Ошибка: ${error.message}`);
            });
    });

// Запускаем сервер на порту 3000
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});

const { Connection } = require('node-routeros');
const router1Config = {
    host: 'router1_ip_address', // Замените на IP-адрес вашего первого роутера
    user: 'admin', // Замените на имя пользователя вашего роутера
    password: 'password', // Замените на пароль вашего роутера
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
