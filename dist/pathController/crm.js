'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dishs = require('./crmPages/dishs');

var _dishs2 = _interopRequireDefault(_dishs);

var _days = require('./crmPages/days');

var _days2 = _interopRequireDefault(_days);

var _daysquery = require('./crmPages/daysquery');

var _daysquery2 = _interopRequireDefault(_daysquery);

var _products = require('./crmPages/products');

var _products2 = _interopRequireDefault(_products);

var _dishTypes = require('./crmPages/dishTypes');

var _dishTypes2 = _interopRequireDefault(_dishTypes);

var _clients = require('./crmPages/clients');

var _clients2 = _interopRequireDefault(_clients);

var _programs = require('./crmPages/programs');

var _programs2 = _interopRequireDefault(_programs);

var _orders = require('./crmPages/orders');

var _orders2 = _interopRequireDefault(_orders);

var _workdata = require('./crmPages/workdata');

var _workdata2 = _interopRequireDefault(_workdata);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/dishs', _dishs2.default);
router.use('/daysquery', _daysquery2.default);
router.use('/days', _days2.default);
router.use('/products', _products2.default);
router.use('/dishtypes', _dishTypes2.default);
router.use('/clients', _clients2.default);

router.use('/programs', _programs2.default);
router.use('/orders', _orders2.default);
router.use('/workdata', _workdata2.default);

module.exports = router;