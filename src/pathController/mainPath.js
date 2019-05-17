import express from 'express';

const router = express.Router();

import crm from './crm';
import site from './site';

router.use('/crm', crm);
router.use('/site', site);

module.exports = router;