const Usuario = require("../models/usuario")

const findAllUsuarios = async () => {
    try {
        const usuarios = await Usuario.findAll();
        if (usuarios.length == 0) {
            return {
                msg: 'La tabla usuarios se encuentra sin datos',
                status: 204,
                datos: []
            }
        }
        return {
            msg: 'Los datos de la tabla usuarios son: ',
            status: 200,
            datos: usuarios.map(usuario => usuario.toJSON())
        }
    } catch (error) {
        console.log(error.message);
        return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        }
    }

}

const createUsuario = async (nombre, balance) => {
    try {
        const usuario = await Usuario.create({
            nombre,
            balance
        });
        const usuarios = await Usuario.findAll();
        return {
            msg: `El usuario con nombre ${nombre} se insertó correctamente`,
            status: 201,
            datos: usuarios.map(usuario => usuario.toJSON())
        }
    } catch (error) {
        console.log(error.message);
        return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        }
    }
}

const updateUsuario = async (id, nombre, balance) => {
    try {
        const usuario = await Usuario.update({
            nombre,
            balance
        }, {
            where: {
                id
            }
        });
        const usuarios = await Usuario.findAll();
        return {
            msg: `El usuario con nombre ${nombre} se actualizó correctamente`,
            status: 201,
            datos: usuarios.map(usuario => usuario.toJSON())
        }
    } catch (error) {
        console.log(error.message);
        return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        }
    }
}

const deleteUsuario = async (id) => {
    try {
        const usuario = await Usuario.destroy({
            where: {
                id
            }
        });
        const usuarios = await Usuario.findAll();
        return {
            msg: `El usuario con id ${id} se eliminó correctamente`,
            status: 201,
            datos: usuarios.map(usuario => usuario.toJSON())
        }
    } catch (error) {
        console.log(error.message);
        return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        }
    }
}

module.exports = {
    findAllUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario
}