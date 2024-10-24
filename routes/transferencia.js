const { Router } = require('express');
const { findAllTransferencias } = require('../service/transferencia');

const router = Router();

router.get('/transferencia', async (req, res) => {
    const respuesta = await findAllTransferencias();
    console.log(respuesta);
    res.json('get transferencias');
    
});

router.post('/transferencia', (req, res) => {
    console.log('post transferencias');
    res.json('post transferencias');
    
});


module.exports = router;