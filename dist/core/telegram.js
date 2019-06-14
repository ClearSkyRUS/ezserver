'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeTelegramBotApi = require('node-telegram-bot-api');

var _nodeTelegramBotApi2 = _interopRequireDefault(_nodeTelegramBotApi);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bot = new _nodeTelegramBotApi2.default(_config2.default.telegramToken, { polling: true });

exports.default = bot;