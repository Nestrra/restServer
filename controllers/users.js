const { response } = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')




const getUsers = async (req, res = response) => {

    const {limit = 5, since = 0 } = req.query;
    const query = {state: true}

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(since))
    .limit(Number(limit))
    ])

    res.json({
        total,
        users
    })
}


const usersPost = async (req, res) => {

    const { name, email, password, rol, } = req.body;
    const user = new User({ name, email, password, rol })

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Guardar base de datos
    await user.save()

    res.json({
        user
    })
}


const usersPut = async (req, res) => {

    const { id } = req.params;
    const {_id, password, google, email, ...resto} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt )
    }

    const user = await User.findByIdAndUpdate(id, resto );

    res.json({
        user
    })
}


const usersDelete = async (req, res) => {

    const {id} = req.params;

    const user = await User.findByIdAndUpdate(id, {state:false})

    res.json({
        msg: ' delete API',
       user

    })
}


module.exports = {
    getUsers,
    usersPost,
    usersPut,
    usersDelete

}