"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DishSchema = new _mongoose.Schema({
	"title": String,
	"tehMap": String,
	"type": { type: _mongoose.Schema.Types.ObjectId, ref: 'DishType' },
	"image": String,
	"gramms": Number,
	"productslist": [{
		"id": String,
		"product": { type: _mongoose.Schema.Types.ObjectId, ref: 'Product' },
		"gramm": Number,
		"cold": Boolean,
		"hot": Boolean,
		"ganes": Boolean
	}]
});

var Dish = _mongoose2.default.model('Dish', DishSchema);

exports.default = Dish;