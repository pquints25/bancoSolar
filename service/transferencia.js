const sequelize = require("../connection/connection");
const Transferencia = require("../models/transferencia");
const Cliente = require("../models/cliente");



const findAllTransferencia = async () => {
    try{
        const transferencias = await Transferencia.findAll({
            include: [
                {
                    model: Cliente,
                    as: 'emisor_alias'
                },
                {
                    model: Cliente,
                    as: 'receptor_alias'
                },
            ]
        });
        if(transferencias.length == 0){
            return {
                msg: 'No hay datos en la tabla transferencias',
                status: 204,
                datos: []
            }
    }

    return {
        msg: 'Las transferencias son:',
        status: 200,
        datos: transferencias.map(transferencia => transferencia.toJson())
    }
    
    } catch (error){
        console.log(error.message);
        return {
            msg: 'Error al obtener datos',
            status: 500,
            datos: []
        }
    }
}



const createTransferencia = async (emisor, receptor, monto) => {
    const transaccion = await sequelize.transaction();
    try{
        const emisorDatos = await Cliente.findOne({
            where: {
                nombre: emisor
            }
        });

    const receptorDatos = await Cliente.findOne({
        where: {
            nombre: receptor
        }
    });

    const receptorUpdate = await Cliente.update({
        balance: receptorDatos.toJson().balance + monto
    }, {
        where: {
            id: receptorDatos.toJson().id
        },
        transaction: transaccion
    });

    const emisorUpdate = await Cliente.update({
        balance: emisorDatos.toJson().balance - monto
    }, {
        where:{
            id: emisorDatos.toJson().id
        },
        transaction: transaccion
    });

    const transferencia = await transferencia.create({
        emisor: emisorDatos.toJson().id,
        receptor: receptorDatos.toJson().id,
        monto,
        fecha: Date.now()
    }, {
        transaction: transaccion
    });
    await transaccion.commit();
    const transferencias = await Transferencia.findAll();
    return{
        msg: 'Transferencia realizada correctamente',
        status: 200, 
        datos: transferencia.map(transferencia => transferencia.toJson())
    }
        } catch (error){
            await transaccion.rollback();
            return{
                msg: 'Error en el servidor',
                status: 500,
                datos: []
        }
    }
}

module.exports = {
    findAllTransferencia,
    createTransferencia
}