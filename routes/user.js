const { Router } = require('express');
const { getUsers, usersPost, usersPut, usersDelete } = require('../controllers/users');


const router = Router();



router.get('/', getUsers);

router.put('/:id', usersPut);

router.post('/', usersPost);

router.delete('/', usersDelete)





module.exports = router;