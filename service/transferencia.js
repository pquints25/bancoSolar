const sequelize = require("../connection/connection");
const Transferencia = require("../models/transferencia");
const Usuario = require("../models/usuario");

const findAllTransferencias = async () => {
    try {
        const transferencias = await Transferencia.findAll({
            include: [
                {
                    model: Usuario,
                    as: 'emisor_alias'
                },
                {
                    model: Usuario,
                    as: 'receptor_alias'
                }
            ]
        });
        if (transferencias.length == 0) {
            return {
                msg: 'No hay datos en la tabla transferencias',
                status: 204,
                datos: []
            }
        }
        return {
            msg: 'Las transferencias son: ',
            status: 200,
            datos: transferencias.map(transferencia => transferencia.toJSON())
        }
    } catch (error) {
        console.log(error.message);
        return {
            msg: 'Error del servidor',
            status: 500,
            datos: []
        }
    }
}

const createTransferencia = async (emisor, receptor, monto) => {
    // declaración de transacción (BEGIN TRANSACTION)
    const transaccion = await sequelize.transaction();
    try {
        // find by nombre para rescatar datos de usuarios para actualizar y posteriormente crear la trasferencia
        const emisorDatos = await Usuario.findOne({
            where: {
                nombre: emisor
            }
        });

        const receptorDatos = await Usuario.findOne({
            where: {
                nombre: receptor
            }
        });

        // update de los usuarios con respecto a sus montos en dependencia de los id
        const receptorUpdate = await Usuario.update({
            balance: receptorDatos.toJSON().balance + monto
        }, {
            where: {
                id: receptorDatos.toJSON().id
            },
            transaction: transaccion
        });

        const emisorUpdate = await Usuario.update({
            balance: emisorDatos.toJSON().balance - monto
        }, {
            where: {
                id: emisorDatos.toJSON().id
            },
            transaction: transaccion
        });

        // crear transferencia
        const transferencia = await Transferencia.create({
            emisor: emisorDatos.toJSON().id,
            receptor: receptorDatos.toJSON().id,
            monto,
            fecha: Date.now()
        }, {
            transaction: transaccion
        });
        await transaccion.commit();
        const transferencias = await Transferencia.findAll();
        return {
            msg: 'Transferencia realizada correctamente',
            status: 200,
            datos: transferencias.map(transferencia => transferencia.toJSON())
        }
    } catch (error) {
        await transaccion.rollback();
        return {
            msg: 'Error del servidor',
            status: 500,
            datos: []
        }
    }
}

module.exports = {
    findAllTransferencias,
    createTransferencia
}