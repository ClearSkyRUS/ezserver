'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _mainPath = require('./pathController/mainPath');

var _mainPath2 = _interopRequireDefault(_mainPath);

var _telegram = require('./core/telegram');

var _telegram2 = _interopRequireDefault(_telegram);

var _init = require('./telegramFunctions/init');

var _init2 = _interopRequireDefault(_init);

var _daysQuery = require('./controlers/looped/daysQuery');

var _daysQuery2 = _interopRequireDefault(_daysQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/man.ezfood.ru/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/man.ezfood.ru/fullchain.pem')
};

var app = (0, _express2.default)();
_mongoose2.default.connect('mongodb://localhost/ezserver', { "auth": { "authSource": "admin" }, "user": "admin", "pass": "28121995Vlad" });

app.use(_bodyParser2.default.urlencoded({ extended: true }, { limit: '50mb' }));
app.use(_bodyParser2.default.json({ limit: '50mb' }));
app.use((0, _cors2.default)());

app.use('/API', _mainPath2.default);

_telegram2.default.onText(/подчинись бот, я (.+)/, _init2.default);

var Query = new _daysQuery2.default();

setInterval(function () {
  Query.create();
}, 43200000);

_https2.default.createServer(options, app).listen(3003);