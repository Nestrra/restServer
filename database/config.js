

const mongoose = require('mongoose');




const dbConnection = async()=>{

    try {
        
      await mongoose.connect( process.env.MONGO_CNN, {

            useNewUrlParser: true,
            useUnifiedTopology: true,
            
      } )

        console.log('Base de datos en linea')

    } catch (error) {
        console.log(error)
        throw new Error( 'Error al conectar a base de datos Tuherramienta' )
    }
}

module.exports={
    dbConnection
}









