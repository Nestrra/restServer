const { response } = require("express");


const isAdminRole = (req, res = response, next)=>{

    if(!req.user){
        return res.status(500).json({
            msg:'Se quiere verificar'
        })
    }

    const { rol, name }= req.user

if(rol !== 'ADMIN_ROLE'){

    res.status(401).json({
        msg: `${name} no es adinistrador `
    })

}

    next();

}


module.exports={
    isAdminRole
}