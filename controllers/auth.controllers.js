const User = require("../models/User.model")

const signupAuth = (req, res, next) => {

    const userData = { firstName, lastName, email, password, bio } = req.body

    User
        .create({ userData })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
}

const loginAuth = (req, res, next) => {

    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return
            }

            if (foundUser.validatePassword(password)) {
                const authToken = foundUser.signToken()
                res.status(200).json({ authToken })
            }
            else {
                res.status(401).json({ message: "Incorrect password" });
            }
        })
        .catch(err => next(err));
}

const verifyAuth = (req, res) => {

    const loggedUser = req.payload

    res.json({ loggedUser })
}

module.exports = {
    signupAuth,
    loginAuth,
    verifyAuth
}