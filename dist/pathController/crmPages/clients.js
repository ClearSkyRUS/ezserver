'use strict';

var _ClientControler = require('../../controlers/basic/ClientControler');

var _ClientControler2 = _interopRequireDefault(_ClientControler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

var Client = new _ClientControler2.default();

router.get('/', Client.index);
router.post('/', Client.create);
router.put('/:id', Client.update);
router.delete('/:id', Client.delete);

module.exports = router;