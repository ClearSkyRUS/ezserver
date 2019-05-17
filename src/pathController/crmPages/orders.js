var express = require('express');
var router = express.Router();

import OrderController from '../../controlers/complecs/OrderControler';
const Order = new OrderController();

router.get('/', Order.index);
router.post('/', Order.create);
router.put('/:id', Order.update);
router.delete('/:id', Order.delete);
 
module.exports = router;