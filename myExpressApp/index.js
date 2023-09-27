// index.js
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

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

app.use('/router', async (req, res) => {
    try {
        // ROUTER 1 REQUEST PROCESSING
        const response = await router.processRequest(req.body);
        res.send(response);
    } catch (error) {
        res.status(500).send(`Ошибка: ${error.message}`);
    }
});

app.use('/router1', (req, res) => {
    // ROUTER 2 REQUEST PROCESSING
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
    // ROUTER 3 REQUEST PROCESSING
    router2
        .processRequest(req.body)
        .then((response) => {
            res.send(response);
        })
        .catch((error) => {
            res.status(500).send(`Ошибка: ${error.message}`);
        });
});

// LAUNCHING SERVER, ROUTERS AND CLIENT
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
