const Transferencia = require("../models/transferencia");

const findAll = async (req, res) => {
    try{
        const transferencia = await Transferencia.findAll();
        res.json(transferencia);    
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las transferencias'});
    }
};

const insert = async (req, res) => {
    const { emisor, receptor, monto} = req.body;
    try{
        const transferencia = await Transferencia.create({
            emisor,
            receptor,
            monto
        });
    } catch (error){
        res.status(500).json({error:'Error al crear la transferencia'});
    }
};

module.exports = {
    findAll,
    insert
};
