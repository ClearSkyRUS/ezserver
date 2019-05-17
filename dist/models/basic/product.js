"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductSchema = new _mongoose.Schema({
	"title": String,
	"type": String,
	"prot": Number,
	"fat": Number,
	"carb": Number,
	"price": Number,
	"key": String,
	"value": String,
	"text": String,
	"cold": {
		type: Number,
		default: 0
	},
	"hot": {
		type: Number,
		default: 0
	},
	"ganes": {
		type: Number,
		default: 0
	}
});

var Product = _mongoose2.default.model('Product', ProductSchema);

exports.default = Product;