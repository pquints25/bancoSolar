const express = require('express');

class Server {
    
    constructor(){
        this.app = express();
        this.port = 3000;
        this.middleware();
        this.routes();
    }

    middleware(){
        this.app.use(express.static('public'));
        this.app.use(express.json());
    }

    routes(){
        this.app.use('/', require('../routes/cliente'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`);
            
        })
    }
}

module.exports = Server;    
