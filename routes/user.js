const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, usersPost, usersPut, usersDelete } = require('../controllers/users');
const { isRolValid, emailExist, userExist } = require('../helpers/db-validators');
const { validateCamp } = require('../middlewares/validate-camp');



const router = Router();



router.get('/', getUsers);

router.put('/:id',[
   check('id', 'No es un id valido').isMongoId(),
   check('id').custom(userExist),
   check('rol').custom(isRolValid),
   validateCamp 
], usersPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 letras').isLength({ min: 6 }),
    check('email', 'Correo no valido').isEmail(),
    check('email').custom(emailExist),
    check('rol').custom(isRolValid),
    validateCamp
], usersPost);

router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(userExist),
    validateCamp
], usersDelete)





module.exports = router;