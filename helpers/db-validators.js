const Role = require("../models/role")
const User = require("../models/user")


const isRolValid =  async (rol = '') =>{

    const existRol = await Role.findOne( { rol})
    if(!existRol){
        throw new Error(`El rol ${rol}  no esta registrado en la base de datos` )
    }

}

const emailExist = async (email = '')=>{

        //validar password
        const existEmail = await User.findOne({email});

        if(existEmail){
            throw new Error(`El email ${email}, ya esta registrado` )
        }


}
const userExist = async (id)=>{

    //validar password
    const existUser = await User.findById(id);

    if(!existUser){
        throw new Error(`El usuario con ${id}, no existe` )
    }


}

module.exports = {
    isRolValid,
    emailExist,
    userExist
}