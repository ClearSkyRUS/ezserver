var express = require('express');
var router = express.Router();

import WorkDataController from '../../controlers/heavy/WorkDataControler';
const WorkData = new WorkDataController();

router.get('/:count', WorkData.index);
 
module.exports = router;