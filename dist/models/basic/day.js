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
	"key": String,
	"value": String,
	"text": String,
	"active": { type: Boolean, default: false },
	"meals": [{
		"title": String,
		"procent": { type: Number, default: 20 },
		"meal": [{
			"main": Boolean,
			"type": { type: String },
			"image": String,
			"dishs": [{
				"id": String,
				"dish": { type: _mongoose.Schema.Types.ObjectId, ref: 'Dish' },
				"procent": { type: Number, default: 100 }
			}]
		}]
	}]
});

var Day = _mongoose2.default.model('Day', DaySchema);

exports.default = Day;