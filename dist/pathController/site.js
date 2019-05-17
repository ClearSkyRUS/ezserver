'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _data = require('./sitePages/data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/data', _data2.default);

module.exports = router;