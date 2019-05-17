'use strict';

var _OrderControler = require('../../controlers/complecs/OrderControler');

var _OrderControler2 = _interopRequireDefault(_OrderControler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

var Order = new _OrderControler2.default();

router.get('/', Order.index);
router.post('/', Order.create);
router.put('/:id', Order.update);
router.delete('/:id', Order.delete);

module.exports = router;