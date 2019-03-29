'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _ProductControler = require('./controlers/basic/ProductControler');

var _ProductControler2 = _interopRequireDefault(_ProductControler);

var _DIshControler = require('./controlers/basic/DIshControler');

var _DIshControler2 = _interopRequireDefault(_DIshControler);

var _DayControler = require('./controlers/basic/DayControler');

var _DayControler2 = _interopRequireDefault(_DayControler);

var _ProgramControler = require('./controlers/complecs/ProgramControler');

var _ProgramControler2 = _interopRequireDefault(_ProgramControler);

var _ClientControler = require('./controlers/basic/ClientControler');

var _ClientControler2 = _interopRequireDefault(_ClientControler);

var _OrderControler = require('./controlers/complecs/OrderControler');

var _OrderControler2 = _interopRequireDefault(_OrderControler);

var _WorkDataControler = require('./controlers/heavy/WorkDataControler');

var _WorkDataControler2 = _interopRequireDefault(_WorkDataControler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Product = new _ProductControler2.default();

var Dish = new _DIshControler2.default();

var Day = new _DayControler2.default();

var Program = new _ProgramControler2.default();

var Client = new _ClientControler2.default();

var Order = new _OrderControler2.default();

var WorkData = new _WorkDataControler2.default();

var app = (0, _express2.default)();

_mongoose2.default.connect('mongodb://localhost/ezserver');

app.use(_bodyParser2.default.urlencoded({ extended: true }, { limit: '50mb' }));
app.use(_bodyParser2.default.json({ limit: '50mb' }));

app.use((0, _cors2.default)());

app.post('/API/products', Product.create);
app.get('/API/products', Product.index);
app.put('/API/products/:id', Product.update);
app.delete('/API/products/:id', Product.delete);

app.post('/API/dishs', Dish.create);
app.get('/API/dishs', Dish.index);
app.put('/API/dishs/:id', Dish.update);
app.delete('/API/dishs/:id', Dish.delete);

app.post('/API/days', Day.create);
app.get('/API/days', Day.index);
app.put('/API/days/:id', Day.update);
app.delete('/API/days/:id', Day.delete);

app.post('/API/programs', Program.create);
app.get('/API/programs', Program.index);
app.put('/API/programs/:id', Program.update);
app.delete('/API/programs/:id', Program.delete);

app.post('/API/orders', Order.create);
app.get('/API/orders', Order.index);
app.put('/API/orders/:id', Order.update);
app.delete('/API/orders/:id', Order.delete);

app.post('/API/clients', Client.create);
app.get('/API/clients', Client.index);
app.put('/API/clients/:id', Client.update);
app.delete('/API/clients/:id', Client.delete);

app.get('/API/workdata/:count', WorkData.index);

app.listen(3333, function () {
	console.log('SERVER STARTED!');
});