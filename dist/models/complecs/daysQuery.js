'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DaysQuerySchema = new _mongoose.Schema({
	"day": { type: _mongoose.Schema.Types.ObjectId, ref: 'Day' },
	"date": Date
});

var DaysQuery = _mongoose2.default.model('DaysQuery', DaysQuerySchema);

exports.default = DaysQuery;