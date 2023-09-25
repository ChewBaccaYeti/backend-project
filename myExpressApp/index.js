// index.js
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const server = require('./components/server');
const router1 = require('./components/router');
const router2 = require('./components/router1');
const router3 = require('./components/router2');
const client = require('./components/client');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/router', (req, res) => {
    // Обработка запроса для Роутера 1
    router
        .processRequest(req.body)
        .then((response) => {
            res.send(response);
        })
        .catch((error) => {
            res.status(500).send(`Ошибка: ${error.message}`);
        });
});

app.use('/router1', (req, res) => {
    // Обработка запроса для Роутера 2
    router1
        .processRequest(req.body)
        .then((response) => {
            res.send(response);
        })
        .catch((error) => {
            res.status(500).send(`Ошибка: ${error.message}`);
        });
});

app.use('/router2', (req, res) => {
    // Обработка запроса для Роутера 3
    router2
        .processRequest(req.body)
        .then((response) => {
            res.send(response);
        })
        .catch((error) => {
            res.status(500).send(`Ошибка: ${error.message}`);
        });
});

// Запускаем сервер, роутеры и клиент
server.startServer();
router1.startRouter1();
router2.startRouter2();
router3.startRouter3();
client.startClient();

app.get('/', (req, res) => {
    res.send('Добро пожаловать на сервер');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
