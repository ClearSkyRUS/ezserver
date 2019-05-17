'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _products = require('./items/products');

var _products2 = _interopRequireDefault(_products);

var _dishTypes = require('./items/dishTypes');

var _dishTypes2 = _interopRequireDefault(_dishTypes);

var _clients = require('./items/clients');

var _clients2 = _interopRequireDefault(_clients);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/products', _products2.default);
router.use('/dishtypes', _dishTypes2.default);
router.use('/clients', _clients2.default);

module.exports = router;