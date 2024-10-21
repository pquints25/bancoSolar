const { Router } = require('express');
const { findAll, insert } = require("../controllers/cliente");

const router = Router();

router.get('/usuarios', findAll);

router.post('/usuario', insert);

module.exports = router;