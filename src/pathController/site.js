import express from 'express';

const router = express.Router();

import data from './sitePages/data';

router.use('/data', data);

module.exports = router;