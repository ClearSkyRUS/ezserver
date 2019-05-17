'use strict';

var _DayControler = require('../../controlers/basic/DayControler.js');

var _DayControler2 = _interopRequireDefault(_DayControler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

var Day = new _DayControler2.default();

router.get('/', Day.index);
router.post('/', Day.create);
router.put('/:id', Day.update);
router.delete('/:id', Day.delete);

module.exports = router;