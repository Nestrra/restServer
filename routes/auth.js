const { Router } = require('express');
const { check } = require('express-validator');
const { loginPost } = require('../controllers/auth');
const { isRolValid, emailExist, userExist } = require('../helpers/db-validators');
const { validateCamp } = require('../middlewares/validate-camp');




const router = Router();

router.post('/login',[
    check('email', 'El email es obligatorio' ).isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateCamp
], loginPost);



module.exports = router