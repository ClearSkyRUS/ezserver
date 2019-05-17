'use strict';

var _ProductControler = require('../../controlers/basic/ProductControler');

var _ProductControler2 = _interopRequireDefault(_ProductControler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

var Product = new _ProductControler2.default();

router.get('/', Product.index);
router.post('/', Product.create);
router.put('/:id', Product.update);
router.delete('/:id', Product.delete);

module.exports = router;