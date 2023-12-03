const router = require("express").Router()
const { users, user, editUser, deleteUser } = require("../controllers/user.controllers");

router.get('/users', users)
router.get('/:user_id', user)
router.post('/:user_id/edit', editUser)
router.post('/:user_id/delete', deleteUser)

module.exports = router