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

    // Выполняем валидацию и аутентификацию
    if (validateAndAuthenticate(requestBody)) {
        // Если клиент имеет права доступа, отправляем ему ответ
        res.send('Разрешенный ответ для клиента');
    } else {
        // Если клиент не прошел валидацию или аутентификацию, отправляем отказ
        res.status(403).send('Отказано в доступе');
    }
});

// Запускаем сервер на порту 4003
app.listen(4003, () => {
    console.log('Сервер Роутера 3 запущен на порту 4003');
});

function validateAndAuthenticate(request) {
    // Здесь добавьте вашу логику валидации и аутентификации, как было показано ранее
    return true; // Временно всегда разрешаем доступ
}
