const fs = require('fs');
const morgan = require('morgan');
const express = require('express');
const app = express();

// Добавляем middleware для логирования запросов с использованием Morgan
app.use(morgan('combined'));

// Обрабатываем POST-запросы от сервера
app.post('/', (req, res) => {
    const requestBody = req.body;
    console.log('Получен запрос от сервера:');
    console.log(requestBody);

    // Обрабатываем запрос и отправляем его на Роутер 2
    sendCommandToRouter(requestBody, router2Config)
        .then((response) => {
            res.send(response);
        })
        .catch((error) => {
            res.status(500).send(`Ошибка: ${error.message}`);
        });
});

// Запускаем сервер на порту 4001
app.listen(4001, () => {
    console.log('Сервер Роутера 1 запущен на порту 4001');
});

async function sendCommandToRouter(command, routerConfig) {
    // Тут вставьте логику отправки команды на Роутер 2, как было показано ранее
}
