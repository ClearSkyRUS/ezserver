import TelegramBot from 'node-telegram-bot-api';
import config from '../config'

const bot = new TelegramBot(config.telegramToken, {polling: true});

export default bot;