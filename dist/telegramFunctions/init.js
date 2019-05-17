'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _telegram = require('../core/telegram');

var _telegram2 = _interopRequireDefault(_telegram);

var _telegramChats = require('../models/basic/telegramChats');

var _telegramChats2 = _interopRequireDefault(_telegramChats);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initAdmin(msg, match) {
	var name = match[1];
	var chatId = msg.from.id;
	var Chat = new _telegramChats2.default({
		"name": name,
		"ChatId": chatId
	});
	Chat.save().then(function () {
		_telegram2.default.sendMessage(chatId, 'Теперь , ' + name + ', я буду доносить до тебя какую-нибудь информацию, какую смогу, если не сдохну');
	});
};

exports.default = initAdmin;