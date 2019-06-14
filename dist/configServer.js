'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
	options: {
		key: _fs2.default.readFileSync('/etc/letsencrypt/live/man.ezfood.ru/privkey.pem'),
		cert: _fs2.default.readFileSync('/etc/letsencrypt/live/man.ezfood.ru/fullchain.pem')
	},
	mongoConnection: 'mongodb://localhost/ezserver',
	mongoAuth: { "auth": { "authSource": "admin" }, "user": "admin", "pass": "28121995Vlad" },
	telegramToken: '828677282:AAHZeJKKIbuSgOX56dnCx_IWsV7VWsuUzWo',
	port: 3003,
	https: false
};

exports.default = config;