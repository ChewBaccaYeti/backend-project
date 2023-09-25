const fs = require('fs');
const morgan = require('morgan');
const express = require('express');
const app = express();

// Добавляем middleware для логирования запросов с использованием Morgan
app.use(morgan('combined'));

// Обрабатываем POST-запросы от Роутера 1
app.post('/', (req, res) => {
    const requestBody = req.body;
    console.log('Получен запрос от Роутера 1:');
    console.log(requestBody);

    // Обрабатываем запрос и формируем ответ
    const response = processRequest(requestBody);

    // Отправляем ответ на Роутер 1
    res.send(response);
});

// Запускаем сервер на порту 4002
app.listen(4002, () => {
    console.log('Сервер Роутера 2 запущен на порту 4002');
});

function processRequest(request) {
    // Здесь добавьте вашу логику обработки запроса и формирования ответа, как было показано ранее
}
