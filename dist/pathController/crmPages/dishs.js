'use strict';

var _DIshControler = require('../../controlers/basic/DIshControler.js');

var _DIshControler2 = _interopRequireDefault(_DIshControler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

var Dish = new _DIshControler2.default();

router.get('/', Dish.index);
router.post('/', Dish.create);
router.put('/:id', Dish.update);
router.delete('/:id', Dish.delete);

module.exports = router;