const router = require("express").Router()
const { usersAuth, editUserAuth, deleteUserAuth, userAuth } = require("../controllers/user.controllers");


router.get('/users', usersAuth)

router.get('/:user_id', userAuth)

router.post('/:user_id/edit', editUserAuth)

router.post('/:user_id/delete', deleteUserAuth)

module.exports = router