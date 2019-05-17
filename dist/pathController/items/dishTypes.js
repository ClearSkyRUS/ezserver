'use strict';

var _DishTypesControler = require('../../controlers/basic/DishTypesControler');

var _DishTypesControler2 = _interopRequireDefault(_DishTypesControler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

var DishType = new _DishTypesControler2.default();

router.get('/', DishType.index);
router.post('/', DishType.create);
router.put('/:id', DishType.update);
router.delete('/:id', DishType.delete);

module.exports = router;