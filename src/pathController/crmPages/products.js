var express = require('express');
var router = express.Router();

import ProductControler from '../../controlers/basic/ProductControler';
const Product = new ProductControler();

router.get('/', Product.index);
router.post('/', Product.create);
router.put('/:id', Product.update);
router.delete('/:id', Product.delete);
 
module.exports = router;