var express = require('express');
var router = express.Router();

import ProgramController from '../../controlers/complecs/ProgramControler';
const Program = new ProgramController();

router.get('/', Program.index);
router.post('/', Program.create);
router.put('/:id', Program.update);
router.delete('/:id', Program.delete);
 
module.exports = router;