"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DishSchema = new _mongoose.Schema({
	"title": String,
	"type": String,
	"image": String,
	"gramms": Number,
	"cal": Number,
	"prot": Number,
	"fat": Number,
	"carb": Number,
	"price": Number,
	"key": String,
	"value": String,
	"text": String,
	"productslist": { type: Array, "default": [] }
});

var Dish = _mongoose2.default.model('Dish', DishSchema);

exports.default = Dish;