'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _telegram = require('../../core/telegram');

var _telegram2 = _interopRequireDefault(_telegram);

var _telegramChats = require('../../models/basic/telegramChats');

var _telegramChats2 = _interopRequireDefault(_telegramChats);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var send = function send(header, message) {
	_telegramChats2.default.find().exec(function (err, Chats) {
		var telegramMessage = message;
		var helloText = header;
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = Chats[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var Chat = _step.value;

				_telegram2.default.sendMessage(Chat.ChatId, '<b>' + helloText + Chat.name + '</b>\n\n' + telegramMessage, { parse_mode: "HTML" });
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	});
};

exports.default = send;