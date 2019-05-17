var express = require('express');
var router = express.Router();

import SiteDataControler from '../../controlers/heavy/SiteDataControler';
import newOrderControler from '../../controlers/newDataFormUsers/newOrder.js';
const SiteData = new SiteDataControler();
const newOrder = new newOrderControler();

router.get('/', SiteData.index);
router.post('/', newOrder.create);
 
module.exports = router;