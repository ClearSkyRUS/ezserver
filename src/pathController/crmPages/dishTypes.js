var express = require('express');
var router = express.Router();

import DishTypesControler from '../../controlers/basic/DishTypesControler';
const DishType = new DishTypesControler();

router.get('/', DishType.index);
router.post('/', DishType.create);
router.put('/:id', DishType.update);
router.delete('/:id', DishType.delete);
 
module.exports = router;