
const { response } = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs');
const {genJWT} = require('../helpers/genJWT');

const loginPost = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        //Verificar email exista
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                msg: 'Email incorrecto '
            })
        }
        //Verificar estado del usuario
        if(!user.state){
            console.log(user.state)
            return res.status(400).json({
                msg: 'Usuario inactivo'
            })
        }

        //Verificar password
        const validPassword = bcryptjs.compareSync(password, user.password) 
        if(!validPassword){
            return res.status(400).json({
                msg: 'Contraseña invalida'
            })
        }

        //Generar JWT
        const token = await genJWT(user.id);


        res.json({
           user,
           token
        
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error de servidor'
        })
    }


   
}


module.exports={
    loginPost
}