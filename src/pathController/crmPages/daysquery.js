var express = require('express');
var router = express.Router();

import DaysQueryControler from '../../controlers/looped/daysQuery.js';
const DaysQuery = new DaysQueryControler();

router.get('/', DaysQuery.index);
router.post('/', DaysQuery.create);
router.put('/', DaysQuery.update);

 
module.exports = router;