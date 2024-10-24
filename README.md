##Prueba Banco Solar
//cambia clientes
ALTER TABLE clientes RENAME TO usuarios;

SELECT * FROM usuarios

INSERTAR ESTO EN PGADMIN

CREATE TABLE clientes (
id SERIAL PRIMARY KEY,
nombre VARCHAR(50),
balance FLOAT CHECK (balance >= 0)
);

CREATE TABLE transferencias (
id SERIAL PRIMARY KEY,
emisor INT,
receptor INT,
monto FLOAT,
fecha TIMESTAMP,
FOREIGN KEY (emisor) REFERENCES clientes(id),
FOREIGN KEY (receptor) REFERENCES clientes(id)
)

INSERT INTO clientes(id, nombre, balance)
VALUES(1, 'John Doe', 50000);
INSERT INTO clientes(id, nombre, balance)
VALUES(2, 'Jaime Rodriguez', 15000);
INSERT INTO clientes(id, nombre, balance)
VALUES(3, 'Camila Melendez', 30000);
INSERT INTO clientes(id, nombre, balance)
VALUES(4, 'Liz Idrogo', 90000);



SELECT * FROM clientes;
SELECT * FROM transferencias;

UPDATE clientes
SET balance = balance = 50000
WHERE id = 1

UPDATE clientes
SET balance = balance + 50000
WHERE id = 2

INSERT INTO transferencias(id, emisor, receptor, monto, fecha)
VALUES(1, 2, 50000, '');

//CONNECTION/CONNECTION
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/bancosolar');

module.exports = sequelize;

