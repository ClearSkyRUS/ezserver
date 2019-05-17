'use strict';

var _WorkDataControler = require('../../controlers/heavy/WorkDataControler');

var _WorkDataControler2 = _interopRequireDefault(_WorkDataControler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

var WorkData = new _WorkDataControler2.default();

router.get('/:count', WorkData.index);

module.exports = router;