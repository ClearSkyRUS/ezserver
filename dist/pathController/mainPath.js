'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _crm = require('./crm');

var _crm2 = _interopRequireDefault(_crm);

var _site = require('./site');

var _site2 = _interopRequireDefault(_site);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/crm', _crm2.default);
router.use('/site', _site2.default);

module.exports = router;