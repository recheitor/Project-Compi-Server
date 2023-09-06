const User = require("../models/User.model")

const users = (req, res, next) => {

    User
        .find()
        .select({
            _id: 1,
            firstName: 1,
            lastName: 1,
            avatar: 1,
            rating: 1,
            favorites: 0
        })
        .sort({ lastName: 1 })
        .populate([
            'rating',
            {
                path: 'rating',
                populate: {
                    path: 'userId'
                }
            },
            'favorites'
        ])
        .then(users => res.json(users))
        .catch(err => next(err))
}

const user = (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .populate([
            'rating',
            {
                path: 'rating',
                populate: {
                    path: 'userId'
                }
            },
            'favorites'
        ])
        .then(user => res.json(user))
        .catch(err => next(err))
}

const editUser = (req, res, next) => {

    const { user_id } = req.params
    const newUserData = { firstName, lastName, email } = req.body

    User
        .findByIdAndUpdate(user_id, newUserData)
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const deleteUser = (req, res, next) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.sendStatus(204))
        .catch(err => next(err))
}

module.exports = {
    users,
    user,
    editUser,
    deleteUser
}