"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TelegramChatSchema = new _mongoose.Schema({
	"name": String,
	"ChatId": String
});

var TelegramChat = _mongoose2.default.model('TelegramChat', TelegramChatSchema);

exports.default = TelegramChat;