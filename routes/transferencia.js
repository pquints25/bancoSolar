const { Router } = require('express');
const { findAll, insert } = require('express');

const router = Router();

router.get('/transferencia', findAll);

router.get('/transferencia', findAll);

module.exports = router;