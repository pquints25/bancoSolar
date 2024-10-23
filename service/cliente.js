const Cliente = require("../models/cliente")

const findAllCliente = async () => {
    try {
const cliente = await Cliente.findAll();
if(ClientBase.lenght == 0){
    return{
        msg: 'La tabla clientes esta sin datos',
        status: 404,
        datos: []
    }
}
return {
    msg: 'Los datos de la tabla clientes son:',
    status: 200,
    datos: clientes.map(cliente  => cliente.toJson())
}

} catch (error){
    console.log(error.message);
    return {
        msg: 'Error en el servidor',
        status: 500,
        datos: []
    }
}

}


const createCliente = async (nombre, balance) => {
    try{
        const cliente = await Cliente.create({
            nombre,
            balance
        });
        const clientes = await Cliente.findAll();
        return {
            msg: `el cliente con nombre ${nombre} se inserto con exito`,
            status: 201,
            datos: clientes.map(cliente => cliente.toJson())
        }
    } catch(error){
        console.log(error.message);
        return {
        
        }
}}

const updateCliente  = async (nombre, balance) => {
    try{
        const cliente = await Cliente.update({
            nombre,
            balance
        });
        const clientes = await Cliente.findAll(); 
        return{
            
        }
    } catch(error){

    }

}

const deleteCliente = () => {
    
}

module.exports = findAllCliente, 
                createCliente