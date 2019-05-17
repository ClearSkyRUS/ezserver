'use strict';

var _ProgramControler = require('../../controlers/complecs/ProgramControler');

var _ProgramControler2 = _interopRequireDefault(_ProgramControler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

var Program = new _ProgramControler2.default();

router.get('/', Program.index);
router.post('/', Program.create);
router.put('/:id', Program.update);
router.delete('/:id', Program.delete);

module.exports = router;