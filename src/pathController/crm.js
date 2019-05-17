import express from 'express';

const router = express.Router();

import dishs from './crmPages/dishs';
import days from './crmPages/days';
import daysquery from './crmPages/daysquery';
import products from './crmPages/products';
import dishtypes from './crmPages/dishTypes';
import clients from './crmPages/clients';
import programs from './crmPages/programs';
import orders from './crmPages/orders';
import workdata from './crmPages/workdata';

router.use('/dishs', dishs);
router.use('/daysquery', daysquery);
router.use('/days', days);
router.use('/products', products);
router.use('/dishtypes', dishtypes);
router.use('/clients', clients);

router.use('/programs', programs);
router.use('/orders', orders);
router.use('/workdata', workdata);

module.exports = router;