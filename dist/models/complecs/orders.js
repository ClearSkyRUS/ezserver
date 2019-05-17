'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrderSchema = new _mongoose.Schema({
	"client": { type: _mongoose.Schema.Types.ObjectId, ref: 'Client' },
	"date": String,
	"totalprice": Number,
	"totalsale": Number,
	"bonuses": Number,
	"status": String,
	"ended": Number,
	"cart": [{
		"program": { type: _mongoose.Schema.Types.ObjectId, ref: 'Program' },
		"option": Number,
		"name": String,
		"price": Number,
		"quanity": Number,
		"days": [Date]
	}]
});

var Order = _mongoose2.default.model('Order', OrderSchema);

exports.default = Order;