"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrderSchema = new _mongoose.Schema({
	"client": String,
	"date": String,
	"time": String,
	"totalprice": Number,
	"totalsale": Number,
	"bonuses": Number,
	"status": String,
	"ended": Number,
	"cart": { type: Array, "default": [] }
});

var Order = _mongoose2.default.model('Order', OrderSchema);

exports.default = Order;