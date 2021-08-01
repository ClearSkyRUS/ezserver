var express = require('express');
var router = express.Router();

import DishControler from '../../controlers/basic/DIshControler.js';
const Dish = new DishControler();

router.get('/', Dish.index);
router.post('/', Dish.create);
router.put('/:id', Dish.update);
router.delete('/:id', Dish.delete);


module.exports = router;