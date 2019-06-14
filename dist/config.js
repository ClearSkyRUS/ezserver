'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
	options: {},
	mongoConnection: 'mongodb://localhost/ezserver',
	mongoAuth: {},
	telegramToken: '814547968:AAH6-BF2iovOwH7ppcyXKA6vDyZKl7GByHs',
	port: 3003,
	https: true
};

exports.default = config;