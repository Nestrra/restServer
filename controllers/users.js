const { response } = require('express')



const getUsers = (req, res = response) => {

    res.json({
        msg: 'get API'

    })
}


const usersPost = (req, res) => {

        const {nombre, edad} = req.body;


    res.json({
        msg: ' post API',
        nombre,
        edad

    })
}


const usersPut = (req, res) => {

    const {id} = req.params;

    res.json({
        msg: 'put API',
        id
    })
}


const usersDelete = (req, res) => {
    res.json({
        msg: ' delete API'

    })
}


module.exports = {
    getUsers,
    usersPost,
    usersPut,
    usersDelete

}