const { DataTypes } = require("sequelize");
const sequelize = require("../connection/connection");

const Cliente = sequelize.define('Cliente', {
id: {
    primaryKey:true,
    type:DataTypes.INTEGER,
    autoIncrement: true
},
nombre: {
    type: DataTypes.STRING
},
balance: {
    type:DataTypes.FLOAT
}
},{
    tableName: 'Clientes',
    timestamps: false
});

module.exports = Cliente;