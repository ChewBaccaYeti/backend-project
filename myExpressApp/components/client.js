// client.js
const fs = require('fs').promises;
const net = require('net');
const commander = require('commander');

const client = new net.Socket();

commander
    .version('1.0.0')
    .description('Клиент для отправки запросов на сервер')
    .option('-m, --message <message>', 'Сообщение для отправки на сервер')
    .parse(process.argv);

if (!commander.message) {
    commander.outputHelp();
    process.exit(1);
}

const request = commander.message;

client.connect(3000, '127.0.0.1', () => {
    console.log('Подключено к серверу');

    // SENDING REQUEST TO SERVER
    client.write(request);
});

client.on('data', async (data) => {
    const response = data.toString('utf8');
    console.log('Получен ответ от сервера:');
    console.log(response);
    try {
        await fs.writeFile('response.txt', response); // Запись ответа в файл
    } catch (error) {
        console.error(`Ошибка записи в файл: ${error.message}`);
    }
});

client.on('close', () => {
    console.log('Соединение закрыто');
});
