import TelegramBot from 'node-telegram-bot-api';

var token = '828677282:AAHZeJKKIbuSgOX56dnCx_IWsV7VWsuUzWo';
var bot = new TelegramBot(token, {polling: true});

export default bot;