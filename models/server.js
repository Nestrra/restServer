const express = require('express')
const cors = require('cors')
const users = require('../routes/user');
const auth = require('../routes/auth');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'
        this.authPath = '/api/auth'

        //conectar base de datos
        this.dbConnection();

        //Middlewares
        this.middlewares();

        //Rutas de la app
        this.routes();

    }

       async dbConnection(){

            await dbConnection()

       }


    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo del Body
        this.app.use(express.json())

        //Directorio Publico
        this.app.use( express.static('public') );

    }


    routes() {

            this.app.use(this.usuariosPath, users )
            this.app.use(this.authPath, auth )
       
    }

    listen() {

        this.app.listen( this.port , () => {

            console.log('servidor corriendo en puerto', this.port )

        })
    }

}


module.exports = Server;