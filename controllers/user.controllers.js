const User = require("../models/User.model")

const usersAuth = (req, res, next) => {

    User
        .find()
        // TODO: proyectar finds
        // TODO: sort finds
        .then(users => res.json({ users }))
        .catch(err => next(err))
}

const userAuth = (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then((user) => res.json({ user }))
        .catch(err => next(err))
}

const editUserAuth = (req, res, next) => {

    const { user_id } = req.params
    const newUserData = { firstName, lastName, email } = req.body

    User
        .findByIdAndUpdate(user_id, newUserData)
        .then(() => res.json({ message: "User edited" }))
        .catch(err => next(err))
}

const deleteUserAuth = (req, res, next) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.status(202).json({ message: "User deleted" }))
        .catch(err => next(err))
}

module.exports = {
    usersAuth,
    userAuth,
    deleteUserAuth,
    editUserAuth
}