var express = require('express');
var router = express.Router();

import DayControler from '../../controlers/basic/DayControler.js';
const Day = new DayControler();

router.get('/', Day.index);
router.post('/', Day.create);
router.put('/:id', Day.update);
router.delete('/:id', Day.delete);


module.exports = router;