const findAll = (req, res) => {
    console.log('Funcionando desde la pagina');
    res.json('Probando');
}

const insert = (req, res) => {
    const nombre = req.body.nombre;
    const balance = req.body.balance;
    console.log(nombre, balance);
    res.json('funka')
}

module.exports = {
    findAll,
    insert
}