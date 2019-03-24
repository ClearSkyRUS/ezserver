"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProgramSchema = new _mongoose.Schema({
	"title": String,
	"type": String,
	"image": String,
	"price": String,
	"key": String,
	"value": String,
	"text": String,
	"options": { type: Array, "default": [] },
	"settings": { type: Array, "default": [] },
	"portions": { type: Array, "default": [] }
});

var Program = _mongoose2.default.model('Program', ProgramSchema);

exports.default = Program;