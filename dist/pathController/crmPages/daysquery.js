'use strict';

var _daysQuery = require('../../controlers/looped/daysQuery.js');

var _daysQuery2 = _interopRequireDefault(_daysQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

var DaysQuery = new _daysQuery2.default();

router.get('/', DaysQuery.index);
router.post('/', DaysQuery.create);
router.put('/', DaysQuery.update);

module.exports = router;