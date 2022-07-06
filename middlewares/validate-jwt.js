const { response } = require('express')
const jwt = require('jsonwebtoken')
const user = require('../models/user')

const User = require('../models/user')




const validateJWT = async (req, res = response, next) => {

    const token = req.header('x-token')

    if (!token) {

        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })

    }


    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Token no valifo, usuario no existe BD'
            })
        }



        //vERIFICAR SI EL UID TIENE ESTADO TRUE
        if (!user.state) {
            return res.status(401).json({
                msg: 'Token no valifo, usuario con estado: false'
            })
        }

        req.user = user;
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}


module.exports = {
    validateJWT
}