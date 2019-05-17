"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DishTypeSchema = new _mongoose.Schema({
	"title": String,
	"unit": String,
	"max": String,
	"min": String,
	"portions": []
});

var DishType = _mongoose2.default.model('DishType', DishTypeSchema);

exports.default = DishType;