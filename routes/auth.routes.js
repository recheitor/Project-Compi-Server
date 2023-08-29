const router = require("express").Router()
const { verifyToken } = require("../middleware/verifyToken")
const { signupAuth, loginAuth, verifyAuth } = require("../controllers/auth.controllers");


router.post('/signup', signupAuth)

router.post('/login', loginAuth)

router.get('/verify', verifyToken, verifyAuth)


module.exports = router