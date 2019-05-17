'use strict';

var _SiteDataControler = require('../../controlers/heavy/SiteDataControler');

var _SiteDataControler2 = _interopRequireDefault(_SiteDataControler);

var _newOrder = require('../../controlers/newDataFormUsers/newOrder.js');

var _newOrder2 = _interopRequireDefault(_newOrder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

var SiteData = new _SiteDataControler2.default();
var newOrder = new _newOrder2.default();

router.get('/', SiteData.index);
router.post('/', newOrder.create);

module.exports = router;