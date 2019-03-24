"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DaySchema = new _mongoose.Schema({
	"title": String,
	"type": String,
	"active": Number,
	"key": String,
	"value": String,
	"text": String,
	"meals": { type: Array, "default": [] }
});

var Day = _mongoose2.default.model('Day', DaySchema);

exports.default = Day;