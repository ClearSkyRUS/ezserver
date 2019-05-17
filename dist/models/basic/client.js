"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClientSchema = new _mongoose.Schema({
	"name": String,
	"time": String,
	"type": String,
	"tel": Number,
	"check": Number,
	"points": Number,
	"gender": String,
	"sale": Number,
	"key": String,
	"value": String,
	"text": String,
	"adres": { type: Array, "default": [] }
});

var Client = _mongoose2.default.model('Client', ClientSchema);

exports.default = Client;