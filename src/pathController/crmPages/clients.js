var express = require('express');
var router = express.Router();

import ClientControler from '../../controlers/basic/ClientControler';
const Client = new ClientControler();

router.get('/', Client.index);
router.post('/', Client.create);
router.put('/:id', Client.update);
router.delete('/:id', Client.delete);
 
module.exports = router;