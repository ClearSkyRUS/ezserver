'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeTelegramBotApi = require('node-telegram-bot-api');

var _nodeTelegramBotApi2 = _interopRequireDefault(_nodeTelegramBotApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var token = '828677282:AAHZeJKKIbuSgOX56dnCx_IWsV7VWsuUzWo';
var bot = new _nodeTelegramBotApi2.default(token, { polling: true });

exports.default = bot;