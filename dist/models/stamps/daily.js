"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DailySchema = new _mongoose.Schema({
	"consumption": Number,
	"income": Number,
	"endedOrders": Number,
	"bonusesGiven": Number
}, { timestamps: { createdAt: 'created_at' } });

var Daily = _mongoose2.default.model('Daily', DailySchema);

exports.default = Daily;