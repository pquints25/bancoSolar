const { Router } = require('express');
const { findAllUsuarios } = require("../service/usuario");

const router = Router();

router.get('/usuarios', async (req, res) => {
    const respuesta = await findAllUsuarios();
    res.json(respuesta.datos);
});

//probar en clase 
router.post('/usuarios', async (req, res) => {
    const nombre = res.body.nombre;
    const balance = res.body.balance;
    await createUsuario(nombre, balance);    
    res.json('post usuarios')
})

router.put('/usuarios', (req, res) => {
    console.log('put usuarios');
    res.json('put usuarios')
})


router.delete('/usuarios', (req, res) => {
    console.log('delete usuarios');
    res.json('delete usuarios')
})

module.exports = router;