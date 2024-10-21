const { DataTypes } = require('sequelize');
const sequelize = require("../connection/connection");

const Cliente = sequelize.define('Cliente', {
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    }
});

module.exports = Cliente;